'use strict';
// build schema from all files in ./src directory
const fs = require('zerodep/node/fs');
const fn = require('zerodep/node/fn');
const files = require('zerodep/node/tree/json')('./src');
const schema = require(`${process.env.PWD}/base/schema`)(files);
fs.writeFile('index.json', JSON.stringify(fn.structuredClone(schema), false, 4));
console.log('Schema build succeded and can be accessed at: ./index.json\nIf json-schema is installed as dependency use:\nconst schema = require(\'decentralized-json-schema\');');
