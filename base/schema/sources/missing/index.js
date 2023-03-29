'use strict';
// returns a list of urls referenced but not downloaded
const fn = require('zerodep/node/fn');
// input must be directory pathResolve arguments
module.exports = (...dirPathResolveArgs) => {
    const schema = require('../..')(...dirPathResolveArgs);
    const keys = Object.keys(schema).sort();
    const sources = [];
    fn.parseDeepKeyParent(
        'ref',
        (...refs) => {
            const target = fn.get(schema, ...refs);
            if (typeof target.ref === 'string') {
                const ref = new URL(target.ref, 'schema:/');
                if (!keys.includes(ref.href)) {
                    if (ref.href.indexOf('#') > 0) sources.push(target.ref);
                    ref.hash = '';
                    if (!keys.find((key) => key.indexOf(ref.href) === 0)) {
                        sources.push(target.ref);
                    }
                }
            }
        },
        schema
    );
    return fn.uniqueArray(sources).sort();
};
