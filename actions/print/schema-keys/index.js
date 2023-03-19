'use strict';
// print schema keys
const schema = require(`${process.env.PWD}/base/schema`)(process.argv[2] || './src');

console.log('Printing schema keys:');
Object.keys(schema).sort().forEach((key) => {
    console.log(key);
});
console.log('============================================');
console.log('schema keys count:', Object.keys(schema).length);