'use strict';
// removing schema source files from specified url
const fs = require('zerodep/node/fs');
const exec = require('zerodep/node/exec');
// argument must be an url
const url = process.argv[2];
const pathArgs = fs.filePathResolveArgs({ parser: 'json' }, './src', ...fs.pathResolveArgsFromUri(url, { pathOnly: false, subdomainsNested: true }));
// run async
(async () => {
    if (fs.isFile(...pathArgs)) {
        fs.removeFile(...pathArgs);
        if (!fs.entries(...pathArgs.slice(0, -1)).length) fs.removeDir(...pathArgs.slice(0, -1));
        console.log(`Source file '${url}' successfully removed.`);
        const exitCode = await exec('node', 'actions', 'remove', 'schema', url);
        if (exitCode) throw new Error(`Removing the schema from source file '${url}' failed!`);
    } else {
        console.error(`Source file '${url}' does not exist!`);
        process.exit(1);
    }
})();
