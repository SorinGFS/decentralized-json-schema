'use strict';
// print keyword definitions
const fn = require('zerodep/node/fn');
const schema = require('../../../base/schema');

let count = 0;
console.log('Printing keyword definitions:');
fn.deepKeys(schema).forEach((key) => {
    fn.parseDeepKey(
        key,
        (object, ...keys) => {
            const value = fn.get(object, ...keys);
            if (typeof value === 'object') (count += 1) && console.log(key, value);
        },
        schema
    );
});
console.log('============================================');
console.log('keyword definitions count:', count);
