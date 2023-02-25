'use strict';
// proccessing json files inside ./src into decentralized schema
const fn = require('zerodep/node/fn');
const files = require('zerodep/node/tree/json')('./src');
const schema = {};

// all individual schemas will run through this
const decentralize = (id) => {
    // re-reference
    fn.replaceDeep(schema[id], '$ref', (ref) => {
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
    });
    fn.replaceDeep(schema[id], '$recursiveRef', (ref) => {
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
    });
    fn.replaceDeep(schema[id], '$dynamicRef', (ref) => {
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
    });
    // no longer needed, remove
    fn.replaceDeep(schema[id], 'id', () => []);
    fn.replaceDeep(schema[id], '$id', () => []);
    fn.replaceDeep(schema[id], '$schema', () => []);
    fn.replaceDeep(schema[id], '$anchor', () => []);
    fn.replaceDeep(schema[id], '$comment', () => []);
    fn.replaceDeep(schema[id], '$vocabulary', () => []);
    fn.replaceDeep(schema[id], '$dynamicAnchor', () => []);
    fn.replaceDeep(schema[id], '$recursiveAnchor', () => []);
    fn.replaceDeep(schema[id], 'properties', (properties) => (Object.keys(properties).length === 0 ? [] : undefined)); // emptied properties

    // decentralize definitions
    if (schema[id].definitions) Object.keys(schema[id].definitions).forEach((key) => (schema[`${id}/definitions/${key}`] = schema[id].definitions[key]));
    if (schema[id].$defs) Object.keys(schema[id].$defs).forEach((key) => (schema[`${id}#/$defs/${key}`] = schema[id].$defs[key]));
    fn.replaceDeep(schema[id], 'definitions', () => []);
    fn.replaceDeep(schema[id], '$defs', () => []);
};

// extract id
fn.parseDeepKeyParent(
    'id',
    (...keys) => {
        const target = fn.get(files, ...keys);
        if (typeof target.id === 'string') (schema[target.id] = target) && decentralize(target.id);
    },
    files
);

// extract $id
fn.parseDeepKeyParent(
    '$id',
    (...keys) => {
        const target = fn.get(files, ...keys);
        if (typeof target.$id === 'string') (schema[target.$id] = target) && decentralize(target.$id);
    },
    files
);

module.exports = schema;
