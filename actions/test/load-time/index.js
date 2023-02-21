'use strict';
console.time('load time')
// get the compiled ./src schema and output into schema.json
const fn = require('zerodep/node/fn');
const schema = require('../../../base/schema');

console.timeEnd('load time')

