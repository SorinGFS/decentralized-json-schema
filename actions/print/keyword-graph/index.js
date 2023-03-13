'use strict';
// print keywords by version
const fn = require('zerodep/node/fn');
// const schema = require(`${process.env.PWD}/index.json`); // as built
const files = require('zerodep/node/tree/json')('./src');
const schema = require(`${process.env.PWD}/base/schema`)(files);
const keywords = require(`${process.env.PWD}/base/keywords`)(schema);

console.log('Detected keywords across versions from draft-00 to draft/next:');
fn.deepKeys(schema).forEach((key) => {
    let graph = [];
    Object.keys(keywords).forEach((version) => {
        if (keywords[version][key]) {
            graph.push('1');
        } else {
            graph.push('=');
        }
    });
    graph.push(key);
    console.log(String(graph).replaceAll(',', ' '));
});
console.log('============================================');
console.log('all keywords count:', fn.deepKeys(schema).length);

