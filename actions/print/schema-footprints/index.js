'use strict';
// print schema footprints
const files = require('zerodep/node/tree/json')('./src');
const schema = require(`${process.env.PWD}/base/schema`)(files);
const footprint = require(`${process.env.PWD}/base/utils/footprint`);

console.log('Printing schema footprints:');
const unique = {};
Object.keys(schema).forEach((key) => {
    const id = footprint(schema[key]);
    unique[id] = {};
    console.log(id);
});

console.log('============================================');
console.log('schema footprints count:', Object.keys(unique).length);
console.log('all schema count:', Object.keys(schema).length);
