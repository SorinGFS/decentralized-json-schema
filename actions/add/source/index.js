'use strict';
// downloading schema source files from specified url
const fs = require('zerodep/node/fs');
const exec = require('zerodep/node/exec');
// argument must be an url
const url = process.argv[2];
const sourcePath = process.argv[3] || process.env.sourcePath;
const pathArgs = fs.filePathResolveArgs({ parser: 'json' }, sourcePath, ...fs.pathResolveArgsFromUri(url, { pathOnly: false, subdomainsNested: true }));
// run async
(async () => {
    if (!fs.isFile(...pathArgs)) {
        fs.mkdir(...pathArgs.slice(0, -1));
        try {
            await fs.download(url, ...pathArgs);
            const json = JSON.parse(fs.readFile(fs.pathResolve(...pathArgs), { encoding: 'utf-8' }));
            if (!json.id && !json.$id) (json.$id = url) && fs.writeFile(fs.pathResolve(...pathArgs), JSON.stringify(json, false, 4));
            console.log(`Source url '${url}' successfully added.`);
            let exitCode = await exec('node', 'actions', 'add', 'schema', fs.pathResolve(...pathArgs.slice(0, -1)));
            if (exitCode) throw new Error(`Compiling the schema from source url '${url}' failed!`);
            // in vscode if json.schemaDownload.enable = true the missing refs are automatically saved elsewhere
            const missingSources = require(`${process.env.PWD}/base/schema/sources/missing`)(...pathArgs.slice(0, -1));
            // a missing source may embed other missing sources
            if (missingSources.length) {
                let ref = missingSources[0];
                ref = ref.endsWith('/') ? ref + 'index.json' : !fs.pathExtName(ref) ? ref + '.json' : ref;
                console.log(`Start adding schema dependency from source url: '${ref}'...`);
                exitCode = await exec('node', 'actions', 'add', 'source', ref, sourcePath);
                if (exitCode) throw new Error(`Adding the schema dependency from source url '${ref}' failed!`);
            };
        } catch (err) {
            fs.removeFile(fs.pathResolve(...pathArgs));
            if (!fs.entries(...pathArgs.slice(0, -1)).length) fs.removeDir(...pathArgs.slice(0, -1));
            console.error(`Invalid source url: '${url}'\n\t${err.message}`);
            process.exit(1);
        }
    } else {
        console.error(`Source url '${url}' already exists. If you want to renew first remove it from source path then add it again!`);
        // process.exit(1);
    }
})();
