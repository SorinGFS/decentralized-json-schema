'use strict';
// proccessing json files into decentralized schema
const fn = require('zerodep/node/fn');
// input must be file or directory pathResolve arguments
module.exports = (...dirPathResolveArgs) => {
    const files = require('zerodep/node/tree/json')(...dirPathResolveArgs);
    const schema = {};
    // transform URI
    const transformURI = (uri) => {
        return (
            uri
                .replace(/^(.*?):/, 'schema:')
                .replace(/\.json(\/|$)/g, '$1')
                .replace(/\.schema(\/|$)/g, '$1')
                .replace(/\/$/, '')
        );
    };
    // recursively extract schemas by referencing the extraction point (this will generate new ids)
    const extractSchemas = () => {
        fn.assignDeepKeyParent(
            /^(\$id|id)$/,
            (target, parentKey, key) => {
                if (target.$schema && typeof target[key] === 'string') {
                    try {
                        const id = transformURI(decodeURI(new URL(target[key].replace(/#$/, '')).href));
                        return (schema[id] = target) && { [parentKey]: { $ref: id } };
                    } catch (error) {}
                }
            },
            files
        );
    };
    // recursively extract ids by referencing the extraction point (this will generate new ids)
    const extractIds = (base) => {
        fn.replaceDeepKeyParent(
            /^(\$id|id)$/,
            (target, parentKey, key) => {
                if (typeof target[key] === 'string' && !/^#/.test(target[key])) {
                    try {
                        const id = transformURI(decodeURI(new URL(target[key], base).href));
                        return (schema[id] = target) && { [parentKey]: { $ref: id } };
                    } catch (error) {}
                }
            },
            schema[base]
        );
    };
    // transform dependencies into dependentRequired and dependentSchemas
    const transformDependencies = (id) => {
        fn.replaceDeepKey(
            'dependencies',
            (target) => {
                let replacement;
                if (typeof target === 'object' && !target.$ref) Object.keys(target).every((key) => Array.isArray(target[key])) ? (replacement = 'dependentRequired') : (replacement = 'dependentSchemas');
                if (replacement) fn.assignDeepKey('$ref', (value) => (typeof value === 'string' ? { $ref: value.replace('dependencies', replacement) } : undefined), schema[id]);
                return { [replacement]: target };
            },
            schema[id]
        );
    };
    // transform items and additionalItems into prefixItems and items
    const transformItems = (id) => {
        fn.replaceDeepKey('items', (value) => (Array.isArray(value) ? { prefixItems: value } : undefined), schema[id]);
        fn.replaceDeepKey('additionalItems', (value) => [{ items: value }], schema[id]);
    };
    // transform draft-04 exclusive* to their corresponding numeric value in minimum or maximum
    const transformExclusive = (id) => {
        fn.parseDeepKey(
            'exclusiveMinimum',
            (...keys) => {
                if (fn.get(schema, id, ...keys) === true) {
                    fn.set(fn.get(schema, id, ...keys.slice(0, -1), 'minimum'), schema, id, ...keys) && fn.delete(schema, id, ...keys.slice(0, -1), 'minimum');
                }
            },
            schema[id]
        );
        fn.parseDeepKey(
            'exclusiveMaximum',
            (...keys) => {
                if (fn.get(schema, id, ...keys) === true) {
                    fn.set(fn.get(schema, id, ...keys.slice(0, -1), 'maximum'), schema, id, ...keys) && fn.delete(schema, id, ...keys.slice(0, -1), 'maximum');
                }
            },
            schema[id]
        );
    };
    // extract anchors by referencing the extraction point
    const extractAnchors = (id) => {
        fn.parseDeepKey(
            /^(\$anchor|\$recursiveAnchor|\$dynamicAnchor)$/,
            (...keys) => {
                const anchor = fn.get(schema, id, ...keys);
                const ref = { $ref: fn.jsonPointer('#', ...keys.slice(0, -1)) };
                if (!schema[id]['#']) schema[id]['#'] = {};
                if (typeof anchor === 'string' && String(keys.slice(-1)) === '$anchor') schema[id]['#'][anchor] = ref;
                if (typeof anchor === 'string' && String(keys.slice(-1)) === '$dynamicAnchor') schema[id]['#'][`_${anchor}`] = ref;
                if (anchor === true && String(keys.slice(-1)) === '$recursiveAnchor') schema[id]['#']['_meta'] = ref;
            },
            schema[id]
        );
    };
    // extract definitions and remove their extraction point
    const extractDefinitions = (id) => {
        if ((schema[id].definitions || schema[id].$defs) && !schema[id]['#']) schema[id]['#'] = {};
        if (schema[id].definitions) schema[id]['#'].$defs = schema[id].definitions;
        if (schema[id].$defs) schema[id]['#'].$defs = schema[id].$defs;
        // remove extracted definitions
        delete schema[id].definitions;
        delete schema[id].$defs;
    };
    // globalize and combine all reference types into $ref, dynamic references will be recognized by their _ prefix
    const globalizeReferences = (id) => {
        fn.assignDeepKey(
            /^(\$ref|\$recursiveRef|\$dynamicRef)$/,
            (ref, key) => {
                if (typeof ref === 'string') {
                    ref = ref.replace('#/definitions', '#/$defs');
                    const dot = ref.indexOf('#') === 0 && (ref !== '#' || key !== '$ref') ? '.' : '';
                    const base = dot ? id + '/' : id;
                    const hash = (key !== '$ref' && /#([^\/]|$)/.test(ref)) || /#(\/\$defs|[^\/])/.test(ref) ? '/#' : '';
                    const _ = key === '$ref' ? '' : key === '$recursiveRef' ? '/_meta' : '/_';
                    return { $ref: transformURI(decodeURI(new URL(dot + ref.replace(/#/, hash + _), base).href.replace(/([^:\/])\/+/g, '$1/'))) };
                }
            },
            schema[id]
        );
    };
    // transform references that would trigger infinite loop into dynamic references, and definitions into $defs
    const transformReferences = (id) => {
        fn.parseDeepKey(
            '$ref',
            (...keys) => {
                const ref = fn.get(schema, id, ...keys);
                if (typeof ref === 'string') {
                    // by eliminating last two conditions would add dynamic refs even inside the deepest definition
                    if ([id, ...keys.slice(0, -1)].join('/').indexOf(ref) === 0 && [id, ...keys.slice(0, -1)].join('/').indexOf(ref + '/#') === -1 && ref.indexOf('#/$defs') === -1) {
                        if (!schema[ref]['#']) schema[ref]['#'] = {};
                        if (!schema[ref]['#']['_meta']) schema[ref]['#']['_meta'] = { $ref: ref };
                        fn.set(ref + '/#/_meta', schema, id, ...keys);
                    }
                }
            },
            schema[id]
        );
    };
    // remove transformed keywords and their definitions in decentralized ids
    const removeTransformedKeywords = (id) => {
        fn.replaceDeepKey(/^(\$id|\$schema|\$anchor|\$recursiveAnchor|\$dynamicAnchor|\$recursiveRef|\$dynamicRef|\$vocabulary)$/, () => [], schema[id]);
        delete schema[id].id;
        // remove $comment keyword if not enabled in .env file
        if (process.env.buildComment === 'false') fn.replaceDeepKey('$comment', () => [], schema[id]);
    };
    // reset references in decentralized ids as absolute jsonPointer (conversion to absolute URL is trivial)
    const resetReferences = (id) => {
        fn.assignDeepKey(
            '$ref',
            (ref) => {
                if (typeof ref === 'string' && schema[ref]) return { $ref: fn.jsonPointer('#', ref) };
                if (typeof ref === 'string') {
                    let keys;
                    const key = Object.keys(schema)
                        .filter((id) => ref.indexOf(id) === 0)
                        .find((id) => (keys = fn.jsonPointerKeys(fn.relativeUriReference(ref, id))) && fn.get(schema, id, ...keys));
                    if (key) return { $ref: fn.jsonPointer('#', key, ...keys) };
                }
            },
            schema[id]
        );
    };
    // extract schemas as decentralized ids (base schemas)
    extractSchemas();
    // extract ids as decentralized ids (ids nested inside of schemas)
    Object.keys(schema).forEach((id) => extractIds(id));
    // transform dependencies before extracting definitions
    Object.keys(schema).forEach((id) => transformDependencies(id));
    // transform items before extracting definitions
    Object.keys(schema).forEach((id) => transformItems(id));
    // transform draft-04 exclusive* before extracting definitions
    Object.keys(schema).forEach((id) => transformExclusive(id));
    // extract anchors as decentralized ids
    Object.keys(schema).forEach((id) => extractAnchors(id));
    // extract definitions as decentralized ids
    Object.keys(schema).forEach((id) => extractDefinitions(id));
    // globalize references in decentralized ids
    Object.keys(schema).forEach((id) => globalizeReferences(id));
    // transform references in decentralized ids
    Object.keys(schema).forEach((id) => transformReferences(id));
    // remove transformed keywords in decentralized ids
    Object.keys(schema).forEach((id) => removeTransformedKeywords(id));
    // reset references in decentralized ids
    Object.keys(schema).forEach((id) => resetReferences(id));
    // return decentralized schema for passed files
    return schema;
};
