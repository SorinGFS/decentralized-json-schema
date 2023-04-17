## Decentralized JSON-Schema

... an experimental work in progress.

This work starts from the idea that any schema, no matter how complex, can be broken down into smaller schemas in which each keyword is either:
- based on an RFC
- refers to another schema that is based on RFC

This project is recompiling `json-schema` and `json-schema` based schemas in a decentralized format by exploiting the full potential of the [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) as schema `key|identifier|selector` and is mounting decentralized schemas in a common environment which later can be used to:
- generate new schemas
- edit schemas
- manage schemas
- document schemas
- export or serve schemas in various formats

Multiple `decentralized-json-schema` environments each having own schemas can be merged into a single context, for example in `javascript` this can be like:

```js
Object.assign(global, workspaces, workspace, workdir, data);
```

### Clone or fork to compile own schemas

```shell
git clone https://github.com/SorinGFS/decentralized-json-schema.git
```

Install dependencies
```shell
npm install
```

### Build / Rebuild

```shell
node actions build schema [dirPath (starting with ./src)]
```

### Add / Remove Schema

```shell
node actions add schema [dirPath (starting with ./src)]
# or
node actions remove schema $uri
```

### Add / Remove Source

```shell
node actions add source $uri
# or
node actions remove source $uri
```
**Note:** this automatically adds / removes built schema


### Test

```shell
node actions test load-time [dirPath (starting with ./src)]
```

### Print

```shell
node actions print schema-references [dirPath (starting with ./src)]
```

### General syntax for running actions

```shell
npm run action $predicate $subject [...args]
# or (from project root or from installed actions)
node actions $predicate $subject [...args]
```
**Note:** The available actions can be found in files in `actions/$predicate/$subject`

### Install for use the compiled schema environment in another projects

```shell
npm i decentralized-json-schema
```

### Usage

```js
const context = require('decentralized-json-schema');
```

### Change Log

See the full list of [changes](changelog.md).

### What's next?

- introduce `$include`

<details>
<summary>
Detected keywords across versions from left to right:

draft-04, draft-06, draft-07, draft/2019-09, draft/2020-12, draft/next
</summary>

```shell
= = = 1 1 1 $anchor
= = 1 1 1 1 $comment
= = = = 1 1 $dynamicAnchor
= = = = 1 1 $dynamicRef
= 1 1 1 1 1 $id
= = = 1 1 1 $recursiveAnchor
= = = 1 1 1 $recursiveRef
= 1 1 1 1 1 $ref
1 1 1 1 1 1 $schema
= = = 1 1 1 $vocabulary
1 1 1 1 = = additionalItems
1 1 1 1 1 1 additionalProperties
1 1 1 1 1 1 allOf
1 1 1 1 1 1 anyOf
= 1 = = = = const
= 1 1 1 1 1 contains
= = 1 1 1 1 contentEncoding
= = 1 1 1 1 contentMediaType
= = = 1 1 1 contentSchema
1 1 1 1 1 1 default
1 1 1 1 1 1 dependencies
= = = 1 1 1 dependentRequired
= = = 1 1 1 dependentSchemas
= = = 1 1 1 deprecated
1 1 1 1 1 1 description
= = 1 1 1 1 else
1 1 1 1 1 1 enum
= 1 1 1 1 1 examples
1 1 1 1 1 1 exclusiveMaximum
1 1 1 1 1 1 exclusiveMinimum
1 1 1 1 1 1 format
1 = = = = = id
= = 1 1 1 1 if
1 1 1 1 1 1 items
= = = 1 1 1 maxContains
1 1 1 1 1 1 maxItems
1 1 1 1 1 1 maxLength
1 1 1 1 1 1 maxProperties
1 1 1 1 1 1 maximum
= = = 1 1 1 minContains
1 1 1 1 1 1 minItems
1 1 1 1 1 1 minLength
1 1 1 1 1 1 minProperties
1 1 1 1 1 1 minimum
1 1 1 1 1 1 multipleOf
1 1 1 1 1 1 not
1 1 1 1 1 1 oneOf
1 1 1 1 1 1 pattern
1 1 1 1 1 1 patternProperties
= = = = 1 1 prefixItems
1 1 1 1 1 1 properties
= = = = = 1 propertyDependencies
= 1 1 1 1 1 propertyNames
= = 1 1 1 1 readOnly
1 1 1 1 1 1 required
= = 1 1 1 1 then
1 1 1 1 1 1 title
1 1 1 1 1 1 type
= = = 1 1 1 unevaluatedItems
= = = 1 1 1 unevaluatedProperties
1 1 1 1 1 1 uniqueItems
= = 1 1 1 1 writeOnly
============================================
all keywords count: 62

======= checking invalid references =======
[]
============================================
invalid references count: 0
```

</details>


<details>
<summary>
Generated schema keys:
</summary>

```shell
http://json-schema.org/draft-04/schema#
http://json-schema.org/draft-04/schema#definitions/positiveInteger
http://json-schema.org/draft-04/schema#definitions/positiveIntegerDefault0
http://json-schema.org/draft-04/schema#definitions/schemaArray
http://json-schema.org/draft-04/schema#definitions/simpleTypes
http://json-schema.org/draft-04/schema#definitions/stringArray
http://json-schema.org/draft-06/schema#
http://json-schema.org/draft-06/schema#definitions/nonNegativeInteger
http://json-schema.org/draft-06/schema#definitions/nonNegativeIntegerDefault0
http://json-schema.org/draft-06/schema#definitions/schemaArray
http://json-schema.org/draft-06/schema#definitions/simpleTypes
http://json-schema.org/draft-06/schema#definitions/stringArray
http://json-schema.org/draft-07/schema#
http://json-schema.org/draft-07/schema#definitions/nonNegativeInteger
http://json-schema.org/draft-07/schema#definitions/nonNegativeIntegerDefault0
http://json-schema.org/draft-07/schema#definitions/schemaArray
http://json-schema.org/draft-07/schema#definitions/simpleTypes
http://json-schema.org/draft-07/schema#definitions/stringArray
https://json-schema.org/draft/2019-09/meta/applicator
https://json-schema.org/draft/2019-09/meta/applicator#$defs/schemaArray
https://json-schema.org/draft/2019-09/meta/applicator#_
https://json-schema.org/draft/2019-09/meta/content
https://json-schema.org/draft/2019-09/meta/content#_
https://json-schema.org/draft/2019-09/meta/core
https://json-schema.org/draft/2019-09/meta/core#_
https://json-schema.org/draft/2019-09/meta/format
https://json-schema.org/draft/2019-09/meta/format#_
https://json-schema.org/draft/2019-09/meta/meta-data
https://json-schema.org/draft/2019-09/meta/meta-data#_
https://json-schema.org/draft/2019-09/meta/validation
https://json-schema.org/draft/2019-09/meta/validation#$defs/nonNegativeInteger
https://json-schema.org/draft/2019-09/meta/validation#$defs/nonNegativeIntegerDefault0
https://json-schema.org/draft/2019-09/meta/validation#$defs/simpleTypes
https://json-schema.org/draft/2019-09/meta/validation#$defs/stringArray
https://json-schema.org/draft/2019-09/meta/validation#_
https://json-schema.org/draft/2019-09/schema
https://json-schema.org/draft/2019-09/schema#_
https://json-schema.org/draft/2020-12/meta/applicator
https://json-schema.org/draft/2020-12/meta/applicator#$defs/schemaArray
https://json-schema.org/draft/2020-12/meta/applicator#_meta
https://json-schema.org/draft/2020-12/meta/content
https://json-schema.org/draft/2020-12/meta/content#_meta
https://json-schema.org/draft/2020-12/meta/core
https://json-schema.org/draft/2020-12/meta/core#$defs/anchorString
https://json-schema.org/draft/2020-12/meta/core#$defs/uriReferenceString
https://json-schema.org/draft/2020-12/meta/core#$defs/uriString
https://json-schema.org/draft/2020-12/meta/core#_meta
https://json-schema.org/draft/2020-12/meta/format-annotation
https://json-schema.org/draft/2020-12/meta/format-annotation#_meta
https://json-schema.org/draft/2020-12/meta/format-assertion
https://json-schema.org/draft/2020-12/meta/format-assertion#_meta
https://json-schema.org/draft/2020-12/meta/meta-data
https://json-schema.org/draft/2020-12/meta/meta-data#_meta
https://json-schema.org/draft/2020-12/meta/unevaluated
https://json-schema.org/draft/2020-12/meta/unevaluated#_meta
https://json-schema.org/draft/2020-12/meta/validation
https://json-schema.org/draft/2020-12/meta/validation#$defs/nonNegativeInteger
https://json-schema.org/draft/2020-12/meta/validation#$defs/nonNegativeIntegerDefault0
https://json-schema.org/draft/2020-12/meta/validation#$defs/simpleTypes
https://json-schema.org/draft/2020-12/meta/validation#$defs/stringArray
https://json-schema.org/draft/2020-12/meta/validation#_meta
https://json-schema.org/draft/2020-12/schema
https://json-schema.org/draft/2020-12/schema#_meta
https://json-schema.org/draft/next/meta/applicator
https://json-schema.org/draft/next/meta/applicator#$defs/nonNegativeInteger
https://json-schema.org/draft/next/meta/applicator#$defs/schemaArray
https://json-schema.org/draft/next/meta/applicator#_meta
https://json-schema.org/draft/next/meta/content
https://json-schema.org/draft/next/meta/content#_meta
https://json-schema.org/draft/next/meta/core
https://json-schema.org/draft/next/meta/core#$defs/anchorString
https://json-schema.org/draft/next/meta/core#$defs/iriReferenceString
https://json-schema.org/draft/next/meta/core#$defs/iriString
https://json-schema.org/draft/next/meta/core#_meta
https://json-schema.org/draft/next/meta/format-annotation
https://json-schema.org/draft/next/meta/format-annotation#_meta
https://json-schema.org/draft/next/meta/format-assertion
https://json-schema.org/draft/next/meta/format-assertion#_meta
https://json-schema.org/draft/next/meta/meta-data
https://json-schema.org/draft/next/meta/meta-data#_meta
https://json-schema.org/draft/next/meta/unevaluated
https://json-schema.org/draft/next/meta/unevaluated#_meta
https://json-schema.org/draft/next/meta/validation
https://json-schema.org/draft/next/meta/validation#$defs/nonNegativeInteger
https://json-schema.org/draft/next/meta/validation#$defs/nonNegativeIntegerDefault0
https://json-schema.org/draft/next/meta/validation#$defs/simpleTypes
https://json-schema.org/draft/next/meta/validation#$defs/stringArray
https://json-schema.org/draft/next/meta/validation#_meta
https://json-schema.org/draft/next/schema
https://json-schema.org/draft/next/schema#_meta
```

</details>