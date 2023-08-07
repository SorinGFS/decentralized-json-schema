'use strict';
// print definitions for given keyword or for all schema
const fn = require('zerodep/node/fn');
const schema = require(`${process.env.PWD}/base/schema`)(process.argv[2] || './src');
const keyword = process.argv[3];
let count = 0;
console.log('Printing keyword definitions:');
fn.deepKeys(schema).forEach((key) => {
    fn.parseDeepKey(
        key,
        (...keys) => {
            const value = fn.get(schema, ...keys);
            if (fn.isObjectNotArray(value)) {
                count += 1;
                if ((keyword && key === keyword) || !keyword) console.log(key, value);
            }
        },
        schema
    );
});
console.log('============================================');
console.log('keyword definitions count:', count);
