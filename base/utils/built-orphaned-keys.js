'use strict';
// returns a list of keys not referenced
const fn = require('zerodep/node/fn');
// input must be directory pathResolve arguments
module.exports = (...dirPathResolveArgs) => {
    const schema = require('../schema')(...dirPathResolveArgs);
    const keys = Object.keys(schema);
    const built = require('../../index.json');
    const refs = []
    fn.parseDeepKey(
        'ref',
        (...keys) => {
            if (typeof fn.get(built, ...keys) === 'string') {
                refs.push(fn.get(built, ...keys));
            }
        },
        built
    );
    return keys.filter((key) => !refs.includes(key));
};
