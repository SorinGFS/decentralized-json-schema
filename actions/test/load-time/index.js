'use strict';
console.time('load time')
// get the compiled ./src schema and output into schema.json
const schema = require(`${process.env.PWD}/base/schema`)(process.argv[2] || './src');

console.timeEnd('load time')

