'use strict';
// returns a list of keys not referenced
const fn = require('zerodep/node/fn');
// input must be directory pathResolve arguments
module.exports = () => {
    const built = require('../../index.json');
    const keys = Object.keys(built).sort();
    const refs = [];
    fn.parseDeepKey(
        'ref',
        (...keys) => {
            if (typeof fn.get(built, ...keys) === 'string') {
                refs.push(fn.get(built, ...keys));
            }
        },
        built
    );
    let orphans = [];
    keys.forEach((key) => {
        if (!refs.includes(key)) {
            if (
                !refs.find((ref) => {
                    let cleanRef = new URL(ref);
                    cleanRef.hash = '';
                    let cleanKey = new URL(key);
                    cleanKey.hash = '';
                    return cleanRef.href === key || cleanRef.href === cleanKey.href;
                })
            ) {
                orphans.push(key);
            }
        }
    });
    return orphans;
};
