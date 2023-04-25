'use strict';
// returns a list of urls referenced but not downloaded
const fn = require('zerodep/node/fn');
// input must be directory pathResolve arguments
module.exports = (...dirPathResolveArgs) => {
    const schema = require('../..')(...dirPathResolveArgs);
    const sources = [];
    fn.parseDeepKeyParent(
        '$ref',
        (...refs) => {
            const target = fn.get(schema, ...refs);
            if (typeof target.$ref === 'string') {
                const keys = fn.jsonPointerKeys(target.$ref.startsWith('#/') ? target.$ref.replace('#/', '') : target.$ref);
                if (!Object.keys(schema).find((id) => fn.get(schema, id, ...keys.slice(1)))) sources.push(new URL('', keys.join('/').replace('/#/', '#/')).href);
            }
        },
        schema
    );
    return fn.uniqueArray(sources).sort();
};
