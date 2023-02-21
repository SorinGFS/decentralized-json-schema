'use strict';
// print keywords by version
const fn = require('zerodep/node/fn');
// const schema = require('../../../index.json'); // build
const schema = require('../../../base/schema');
const keywords = require('../../../base/keywords')(schema);

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

