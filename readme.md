## Decentralized JSON-Schema

... an experimental work in progress.

This work starts from the idea that any schema, no matter how complex, can be broken down into smaller schemas in which each keyword is either:
- based on an RFC
- refers to another schema that is based on RFC

This project is recompiling `json-schema` and `json-schema` based schemas in a decentralized format by exploiting the full potential of [IRI](https://en.wikipedia.org/wiki/Internationalized_Resource_Identifier) (internationalized [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier)) as schema `key|identifier|selector` and is mounting decentralized schemas in a common environment which later can be used to:
- generate new schemas
- edit schemas
- manage schemas
- document schemas
- export or serve schemas in various formats

Resulted `decentralized-json-schema` (in short `DJS`) is a normalized version of the previous drafts of `json-schema` in which original intents are mapped to unique internal keywords which are the latest version of the `json-schema` keywords represented by their corresponding intent.

`DJS` can be transposed in 3 views: decentralized (as built), compact, or fully expanded (in the future). Regardless of which way it is transposed, the emergence of multiple `DJS` is done without data loss. The structure of `DJS` makes it universally shareable no matter if contains full schemas or small portion of them. No matter how source schemas were written, `DJS` internally stores the links as absolute `json-pointer`, so third parties can safely share their schemas. Even inside the same project, the idea of decentralizing schemas allows us to place small chunks of schema right where they belong. Multiple `DJS` environments each having own schemas can be merged into a single context, for example in `javascript` this can be like:

```js
Object.assign(global, workspaces, workspace, workdir, data);
```

### How it works

For an easier understanding of what `DJS` is, imagine a map of the universal resources that exist on the web or in the local environment. All resources on the planet can be referenced by `IRI` without risk of collision, and that's exactly what `DJS` is: a database of resources some of which have been linked to others by their authors. Any `DJS` at the beginning is an empty object, it is everyone's choice what to put in it. Can be links to other schemas, or can be local schemas that are completely independent. This is because `DJS` alone does precisely ... nothing! It is a matter of everyone's choice: how to link several `DJS` together (or use just one), how to use `DJS` in their own projects or to share them on the web or a combination of the 2 options.

A `DJS` source can be any valid schema based on `json-schema` drafts starting with `draft-04` to the latest. Sources must be added to a local store using command line, and if added sources contain references to other sources they will be automatically added to the same store. This way, if the original source's `IRI` or its content changes the author will have the option to decide if he want to update the source or to keep the initial source.

Keeping the schema sources in a local store has two important advantages: compilation performance and avoiding to deal with `Content Security Policy` if a compiled schema is used on a website.

The schemas added to a local store are just files sitting on the disk. Also, their corresponding part in the compiled schema is just extra weight. Their role come into play when they are linked or cloned somewhere in a project, an output and an output response handler is set.

The compiled `DJS` will be a `JSON` object having the first level keys considered `IRI` protocols (without `:`) and by joining the subsequent keys to the deepest key by `/` will always result valid `IRI`'s.

**Note:** the `json-schema` files currently present in the `./src` directory are there just as files to work with, to generate some compilation example. They will be removed in the future since `DJS` should start as empty object. Of course, they could be added back later by schema authors.

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
node actions build schema [dirPath (default ./src)]
```

### Add / Remove Schema

```shell
node actions add schema [dirPath (default ./src)]
# or
node actions remove schema $uri
```

### Add / Remove Source

```shell
node actions add source $uri
# or
node actions remove source $uri
```
**Note:** this automatically adds / removes schema

### Output Compact Schema

This command will output the compact view of the compiled `DJS` in the desired file (default`./compact.json`).
```shell
node actions output compact-schema [filePath (default ./compact.json)]
```

### Test

```shell
node actions test load-time [dirPath (default ./src)]
```

### Print

```shell
node actions print schema-references [dirPath (default ./src)]
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
... work in progress

### Usage

```js
const context = require('decentralized-json-schema');
```
... work in progress

### Change Log

See the full list of [changes](changelog.md).

### What's next?

- validator
- watcher
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
Generated schema keys for `json-schema` files will look like this:
</summary>

```shell
http://json-schema.org/draft-04/schema
http://json-schema.org/draft-04/schema/#/definitions/positiveInteger
http://json-schema.org/draft-04/schema/#/definitions/positiveIntegerDefault0
http://json-schema.org/draft-04/schema/#/definitions/schemaArray
http://json-schema.org/draft-04/schema/#/definitions/simpleTypes
http://json-schema.org/draft-04/schema/#/definitions/stringArray
http://json-schema.org/draft-06/schema
http://json-schema.org/draft-06/schema/#/definitions/nonNegativeInteger
http://json-schema.org/draft-06/schema/#/definitions/nonNegativeIntegerDefault0
http://json-schema.org/draft-06/schema/#/definitions/schemaArray
http://json-schema.org/draft-06/schema/#/definitions/simpleTypes
http://json-schema.org/draft-06/schema/#/definitions/stringArray
http://json-schema.org/draft-07/schema
http://json-schema.org/draft-07/schema/#/definitions/nonNegativeInteger
http://json-schema.org/draft-07/schema/#/definitions/nonNegativeIntegerDefault0
http://json-schema.org/draft-07/schema/#/definitions/schemaArray
http://json-schema.org/draft-07/schema/#/definitions/simpleTypes
http://json-schema.org/draft-07/schema/#/definitions/stringArray
https://json-schema.org/draft/2019-09/meta/applicator
https://json-schema.org/draft/2019-09/meta/applicator/#/$defs/schemaArray
https://json-schema.org/draft/2019-09/meta/applicator/#/_
https://json-schema.org/draft/2019-09/meta/content
https://json-schema.org/draft/2019-09/meta/content/#/_
https://json-schema.org/draft/2019-09/meta/core
https://json-schema.org/draft/2019-09/meta/core/#/_
https://json-schema.org/draft/2019-09/meta/format
https://json-schema.org/draft/2019-09/meta/format/#/_
https://json-schema.org/draft/2019-09/meta/meta-data
https://json-schema.org/draft/2019-09/meta/meta-data/#/_
https://json-schema.org/draft/2019-09/meta/validation
https://json-schema.org/draft/2019-09/meta/validation/#/$defs/nonNegativeInteger
https://json-schema.org/draft/2019-09/meta/validation/#/$defs/nonNegativeIntegerDefault0
https://json-schema.org/draft/2019-09/meta/validation/#/$defs/simpleTypes
https://json-schema.org/draft/2019-09/meta/validation/#/$defs/stringArray
https://json-schema.org/draft/2019-09/meta/validation/#/_
https://json-schema.org/draft/2019-09/schema
https://json-schema.org/draft/2019-09/schema/#/_
https://json-schema.org/draft/2020-12/meta/applicator
https://json-schema.org/draft/2020-12/meta/applicator/#/$defs/schemaArray
https://json-schema.org/draft/2020-12/meta/applicator/#/_meta
https://json-schema.org/draft/2020-12/meta/content
https://json-schema.org/draft/2020-12/meta/content/#/_meta
https://json-schema.org/draft/2020-12/meta/core
https://json-schema.org/draft/2020-12/meta/core/#/$defs/anchorString
https://json-schema.org/draft/2020-12/meta/core/#/$defs/uriReferenceString
https://json-schema.org/draft/2020-12/meta/core/#/$defs/uriString
https://json-schema.org/draft/2020-12/meta/core/#/_meta
https://json-schema.org/draft/2020-12/meta/format-annotation
https://json-schema.org/draft/2020-12/meta/format-annotation/#/_meta
https://json-schema.org/draft/2020-12/meta/format-assertion
https://json-schema.org/draft/2020-12/meta/format-assertion/#/_meta
https://json-schema.org/draft/2020-12/meta/meta-data
https://json-schema.org/draft/2020-12/meta/meta-data/#/_meta
https://json-schema.org/draft/2020-12/meta/unevaluated
https://json-schema.org/draft/2020-12/meta/unevaluated/#/_meta
https://json-schema.org/draft/2020-12/meta/validation
https://json-schema.org/draft/2020-12/meta/validation/#/$defs/nonNegativeInteger
https://json-schema.org/draft/2020-12/meta/validation/#/$defs/nonNegativeIntegerDefault0
https://json-schema.org/draft/2020-12/meta/validation/#/$defs/simpleTypes
https://json-schema.org/draft/2020-12/meta/validation/#/$defs/stringArray
https://json-schema.org/draft/2020-12/meta/validation/#/_meta
https://json-schema.org/draft/2020-12/schema
https://json-schema.org/draft/2020-12/schema/#/_meta
https://json-schema.org/draft/next/meta/applicator
https://json-schema.org/draft/next/meta/applicator/#/$defs/nonNegativeInteger
https://json-schema.org/draft/next/meta/applicator/#/$defs/schemaArray
https://json-schema.org/draft/next/meta/applicator/#/_meta
https://json-schema.org/draft/next/meta/content
https://json-schema.org/draft/next/meta/content/#/_meta
https://json-schema.org/draft/next/meta/core
https://json-schema.org/draft/next/meta/core/#/$defs/anchorString
https://json-schema.org/draft/next/meta/core/#/$defs/iriReferenceString
https://json-schema.org/draft/next/meta/core/#/$defs/iriString
https://json-schema.org/draft/next/meta/core/#/_meta
https://json-schema.org/draft/next/meta/format-annotation
https://json-schema.org/draft/next/meta/format-annotation/#/_meta
https://json-schema.org/draft/next/meta/format-assertion
https://json-schema.org/draft/next/meta/format-assertion/#/_meta
https://json-schema.org/draft/next/meta/meta-data
https://json-schema.org/draft/next/meta/meta-data/#/_meta
https://json-schema.org/draft/next/meta/unevaluated
https://json-schema.org/draft/next/meta/unevaluated/#/_meta
https://json-schema.org/draft/next/meta/validation
https://json-schema.org/draft/next/meta/validation/#/$defs/nonNegativeInteger
https://json-schema.org/draft/next/meta/validation/#/$defs/nonNegativeIntegerDefault0
https://json-schema.org/draft/next/meta/validation/#/$defs/simpleTypes
https://json-schema.org/draft/next/meta/validation/#/$defs/stringArray
https://json-schema.org/draft/next/meta/validation/#/_meta
https://json-schema.org/draft/next/output/schema
https://json-schema.org/draft/next/output/schema/#/$defs/flag
https://json-schema.org/draft/next/output/schema/#/$defs/hierarchical
https://json-schema.org/draft/next/output/schema/#/$defs/list
https://json-schema.org/draft/next/output/schema/#/$defs/outputUnit
https://json-schema.org/draft/next/output/schema/#/$defs/outputUnitArray
https://json-schema.org/draft/next/schema
https://json-schema.org/draft/next/schema/#/_meta
```

</details>