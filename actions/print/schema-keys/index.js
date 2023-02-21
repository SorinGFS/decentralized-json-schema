'use strict';
// print schema keys
const schema = require('../../../base/schema');

console.log('Printing schema keys:');
Object.keys(schema).sort().forEach((key) => {
    console.log(key);
});
console.log('============================================');
console.log('schema keys count:', Object.keys(schema).length);