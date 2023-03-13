'use strict';
// print keyword definitions
const fn = require('zerodep/node/fn');
const files = require('zerodep/node/tree/json')('./src');
const schema = require(`${process.env.PWD}/base/schema`)(files);

let count = 0;
console.log('Printing keyword definitions:');
fn.deepKeys(schema).forEach((key) => {
    fn.parseDeepKey(
        key,
        (...keys) => {
            const value = fn.get(schema, ...keys);
            if (typeof value === 'object') (count += 1) && console.log(key, value);
        },
        schema
    );
});
console.log('============================================');
console.log('keyword definitions count:', count);
