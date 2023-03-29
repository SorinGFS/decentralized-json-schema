'use strict';
// get schema orphan keys for the given directory
const orphanKeys = require(`${process.env.PWD}/base/utils/built-orphan-keys`)();
// print
console.log('======= printing orphan schema keys =======');
console.log(orphanKeys);
console.log('============================================');
console.log('orphan schema keys count:', orphanKeys.length);
