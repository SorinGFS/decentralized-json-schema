'use strict';
const fs = require('zerodep/node/fs');
// get schema missing keys for the given directory
const missingKeys = require(`${process.env.PWD}/base/schema/sources/missing`)(process.argv[2] || './src');
// print
console.log('======= printing missing schema keys =======');
console.log(missingKeys);
console.log('============================================');
console.log('missing schema keys count:', missingKeys.length);
fs.writeFile('missing.json', JSON.stringify(missingKeys, false, 4));