/**
 * Utility module barrel export.
 *
 * Re-exports all helper functions for convenient access.
 */
export { capitalize, truncate, camelToLabel, pluralize, joinWithAnd } from "./string-helpers.js";
export { unique, groupBy, flatten, chunk, last } from "./array-helpers.js";
export { toNumber, toBoolean, toDate, toString } from "./type-coercion.js";
export { deepEqual, shallowEqual } from "./deep-equal.js";
