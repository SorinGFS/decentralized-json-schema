'use strict';
// print schema footprints
const schema = require(`${process.env.PWD}/base/schema`)(process.argv[2] || './src');
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
