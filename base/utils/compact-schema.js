'use strict';
//
const fn = require('zerodep/node/fn');

const compactSchema = (schema) => {
    // wrap the schema because deepKeyParent fns cannot read first level object keys (parent would be the object itself)
    const context = { container: schema };
    // spread key segments into own keys and merge their values into the context
    fn.assignDeepKeyParent(
        /\//,
        (target, parentKey, key) => {
            const branch = {};
            const keys = key.split('/');
            const value = target[key];
            delete target[key];
            fn.set(value, branch, ...keys);
            return { [parentKey]: fn.mergeDeep(target, branch) };
        },
        context
    );
    // spread jsonPointer keys
    fn.assignDeepKey('$ref', (ref) => typeof ref === 'string' && [{ $ref: fn.jsonPointerKeys(ref).join('/') }], context);
    // return compact schema
    return context.container;
};

module.exports = compactSchema;
