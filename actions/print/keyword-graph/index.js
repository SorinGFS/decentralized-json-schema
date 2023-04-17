'use strict';
// print keywords by version
const fn = require('zerodep/node/fn');
// const schema = require(`${process.env.PWD}/index.json`); // as built
const schema = require(`${process.env.PWD}/base/schema`)(process.argv[2] || process.env.sourcePath);
const tree = require(`${process.env.PWD}/base/utils/json-schema-tree`)(schema);

console.log('Detected keyword definitions across versions from left to right:');
console.log('draft-04, draft-06, draft-07, draft/2019-09, draft/2020-12, draft/next');
fn.deepKeys(schema).forEach((key) => {
    let graph = [];
    Object.keys(tree).forEach((version) => {
        if (tree[version][key]) {
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
