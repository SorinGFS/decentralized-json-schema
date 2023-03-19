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
node actions add schema $dirPath # (starting with ./src)
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

- 

<details>
<summary>
Detected keyword definitions across versions from draft-00 to draft/next:
</summary>

```shell
= = = = = = = 1 1 = absoluteKeywordLocation
= = = 1 1 1 1 1 = = additionalItems
1 1 1 1 1 1 1 1 1 1 additionalProperties
= = = = 1 1 1 1 1 1 allOf
1 1 1 = = = = = = = alternate
= = = = = = 1 1 1 = anchor
= = = = = = 1 1 1 = anchorPointer
= = = = = = = 1 1 1 annotations
= = = = 1 1 1 1 1 1 anyOf
= = = = = = 1 1 = = attachmentPointer
= = = = = 1 1 1 1 = base
= = = = 1 1 = = = = binaryEncoding
= = = = = 1 1 1 1 1 const
= = = = = 1 1 1 1 1 contains
1 1 1 1 = = 1 1 1 1 contentEncoding
= = = = = = 1 1 1 1 contentMediaType
= = = = = = = 1 1 1 contentSchema
= = = = = = 1 1 = = contextPointer
= = = = = = 1 1 = = contextUri
1 1 1 1 1 1 1 1 1 1 default
= = = 1 1 1 1 1 1 1 dependencies
= = = = = = = 1 1 1 dependentRequired
= = = = = = = 1 1 1 dependentSchemas
= = = = = = = 1 1 1 deprecated
1 1 1 1 1 1 1 1 1 1 description
1 1 1 1 = = = = = = disallow
= = 1 1 = = = = = = divisibleBy
= = = = = = = = = 1 droppedAnnotations
= = = = = = 1 1 1 1 else
= = = = 1 = = = = = encType
1 1 1 1 = = = = = = enctype
1 1 1 1 1 1 1 1 1 1 enum
= = = = = = = = 1 = error
= = = = = = = 1 1 1 errors
= = = = = = = = = 1 evaluationPath
= = = = = 1 1 1 1 1 examples
= = = 1 1 1 1 1 1 1 exclusiveMaximum
= = = 1 1 1 1 1 1 1 exclusiveMinimum
1 1 1 1 = = = = = = extends
1 1 1 1 1 1 1 1 1 1 format
1 1 1 1 1 = = = = = fragmentResolution
= = = = = = 1 1 1 = headerSchema
1 1 1 1 1 1 1 1 1 = href
= = = = = = 1 1 = = hrefInputTemplates
= = = = = = 1 1 = = hrefPrepopulatedInput
= = = = = 1 1 1 1 = hrefSchema
= = = = = = 1 1 1 1 if
= = = = = = = 1 1 1 instanceLocation
1 1 1 1 1 1 1 1 1 1 items
= = = = = = = 1 1 = keywordLocation
1 1 1 1 1 1 1 1 1 = links
= = = = = = = 1 1 1 maxContains
1 1 = = = = = = = = maxDecimal
1 1 1 1 1 1 1 1 1 1 maxItems
1 1 1 1 1 1 1 1 1 1 maxLength
= = = = 1 1 1 1 1 1 maxProperties
1 1 1 1 1 1 1 1 1 1 maximum
1 1 1 = = = = = = = maximumCanEqual
= = = = 1 1 = = = = media
1 1 1 1 1 1 = = = = mediaType
1 1 1 1 1 = = = = = method
= = = = = = = 1 1 1 minContains
1 1 1 1 1 1 1 1 1 1 minItems
1 1 1 1 1 1 1 1 1 1 minLength
= = = = 1 1 1 1 1 1 minProperties
1 1 1 1 1 1 1 1 1 1 minimum
1 1 1 = = = = = = = minimumCanEqual
= = = = 1 1 1 1 1 1 multipleOf
= = = = = = = = = 1 nested
= = = = 1 1 1 1 1 1 not
= = = = 1 1 1 1 1 1 oneOf
1 1 1 = = = = = = = optional
1 1 1 1 1 = = = = = pathStart
1 1 1 1 1 1 1 1 1 1 pattern
= = = 1 1 1 1 1 1 1 patternProperties
= = = = = = = = 1 1 prefixItems
1 1 1 1 1 1 1 1 1 1 properties
= = = = = = = = = 1 propertyDependencies
= = = = = 1 1 1 1 1 propertyNames
= = = = = 1 1 1 1 1 readOnly
1 1 1 1 = = = = = = readonly
1 1 1 1 1 1 1 1 1 1 ref
1 1 1 1 1 1 1 1 1 = rel
= = = 1 1 1 1 1 1 1 required
1 1 1 1 = = = = = = requires
1 1 1 1 = = = = = = root
= = = = 1 = = = = = schema
= = = = = = = = = 1 schemaLocation
= = = = = 1 = = = = submissionEncType
= = = = = = 1 1 1 = submissionMediaType
= = = = = 1 1 1 1 = submissionSchema
= = = = = = 1 1 1 = targetHints
= = = = = = 1 1 1 = targetMediaType
= = 1 1 1 1 1 1 1 = targetSchema
= = = = = = 1 1 = = targetUri
= = = = = = 1 1 1 = templatePointers
= = = = = = 1 1 1 = templateRequired
= = = = = = 1 1 1 1 then
1 1 1 1 1 1 1 1 1 1 title
1 1 1 1 1 1 1 1 1 1 type
= = = = = = = 1 1 1 unevaluatedItems
= = = = = = = 1 1 1 unevaluatedProperties
= = 1 1 1 1 1 1 1 1 uniqueItems
= = = = = = = 1 1 1 valid
= = = = = = 1 1 1 1 writeOnly
============================================
all keywords count: 105

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
http://json-schema.org/draft-00/hyper-schema#
http://json-schema.org/draft-00/links#
http://json-schema.org/draft-00/schema#
http://json-schema.org/draft-01/hyper-schema#
http://json-schema.org/draft-01/links#
http://json-schema.org/draft-01/schema#
http://json-schema.org/draft-02/hyper-schema#
http://json-schema.org/draft-02/links#
http://json-schema.org/draft-02/schema#
http://json-schema.org/draft-03/hyper-schema#
http://json-schema.org/draft-03/links#
http://json-schema.org/draft-03/schema#
http://json-schema.org/draft-04/hyper-schema#
http://json-schema.org/draft-04/hyper-schema#/definitions/linkDescription
http://json-schema.org/draft-04/hyper-schema#/definitions/schemaArray
http://json-schema.org/draft-04/schema#
http://json-schema.org/draft-04/schema#/definitions/positiveInteger
http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0
http://json-schema.org/draft-04/schema#/definitions/schemaArray
http://json-schema.org/draft-04/schema#/definitions/simpleTypes
http://json-schema.org/draft-04/schema#/definitions/stringArray
http://json-schema.org/draft-06/hyper-schema#
http://json-schema.org/draft-06/hyper-schema#/definitions/linkDescription
http://json-schema.org/draft-06/hyper-schema#/definitions/schemaArray
http://json-schema.org/draft-06/schema#
http://json-schema.org/draft-06/schema#/definitions/nonNegativeInteger
http://json-schema.org/draft-06/schema#/definitions/nonNegativeIntegerDefault0
http://json-schema.org/draft-06/schema#/definitions/schemaArray
http://json-schema.org/draft-06/schema#/definitions/simpleTypes
http://json-schema.org/draft-06/schema#/definitions/stringArray
http://json-schema.org/draft-07/hyper-schema#
http://json-schema.org/draft-07/hyper-schema#/definitions/schemaArray
http://json-schema.org/draft-07/links#
http://json-schema.org/draft-07/links#/definitions/noRequiredFields
http://json-schema.org/draft-07/schema#
http://json-schema.org/draft-07/schema#/definitions/nonNegativeInteger
http://json-schema.org/draft-07/schema#/definitions/nonNegativeIntegerDefault0
http://json-schema.org/draft-07/schema#/definitions/schemaArray
http://json-schema.org/draft-07/schema#/definitions/simpleTypes
http://json-schema.org/draft-07/schema#/definitions/stringArray
https://json-schema.org/draft/2019-09/hyper-schema
https://json-schema.org/draft/2019-09/links
https://json-schema.org/draft/2019-09/links#/$defs/noRequiredFields
https://json-schema.org/draft/2019-09/meta/applicator
https://json-schema.org/draft/2019-09/meta/applicator#/$defs/schemaArray
https://json-schema.org/draft/2019-09/meta/content
https://json-schema.org/draft/2019-09/meta/core
https://json-schema.org/draft/2019-09/meta/format
https://json-schema.org/draft/2019-09/meta/hyper-schema
https://json-schema.org/draft/2019-09/meta/meta-data
https://json-schema.org/draft/2019-09/meta/validation
https://json-schema.org/draft/2019-09/meta/validation#/$defs/nonNegativeInteger
https://json-schema.org/draft/2019-09/meta/validation#/$defs/nonNegativeIntegerDefault0
https://json-schema.org/draft/2019-09/meta/validation#/$defs/simpleTypes
https://json-schema.org/draft/2019-09/meta/validation#/$defs/stringArray
https://json-schema.org/draft/2019-09/output/schema#/$defs/basic
https://json-schema.org/draft/2019-09/output/schema#/$defs/detailed
https://json-schema.org/draft/2019-09/output/schema#/$defs/flag
https://json-schema.org/draft/2019-09/output/schema#/$defs/outputUnit
https://json-schema.org/draft/2019-09/output/schema#/$defs/outputUnitArray
https://json-schema.org/draft/2019-09/output/schema#/$defs/verbose
https://json-schema.org/draft/2019-09/schema
https://json-schema.org/draft/2020-12/hyper-schema
https://json-schema.org/draft/2020-12/links
https://json-schema.org/draft/2020-12/meta/applicator
https://json-schema.org/draft/2020-12/meta/applicator#/$defs/schemaArray
https://json-schema.org/draft/2020-12/meta/content
https://json-schema.org/draft/2020-12/meta/core
https://json-schema.org/draft/2020-12/meta/core#/$defs/uriReferenceString
https://json-schema.org/draft/2020-12/meta/format-annotation
https://json-schema.org/draft/2020-12/meta/hyper-schema
https://json-schema.org/draft/2020-12/meta/meta-data
https://json-schema.org/draft/2020-12/meta/unevaluated
https://json-schema.org/draft/2020-12/meta/validation
https://json-schema.org/draft/2020-12/meta/validation#/$defs/nonNegativeInteger
https://json-schema.org/draft/2020-12/meta/validation#/$defs/nonNegativeIntegerDefault0
https://json-schema.org/draft/2020-12/meta/validation#/$defs/simpleTypes
https://json-schema.org/draft/2020-12/meta/validation#/$defs/stringArray
https://json-schema.org/draft/2020-12/output/schema#/$defs/basic
https://json-schema.org/draft/2020-12/output/schema#/$defs/detailed
https://json-schema.org/draft/2020-12/output/schema#/$defs/flag
https://json-schema.org/draft/2020-12/output/schema#/$defs/outputUnit
https://json-schema.org/draft/2020-12/output/schema#/$defs/outputUnitArray
https://json-schema.org/draft/2020-12/output/schema#/$defs/verbose
https://json-schema.org/draft/2020-12/schema
https://json-schema.org/draft/next/meta/applicator
https://json-schema.org/draft/next/meta/applicator#/$defs/nonNegativeInteger
https://json-schema.org/draft/next/meta/applicator#/$defs/schemaArray
https://json-schema.org/draft/next/meta/content
https://json-schema.org/draft/next/meta/core
https://json-schema.org/draft/next/meta/core#/$defs/iriReferenceString
https://json-schema.org/draft/next/meta/format-annotation
https://json-schema.org/draft/next/meta/meta-data
https://json-schema.org/draft/next/meta/unevaluated
https://json-schema.org/draft/next/meta/validation
https://json-schema.org/draft/next/meta/validation#/$defs/nonNegativeInteger
https://json-schema.org/draft/next/meta/validation#/$defs/nonNegativeIntegerDefault0
https://json-schema.org/draft/next/meta/validation#/$defs/simpleTypes
https://json-schema.org/draft/next/meta/validation#/$defs/stringArray
https://json-schema.org/draft/next/output/schema#/$defs/flag
https://json-schema.org/draft/next/output/schema#/$defs/hierarchical
https://json-schema.org/draft/next/output/schema#/$defs/list
https://json-schema.org/draft/next/output/schema#/$defs/outputUnit
https://json-schema.org/draft/next/output/schema#/$defs/outputUnitArray
https://json-schema.org/draft/next/schema
schema:/meta/applicator
schema:/meta/applicator#/$defs/nonNegativeInteger
schema:/meta/applicator#/$defs/schemaArray
schema:/meta/content
schema:/meta/core
schema:/meta/core#/$defs/iriReferenceString
schema:/meta/format-annotation
schema:/meta/meta-data
schema:/meta/unevaluated
schema:/meta/validation
schema:/meta/validation#/$defs/nonNegativeInteger
schema:/meta/validation#/$defs/nonNegativeIntegerDefault0
schema:/meta/validation#/$defs/simpleTypes
schema:/meta/validation#/$defs/stringArray
schema:/output/schema#/$defs/flag
schema:/output/schema#/$defs/hierarchical
schema:/output/schema#/$defs/list
schema:/output/schema#/$defs/outputUnit
schema:/output/schema#/$defs/outputUnitArray
schema:/schema
```

</details>