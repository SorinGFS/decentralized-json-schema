'use strict';
//
const fn = require('zerodep/node/fn');
const string = (object) => JSON.stringify(fn.structuredClone(object));
module.exports = (object) => fn.crc32(string(object)).toString(16) + fn.crc32(fn.reverseString(string(object))).toString(16);
