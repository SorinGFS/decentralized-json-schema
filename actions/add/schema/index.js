'use strict';
// adding schema from specified files only (to avoid recompile the whole ./src directory)
const fs = require('zerodep/node/fs');
const fn = require('zerodep/node/fn');
// arg must be directory pathResolve arg
const schema = require(`${process.env.PWD}/base/schema`)(process.argv[2]);
const built = require(`${process.env.PWD}/index.json`);
fs.writeFile('index.json', JSON.stringify(fn.structuredClone(Object.assign({}, built, schema)), false, 4));
console.log(`Schema from '${process.argv[2]}' successfully compiled.`);
