'use strict';
// get the compiled ./src schema and output into schema.json
const fn = require('zerodep/node/fn');
const files = require('zerodep/node/tree/json')('./src');
const schema = require(`${process.env.PWD}/base/schema`)(files);

// check refs
console.log('======= checking invalid references =======');
const references = {};
fn.parseDeepKeyParent(
    'ref',
    (...refs) => {
        const target = fn.get(schema, ...refs);
        if (typeof target.ref === 'string' && !schema[target.ref]) references[target.ref] = {};
    },
    schema
);
console.log(Object.keys(references).sort());
console.log('============================================');
console.log('invalid references count:', Object.keys(references).length);

