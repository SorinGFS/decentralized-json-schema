'use strict';
// returns a list of urls referenced but not downloaded
const fn = require('zerodep/node/fn');
// input must be directory pathResolve arguments
module.exports = (...dirPathResolveArgs) => {
    const schema = require('../..')(...dirPathResolveArgs);
    const sources = [];
    fn.parseDeepKey(
        '$ref',
        (...refs) => {
            const target = fn.get(schema, ...refs);
            if (typeof target === 'string' && target.indexOf('#/') !== 0) sources.push('Not Found: ' + target);
            if (typeof target === 'string' && target.indexOf('#/') === 0) {
                const keys = fn.jsonPointerKeys(target.replace(/^(#\/)/, ''));
                if (!Object.keys(schema).find((id) => fn.get(schema, id, ...keys.slice(1)))) sources.push('Wrong Found: ' + target);
            }
        },
        schema
    );
    return fn.uniqueArray(sources).sort();
};
