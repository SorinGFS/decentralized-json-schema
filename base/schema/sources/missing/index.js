'use strict';
// returns a list of urls referenced but not downloaded
const fn = require('zerodep/node/fn');
// input must be directory pathResolve arguments
module.exports = (...dirPathResolveArgs) => {
    const schema = require('../..')(...dirPathResolveArgs);
    const sources = [];
    fn.parseDeepKeyParent(
        'ref',
        (...refs) => {
            const target = fn.get(schema, ...refs);
            if (typeof target.ref === 'string' && !schema[target.ref]) sources.push(target.ref.substring(0, target.ref.indexOf('#')));
        },
        schema
    );
    return fn.uniqueArray(sources).sort();
};
