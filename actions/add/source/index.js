'use strict';
// downloading schema source files from specified url
const fs = require('zerodep/node/fs');
const fn = require('zerodep/node/fn');
const exec = require('zerodep/node/exec');
// argument must be an url
const url = !process.argv[2].startsWith('http') ? process.exit(0) : process.argv[2].replace(/^http:/, 'https:');
const sourcePath = process.argv[3] || process.env.sourcePath;
const pathArgs = fs.filePathResolveArgs({ parser: 'json' }, sourcePath, ...fs.pathResolveArgsFromUri(url.replace(/^(.*?):/, 'schema:'), { pathOnly: false }));
// run async
(async () => {
    if (!fs.isFile(...pathArgs)) {
        fs.mkdir(...pathArgs.slice(0, -1));
        try {
            await fs.download(url, ...pathArgs);
            const string = fs.readFile(fs.pathResolve(...pathArgs), { encoding: 'utf-8' });
            const json = JSON.parse(fn.hasJsonProblematicChars(string) ? null : string);
            if (!json.id && !json.$id) (json.$id = url) && fs.writeFile(fs.pathResolve(...pathArgs), JSON.stringify(json, false, 4));
            console.log(`Source url '${url}' successfully added.`);
            let exitCode = 0;
            const missing = {};
            fn.replaceDeepKey(
                /^(\$id|id|\$ref)$/,
                (target) => {
                    if (typeof target === 'string' && target.indexOf('#') !== 0) {
                        const key = new URL('', new URL(target, url).href).href;
                        if (key.replace(/\.json$/, '') !== url.replace(/\.json$/, '')) missing[key] = {};
                        return { ref: 'extracted' };
                    }
                },
                json
            );
            for (const url of Object.keys(missing)) exitCode += await exec('node', 'actions', 'add', 'source', url, sourcePath);
            exitCode += await exec('node', 'actions', 'add', 'schema', fs.pathResolve(...pathArgs));
            if (exitCode) throw new Error(`Compiling the schema from source url '${url}' failed!`);
        } catch (err) {
            fs.removeFile(fs.pathResolve(...pathArgs));
            if (!fs.entries(...pathArgs.slice(0, -1)).length) fs.removeDir(...pathArgs.slice(0, -1));
            console.error(`Invalid source url: '${url}'\n\t${err.message}`);
            process.exit(1);
        }
    }
})();
