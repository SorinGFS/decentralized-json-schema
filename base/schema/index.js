'use strict';
// proccessing json files into decentralized schema
const fn = require('zerodep/node/fn');
// input must be directory pathResolve arguments
module.exports = (...dirPathResolveArgs) => {
    const files = require('zerodep/node/tree/json')(...dirPathResolveArgs);
    const schema = {};
    // recursively extract schemas
    const extractSchema = (target, base) => {
        fn.assignDeepKeyParent(
            /^(\$id|id)$/,
            (target, parentKey, key) => {
                if (typeof target[key] === 'string') {
                    let id = new URL(target[key], base).href.replaceAll('##', '#');
                    let ref = target.$dynamicRef || target.$recursiveRef || target.$ref;
                    let anchor = target.$dynamicAnchor || target.$recursiveAnchor || target.$anchor;
                    if (anchor === true) id = new URL('#', id);
                    if (typeof anchor === 'string') id = new URL(`#${anchor}`, id);
                    if (typeof ref === 'string') id = new URL(ref, id);
                    schema[id] = target;
                    if (/^(\$id|id)$/.test(...fn.deepKeys(target))) extractSchema(target, id);
                    return { [parentKey]: { $ref: id } };
                }
            },
            target
        );
    };
    // all individual schemas will run through this
    const decentralize = (id) => {
        // re-reference
        fn.replaceDeepKey(
            /^(\$ref|\$recursiveRef|\$dynamicRef)$/,
            (ref, key) => {
                if (typeof ref === 'string') return { ref: new URL(ref, id).href.replaceAll('##', '#') };
                if (typeof ref === 'object' && key === '$ref') return { ref };
            },
            schema[id]
        );
        // remove no longer needed keyword definitions
        fn.replaceDeepKey(/^(id|\$id|\$schema|\$anchor|\$comment|\$vocabulary|\$dynamicAnchor|\$recursiveAnchor|\$recursiveRef|\$dynamicRef)$/, () => [], schema[id]);
        // remove emptied properties
        fn.replaceDeepKey('properties', (properties) => (Object.keys(properties).length === 0 ? [] : undefined), schema[id]);
        // decentralize definitions
        if (schema[id].definitions) Object.keys(schema[id].definitions).forEach((key) => (schema[new URL(`#/definitions/${key}`, id).href.replaceAll('##', '#')] = schema[id].definitions[key]));
        if (schema[id].$defs) Object.keys(schema[id].$defs).forEach((key) => (schema[new URL(`#/$defs/${key}`, id).href.replaceAll('##', '#')] = schema[id].$defs[key]));
        fn.replaceDeepKey(/^(definitions|\$defs)$/, () => [], schema[id]);
    };
    // extract individual schemas (base schemas, then schemas nested inside of them)
    extractSchema(files);
    // decentralize schemas
    Object.keys(schema).forEach((id) => decentralize(id));
    return schema;
};
