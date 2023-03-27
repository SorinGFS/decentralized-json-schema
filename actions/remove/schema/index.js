'use strict';
// removing schema key from schema built
const fs = require('zerodep/node/fs');
// argument must be an url
const url = process.argv[2];
const built = require(`${process.env.PWD}/index.json`);
if (built[url]) {
    Object.keys(built).forEach((key) => {
        if (key.indexOf(url) === 0) delete built[key];
    });
    fs.writeFile('index.json', JSON.stringify(built, false, 4));
    console.log(`Schema key '${url}' successfully removed.`);
} else {
    console.error(`Schema key '${url}' does not exist in schema built!`);
    process.exit(1);
}
