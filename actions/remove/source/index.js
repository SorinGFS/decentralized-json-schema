'use strict';
// removing schema source files from specified url
const fs = require('zerodep/node/fs');
const exec = require('zerodep/node/exec');
// argument must be an url
const url = process.argv[2];
const sourcePath = process.argv[3] || process.env.sourcePath;
const pathArgs = fs.filePathResolveArgs({ parser: 'json' }, sourcePath, ...fs.pathResolveArgsFromUri(url, { pathOnly: false }));
// run async
(async () => {
    if (fs.isFile(...pathArgs)) {
        fs.removeFile(...pathArgs);
        if (!fs.entries(...pathArgs.slice(0, -1)).length) fs.removeDir(...pathArgs.slice(0, -1));
        console.log(`Source url '${url}' successfully removed.`);
        const exitCode = await exec('node', 'actions', 'remove', 'schema', url);
        if (exitCode) throw new Error(`Removing the schema from source url '${url}' failed!`);
    } else {
        console.error(`Source url '${url}' does not exist!`);
        process.exit(1);
    }
})();
