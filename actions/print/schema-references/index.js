'use strict';
// print schema references
const fn = require('zerodep/node/fn');
const files = require('zerodep/node/tree/json')('./src');
const schema = require(`${process.env.PWD}/base/schema`)(files);
const references = {};

console.log('Printing schema references:');
fn.parseDeepKey(
    'ref',
    (...keys) => {
        if (typeof fn.get(schema, ...keys) === 'string') {
            references[fn.get(schema, ...keys)] = {};
        }
    },
    schema
);
Object.keys(references)
    .sort()
    .forEach((ref) => console.log(ref));
console.log('============================================');
console.log('schema references count:', Object.keys(references).length);
console.log('============================================');
let count = 0;
Object.keys(schema)
    .sort()
    .forEach((key) => {
        if (typeof references[key] === 'undefined') (count += 1) && console.log(key);
    });
console.log('============================================');
console.log('unused schema keys count:', count);