'use strict';
// build schema from all files in given directory or in .env.sourcePath directory
const fs = require('zerodep/node/fs');
const fn = require('zerodep/node/fn');
const schema = require(`${process.env.PWD}/base/schema`)(process.argv[2] || process.env.sourcePath);
fs.writeFile('index.json', JSON.stringify(fn.structuredClone(schema), false, 4));
console.log('Schema build succeded and can be accessed at: ./index.json\nIf json-schema is installed as dependency use:\nconst context = require(\'decentralized-json-schema\');');
