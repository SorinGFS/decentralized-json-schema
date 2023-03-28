'use strict';
// proccessing json files into decentralized schema
const fn = require('zerodep/node/fn');
// input must be directory pathResolve arguments
module.exports = (...dirPathResolveArgs) => {
    const files = require('zerodep/node/tree/json')(...dirPathResolveArgs);
    const schema = {};
    // extract schemas
    const extractSchema = (...keys) => {
        const target = fn.get(files, ...keys);
        let id;
        if (typeof target.id === 'string') id = target.id;
        if (typeof target.$id === 'string') id = target.$id;
        // extract base schema and nested schemas
        if (id) (schema[id] = target) && extractNestedSchema(target, id);
    };
    // extract nested schemas
    const extractNestedSchema = (target, base) => {
        fn.assignDeepKeyParent(
            /^(\$id|id)$/,
            (target, parentKey, key) => {
                if (typeof target[key] === 'string') {
                    const id = new URL(target[key], base).href.replaceAll('##', '#');
                    schema[id] = target;
                    if (/^(\$id|id)$/.test(...fn.deepKeys(target))) extractNestedSchema(target, id);
                    return { [parentKey]: { $ref: id } };
                }
            },
            target
        );
    };
    // all individual schemas will run through this
    const decentralize = (id) => {
        // anchors to simple ref
        fn.replaceDeepKey(
            /^(\$anchor|\$recursiveAnchor|\$dynamicAnchor)$/,
            (anchor) => {
                if (typeof anchor === 'string') return { ref: `#${anchor}` };
                if (typeof anchor === 'boolean') return { ref: `#` };
            },
            schema[id]
        );
        // re-reference
        fn.replaceDeepKey(
            /^(\$ref|\$recursiveRef|\$dynamicRef)$/,
            (ref, key) => {
                if (typeof ref === 'string') return { ref: new URL(ref, id).href.replaceAll('##', '#') };
                if (typeof ref === 'object' && key === '$ref') return { ref }
            },
            schema[id]
        );
        // no longer needed, remove
        fn.replaceDeepKey('id', () => [], schema[id]);
        fn.replaceDeepKey('$id', () => [], schema[id]);
        fn.replaceDeepKey('$ref', () => [], schema[id]);
        fn.replaceDeepKey('$anchor', () => [], schema[id]);
        fn.replaceDeepKey('$schema', () => [], schema[id]);
        fn.replaceDeepKey('$comment', () => [], schema[id]);
        fn.replaceDeepKey('$vocabulary', () => [], schema[id]);
        fn.replaceDeepKey('$dynamicRef', () => [], schema[id]);
        fn.replaceDeepKey('$dynamicAnchor', () => [], schema[id]);
        fn.replaceDeepKey('$recursiveRef', () => [], schema[id]);
        fn.replaceDeepKey('$recursiveAnchor', () => [], schema[id]);
        // remove emptied properties
        fn.replaceDeepKey('properties', (properties) => (Object.keys(properties).length === 0 ? [] : undefined), schema[id]);
        // decentralize definitions
        if (schema[id].definitions) Object.keys(schema[id].definitions).forEach((key) => (schema[`${id}#/definitions/${key}`.replaceAll('##', '#')] = schema[id].definitions[key]));
        if (schema[id].$defs) Object.keys(schema[id].$defs).forEach((key) => (schema[`${id}#/$defs/${key}`.replaceAll('##', '#')] = schema[id].$defs[key]));
        fn.replaceDeepKey('definitions', () => [], schema[id]);
        fn.replaceDeepKey('$defs', () => [], schema[id]);
    };
    // extract individual schemas (base schemas, then schemas nested inside of them)
    fn.parseDeepKeyParent(/^(\$id|id)$/, extractSchema, files);
    // decentralize schemas
    Object.keys(schema).forEach((id) => decentralize(id));
    return schema;
};
