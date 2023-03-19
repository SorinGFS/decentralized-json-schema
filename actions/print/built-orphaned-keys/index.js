'use strict';
// get schema orphaned keys for the given directory
const orphanedKeys = require(`${process.env.PWD}/base/utils/built-orphaned-keys`)(process.argv[2] || './src');
// print
console.log('======= printing orphaned schema keys =======');
console.log(orphanedKeys);
console.log('============================================');
console.log('orphaned schema keys count:', orphanedKeys.length);
