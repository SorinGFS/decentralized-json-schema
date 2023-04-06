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
                    let id = new URL(target[key], base).href;
                    schema[id] = target;
                    if (fn.deepKeys(target).find((key) => /^(\$id|id)$/.test(key))) extractSchema(target, id);
                    return { [parentKey]: { $ref: id } };
                }
            },
            target
        );
    };
    // extract anchors by referencing the extraction point (this will generate new ids)
    const extractAnchors = (id) => {
        fn.parseDeepKey(
            /^(\$anchor|\$recursiveAnchor|\$dynamicAnchor)$/,
            (...keys) => {
                const anchor = fn.get(schema, id, ...keys);
                const ref = keys.slice(0, -1).length ? { $ref: new URL(fn.jsonPointer('#', ...keys.slice(0, -1)), id).href } : { $ref: id };
                if (typeof anchor === 'string' && String(keys.slice(-1)) === '$anchor') schema[new URL(`#${anchor}`, id).href] = ref;
                if (typeof anchor === 'string' && String(keys.slice(-1)) === '$dynamicAnchor') schema[new URL(`#_${anchor}`, id).href] = ref;
                if (anchor === true && String(keys.slice(-1)) === '$recursiveAnchor') schema[new URL(`#_`, id).href] = ref;
            },
            schema[id]
        );
    };
    // all individual schemas will run through this
    const decentralize = (id) => {
        // combine all reference types into $ref, dynamic references will be recognized by their _ prefix
        fn.assignDeepKey(
            /^(\$ref|\$recursiveRef|\$dynamicRef)$/,
            (ref, key) => {
                if (typeof ref === 'string' && key === '$ref') return { $ref: new URL(ref.replace('#/', '#'), id).href };
                if (typeof ref === 'string' && (key === '$dynamicRef' || key === '$recursiveRef')) return { $ref: new URL(ref.replace('#', '#_'), id).href };
            },
            schema[id]
        );
        // switch between URL / global jsonPointer reference
        if (process.env.buildRefType === 'jsonPointer') fn.assignDeepKey('$ref', (ref) => (typeof ref === 'string' ? { $ref: fn.jsonPointer('#', ref) } : undefined), schema[id]);
        // remove no longer needed keyword definitions
        fn.replaceDeepKey(/^(id|\$id|\$schema|\$anchor|\$comment|\$vocabulary|\$dynamicAnchor|\$recursiveAnchor|\$recursiveRef|\$dynamicRef)$/, () => [], schema[id]);
        // remove emptied properties
        fn.replaceDeepKey('properties', (properties) => (Object.keys(properties).length === 0 ? [] : undefined), schema[id]);
        // decentralize definitions
        if (schema[id].definitions) Object.keys(schema[id].definitions).forEach((key) => (schema[new URL(`#definitions/${key}`, id).href] = schema[id].definitions[key]));
        if (schema[id].$defs) Object.keys(schema[id].$defs).forEach((key) => (schema[new URL(`#$defs/${key}`, id).href] = schema[id].$defs[key]));
        fn.replaceDeepKey(/^(definitions|\$defs)$/, () => [], schema[id]);
    };
    // extract individual schemas (base schemas, then schemas nested inside of them)
    extractSchema(files);
    // extract anchors as individual ids
    Object.keys(schema).forEach((id) => extractAnchors(id));
    // decentralize schemas
    Object.keys(schema).forEach((id) => decentralize(id));
    return schema;
};
