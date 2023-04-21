[<<Back](readme.md)

### Changes:

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
