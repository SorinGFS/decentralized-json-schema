'use strict';
// print schema keys
const files = require('zerodep/node/tree/json')('./src');
const schema = require(`${process.env.PWD}/base/schema`)(files);

console.log('Printing schema keys:');
Object.keys(schema).sort().forEach((key) => {
    console.log(key);
});
console.log('============================================');
console.log('schema keys count:', Object.keys(schema).length);