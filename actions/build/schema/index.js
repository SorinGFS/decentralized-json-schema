'use strict';
// get the compiled ./src schema and output into schema.json
const fs = require('zerodep/node/fs');
const fn = require('zerodep/node/fn');
const schema = require('../../../base/schema');
fs.writeFile('index.json', JSON.stringify(fn.structuredClone(schema), false, 4));
console.log('Schema build succeded and can be accessed at: ./index.json\nIf json-schema is installed as dependency use:\nconst schema = require(\'decentralized-json-schema\');');