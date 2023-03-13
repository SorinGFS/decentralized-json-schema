'use strict';
console.time('load time')
// get the compiled ./src schema and output into schema.json
const files = require('zerodep/node/tree/json')('./src');
const schema = require(`${process.env.PWD}/base/schema`)(files);

console.timeEnd('load time')

