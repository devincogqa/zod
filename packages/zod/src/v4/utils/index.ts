/**
 * Utility module barrel export.
 *
 * Re-exports all helper functions for convenient access.
 */
export { capitalize, truncate, camelToLabel, pluralize, joinWithAnd } from "./string-helpers";
export { unique, groupBy, flatten, chunk, last } from "./array-helpers";
export { toNumber, toBoolean, toDate, toString } from "./type-coercion";
export { deepEqual, shallowEqual } from "./deep-equal";
