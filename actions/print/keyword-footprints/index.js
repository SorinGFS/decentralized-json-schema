'use strict';
// print keyword definition footprints
console.time('execution time')
const fn = require('zerodep/node/fn');
const schema = require('../../../base/schema');
const footprint = require('../../../base/utils/footprint');

const unique = {};
console.log('keyword definition footprints:');
fn.deepKeys(schema).forEach((key) => {
    fn.parseDeepKey(
        key,
        (object, ...keys) => {
            const value = fn.get(object, ...keys);
            if (typeof value === 'object') {
                const crc = footprint(value);
                if (!unique[crc]) {
                    unique[crc] = [key];
                } else {
                    unique[crc].push(key);
                }
            }
        },
        schema
    );
});
let count = 0;
Object.keys(unique).forEach((key) => (count += unique[key].length) && console.log(key, unique[key]));
console.log('============================================');
console.log('keyword definition referrers:', count);
console.log('keyword definition footprints:', Object.keys(unique).length);
console.timeEnd('execution time')