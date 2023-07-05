'use strict';
// compact the compiled schema and save it to desired location (default ./compact.json)
const fs = require('zerodep/node/fs');
const fn = require('zerodep/node/fn');
const output = process.argv[2] || 'compact.json';
const compactSchema = require(`${process.env.PWD}/base/utils/compact-schema`);
const built = require(`${process.env.PWD}/index.json`);
fs.writeFile(output, JSON.stringify(fn.structuredClone(compactSchema(built)), false, 4));
console.log(`Compiled schema successfully compacted.`);
