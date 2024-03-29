[<<Back](readme.md)

### Changes:

- 0.8.3
    - refctoring: removing `.env` vars from `config`, `DJS` will have a `config` based on a `schema` which will be builded into `DJS`itself. This will allow each schema to be configured differently (having own global links, output schema, build options, so on...)
    - dependencies: removing `dotenv` dependency

- 0.8.2
    - enhancement: improve `compact-schema` function to avoid splitting escaped `\\/` and `patternProperties` content
    - dependencies: bump zerodep to 1.7.16

- 0.8.1
    - bug: fix `transformReferences` for the case when `resetReferences` cannot find the relative uri

- 0.8.0
    - enhancement: add source allowed only over `https`, `http` is redirected, other protocols are triggering error
    - enhancement: security check for json problematic characters in downloaded schemas
    - enhancement: removing option to build `$vocabulary`, in `DJS` unknown keywords are ignored
    - enhancement: transform all schema id's and references to use `schema:` protocol
    - enhancement: transform `dependencies`into `dependentRequired` and `dependentSchemas`
    - enhancement: transform `draft-04 exclusive*` to their corresponding numeric value in `minimum` or `maximum`
    - enhancement: transform `definitions` into `$defs`
    - feature: support to compile even a single source file not just a directory
    - dependencies: bump zerodep to 1.7.9

- 0.7.0
    - bug: fix add schema while the built schema `./index.json` file was previously deleted (starting new build)
    - enhancement: extract `compactSchema` as utility function and removing `buildType` option from `.env` file
    - enhancement: transform `items` and `additionalItems` into `prefixItems` and `items`
    - enhancement: clarify docs about how `DJS` is supposed to work
    - feature: action `output compact-schema` to save the compact view of the compiled schema to desired location

- 0.6.7
    - enhancement: removing the `subdomainsNested` when saving schemas for consistency accross installs
    - dependencies: bump zerodep to 1.7.1

- 0.6.6
    - bug: fix transform dependencies into dependentRequired and dependentSchemas in third party schemas
    - enhancement: avoid ids referencing fragments when recursively extracting ids
    - enhancement: transform references that would trigger infinite loop into dynamic references
    - enhancement: normalize dynamic references in drafts prior to `draft/2020-12` as `_meta`

- 0.6.5
    - enhancement: transform dependencies into dependentRequired and dependentSchemas in third party schemas

- 0.6.4
    - dependencies: bump zerodep to 1.6.12

- 0.6.3
    - refactoring: `buildType` become `buildMode` to avoid confusion with `json-schema`keyword `type`
    - enhancement: add schema source dependencies by reading base source instead of compiled schema

- 0.6.2
    - enhancement: remove `.json` extension from ids and references
    - enhancement: split schema extraction in 2 parts to avoid processing dependent schemas before their base
    - bug: fix `draft-04/draft-07` keywords being placed inside fragment `#`
    - dependencies: bump zerodep to 1.6.11

- 0.6.1
    - enhancement: decode URI before setting keys
    - enhancement: avoiding the alteration of references whose targets have not been extracted into `#`
    - dependencies: bump zerodep to 1.6.10

- 0.6.0
    - feature: added default `buildVocabulary=false` into .env file (if removed build will preserve `$vocabulary`)
    - feature: added default `buildComment=false` into .env file (if removed build will preserve `$comment`)
    - enhancement: placing referenced items (defs, anchors) inside own key `#` which later can be ignored by the parsers
    - enhancement: adapt schema/sources/missing to return the original location of missing source
    - enhancement: allow add/remove source to specified path
    - note: default `buildType=compact` is maintained into .env file for better content view, will be removed soon

- 0.5.3
    - enhancement: adapt schema/sources/missing for `buildType=compact`

- 0.5.2
    - enhancement: removing option `buildRefType` from .env file
    - enhancement: references are set as `jsonPointer` (conversion from `jsonPointer` to `URL` is trivial)

- 0.5.1
    - bug: fix `$ref` definitions being tampered

- 0.5.0
    - enhancement: added option `buildType=compact` into .env file (default only in this version as example)

- 0.4.0
    - enhancement: removing drafts 00-03
    - enhancement: removing non spec related sources (for this version only)
    - enhancement: processing references before anchor extraction
    - dependencies: bump zerodep to 1.6.9

- 0.3.1
    - enhancement: minor refactoring, no functional changes

- 0.3.0
    - feature: added default `buildRefType=jsonPointer` into .env file (if removed build ref type would be URL)
    - enhancement: preprocessing dynamic anchors into schema keys by adding `_` prefix
    - enhancement: preprocessing dynamic references into `$ref`by adding `_` prefix
    - dependencies: bump zerodep to 1.6.5

- 0.2.5
    - bug: preprocessing static and dynamic anchors into schema keys instead of static references
    - bug: fix resolving dynamic references
    - enhancement: passing default `sourcePath=./src` into .env file (now available in actions)

- 0.2.4
    - enhancement: preprocessing static and dynamic anchors as static references
    - enhancement: now dynamic references can only be resolved at runtime

- 0.2.3
    - enhancement: decentralizing nested schemas
    - enhancement: added ability to set global vars in .env file using `dotenv`
    - dependencies: bump zerodep to 1.6.1

- 0.2.2
    - enhancement: automatically download schemas contained within manually added sources
    - enhancement: automatically remove schemas contained within manually removed sources
    - dependencies: bump zerodep to 1.5.9

- 0.2.1
    - enhancement: add retrieval url as id to schemas that do not have an id
    - dependencies: bump zerodep to 1.5.8
    
- 0.2.0
    - enhancement: improved actions API
    - enhancement: added ability to adjust sources and built content one schema at a time and keep them in sync
    - enhancement: standardizing the way in which retrieved schema sources are saved to disk
    - feature: programmatically add / remove schema sources
    - feature: programmatically add / remove schema keys

- 0.1.7
    - enhancement: improving parsers
