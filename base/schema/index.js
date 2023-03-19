'use strict';
// proccessing json files into decentralized schema
const fn = require('zerodep/node/fn');
// input must be directory pathResolve arguments
module.exports = (...dirPathResolveArgs) => {
    const files = require('zerodep/node/tree/json')(...dirPathResolveArgs);
    const schema = {};
    // all individual schemas will run through this
    const decentralize = (id) => {
        // re-reference
        fn.replaceDeepKey(
            '$ref',
            (ref) => {
                if (typeof ref === 'string') {
                    let url;
                    if (ref.indexOf('http') === 0) {
                        url = new URL(`${ref}`);
                    } else if (ref.indexOf('#') === 0) {
                        url = new URL(`${id}${ref}`);
                    } else {
                        url = new URL(`${id.split('/').slice(0, -1).join('/')}/${ref}`);
                    }
                    return [{ ref: url.href.replace('##', '#') }];
                } else {
                    return [{ ref }];
                }
            },
            schema[id]
        );
        fn.replaceDeepKey(
            '$recursiveRef',
            (ref) => {
                if (typeof ref === 'string') {
                    let url;
                    if (ref.indexOf('http') === 0) {
                        if (ref.indexOf('#') > 0) {
                            url = new URL(`${ref.substring(0, ref.indexOf('#'))}`);
                        } else {
                            url = new URL(`${ref}`);
                        }
                    } else if (ref.indexOf('#') === 0) {
                        url = new URL(`${id}`);
                    } else {
                        url = new URL(`${id}/----unexpected-case----${ref}`);
                    }
                    return [{ ref: url.href.replace('##', '#') }];
                } else {
                    return []; // remove definition object
                }
            },
            schema[id]
        );
        fn.replaceDeepKey(
            '$dynamicRef',
            (ref) => {
                if (typeof ref === 'string') {
                    let url;
                    if (ref.indexOf('http') === 0) {
                        if (ref.indexOf('#') > 0) {
                            url = new URL(`${ref.substring(0, ref.indexOf('#'))}`);
                        } else {
                            url = new URL(`${ref}`);
                        }
                    } else if (ref.indexOf('#') === 0) {
                        url = new URL(`${id}`);
                    } else {
                        url = new URL(`${id}/----unexpected-case----${ref}`);
                    }
                    return [{ ref: url.href.replace('##', '#') }];
                } else {
                    return []; // remove definition object
                }
            },
            schema[id]
        );
        // no longer needed, remove
        fn.replaceDeepKey('id', () => [], schema[id]);
        fn.replaceDeepKey('$id', () => [], schema[id]);
        fn.replaceDeepKey('$schema', () => [], schema[id]);
        fn.replaceDeepKey('$anchor', () => [], schema[id]);
        fn.replaceDeepKey('$comment', () => [], schema[id]);
        fn.replaceDeepKey('$vocabulary', () => [], schema[id]);
        fn.replaceDeepKey('$dynamicAnchor', () => [], schema[id]);
        fn.replaceDeepKey('$recursiveAnchor', () => [], schema[id]);
        fn.replaceDeepKey('properties', (properties) => (Object.keys(properties).length === 0 ? [] : undefined), schema[id]); // emptied properties

        // decentralize definitions
        if (schema[id].definitions) Object.keys(schema[id].definitions).forEach((key) => (schema[`${id}#/definitions/${key}`.replaceAll('##', '#')] = schema[id].definitions[key]));
        if (schema[id].$defs) Object.keys(schema[id].$defs).forEach((key) => (schema[`${id}#/$defs/${key}`.replaceAll('##', '#')] = schema[id].$defs[key]));
        fn.replaceDeepKey('definitions', () => [], schema[id]);
        fn.replaceDeepKey('$defs', () => [], schema[id]);
    };
    // id parser
    const parser = (...keys) => {
        const target = fn.get(files, ...keys);
        if (typeof target.id === 'string') (schema[target.id] = target) && decentralize(target.id);
        if (typeof target.$id === 'string') (schema[target.$id] = target) && decentralize(target.$id);
    };
    // extract id or $id
    fn.parseDeepKeyParent('id', parser, files);
    fn.parseDeepKeyParent('$id', parser, files);
    return schema;
};

