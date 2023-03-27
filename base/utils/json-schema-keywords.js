'use strict';
// detect unique keywords and schemas in which resides
const fn = require('zerodep/node/fn');
// receives schema object and outputs keywords tree by version
module.exports = (schema) => {
    const versions = ['draft-00', 'draft-01', 'draft-02', 'draft-03', 'draft-04', 'draft-06', 'draft-07', 'draft/2019-09', 'draft/2020-12', 'draft/next'];
    const keywords = {};
    Object.keys(schema).forEach(() => {
        versions.forEach((version) => {
            keywords[version] = {};
        });
    });
    Object.keys(schema).forEach((key) => {
        versions.forEach((version) => {
            if (key.indexOf(version) > 0) {
                let versionKeywords = [];
                fn.parseDeep((...refs) => {
                    versionKeywords.push(...refs);
                }, schema[key]);
                versionKeywords = fn.uniqueArray(String(versionKeywords).split(',')).sort();
                // remove array keys
                versionKeywords.forEach((value, index) => {
                    if (fn.isNumeric(value)) delete versionKeywords[index];
                });
                versionKeywords = versionKeywords.filter((n) => n);
                // adding an empty object for each keyword (to be populated with data from lists later on)
                versionKeywords.forEach((keyword) => (keywords[version][keyword] = {}));
            }
        });
    });
    return keywords;
};
