'use strict';
// print definitions for given keyword or for all schema
const fn = require('zerodep/node/fn');
const schema = require(`${process.env.PWD}/base/schema`)(process.env.sourcePath || './src');
const keyword = process.argv[2];
let count = 0;
console.log('Printing keyword definitions:');
fn.deepKeys(schema).forEach((key) => {
    fn.parseDeepKey(
        key,
        (...keys) => {
            const value = fn.get(schema, ...keys);
            if (keyword) {
                if (key === keyword && fn.isObjectNotArray(value)) (count += 1) && console.log(key, value);
            } else if (fn.isObjectNotArray(value)) (count += 1) && console.log(key, value);
        },
        schema
    );
});
console.log('============================================');
console.log('keyword definitions count:', count);
