'use strict';
// detect unique keywords and schemas in which resides
const fn = require('zerodep/node/fn');
// receives schema object and outputs keywords tree by version
module.exports = (schema) => {
    const versions = ['draft-04', 'draft-06', 'draft-07', 'draft/2019-09', 'draft/2020-12', 'draft/next'];
    const tree = {};
    Object.keys(schema).forEach(() => {
        versions.forEach((version) => {
            tree[version] = {};
        });
    });
    Object.keys(schema).forEach((id) => {
        versions.forEach((version) => {
            if (id.indexOf(version) > 0) {
                let versionKeys = [];
                fn.parseDeep((...refs) => {
                    // if (fn.isObjectNotArray(fn.get(schema[id], ...refs))) versionKeys.push(...refs);
                    const value = fn.get(schema[id], ...refs);
                    const parentKey = String(refs.slice(-2, -1));
                    if (fn.isObjectNotArray(value) && id.indexOf('output') < 0 && id.indexOf('$defs') < 0 && id.indexOf('definitions') < 0 && parentKey === 'properties') versionKeys.push(...refs.slice(-1));
                }, schema[id]);
                versionKeys = fn.uniqueArray(String(versionKeys).split(',')).sort();
                // remove array keys
                versionKeys.forEach((value, index) => {
                    if (fn.isNumeric(value)) delete versionKeys[index];
                });
                versionKeys = versionKeys.filter((n) => n);
                // adding an empty object for each key (to be populated with data from lists later on)
                versionKeys.forEach((key) => (tree[version][key] = { contextId: id }));
            }
        });
    });
    return tree;
};
