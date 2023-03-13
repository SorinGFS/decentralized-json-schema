'use strict';
// removing schema key from schema built
const fs = require('zerodep/node/fs');
const fn = require('zerodep/node/fn');
// argument must be a key inside schema built
const built = require(`${process.env.PWD}/index.json`);
if (fn.get(built, process.argv[2])) {
    fn.replaceDeepKey(process.argv[2], () => [], built);
    fs.writeFile('index.json', JSON.stringify(built, false, 4));
    console.log(`Schema key '${process.argv[2]}' successfully removed!`);
} else {
    console.error(`Schema key '${process.argv[2]}' does not exist in schema built!`);
    process.exit(1);
}
