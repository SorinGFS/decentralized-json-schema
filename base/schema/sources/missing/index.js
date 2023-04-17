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
                const ref = new URL(process.env.buildRefType === 'jsonPointer' ? fn.jsonPointerKeys(target.$ref.replace('#/', '')).join('/') : target.$ref, 'schema:/').href;
                if (!schema[ref]) {
                    const key = Object.keys(schema)
                        .filter((id) => ref.indexOf(id) === 0)
                        .find((id) => fn.get(schema, id, ...fn.jsonPointerKeys(fn.relativeUriReference(ref, id))));
                    if (!key) sources.push(target.$ref);
                }
            }
        },
        schema
    );
    return fn.uniqueArray(sources).sort();
};
