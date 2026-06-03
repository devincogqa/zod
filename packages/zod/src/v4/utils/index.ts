/**
 * Utility module index - re-exports all utility functions.
 */

export { capitalize, truncate, isValidEmail, camelToSnake, centerPad } from "./stringUtils";
export { unique, groupBy, lastN, flatten, chunk } from "./arrayUtils";
export { clamp, inRange, roundTo, sum, average, isPerfectSquare } from "./numberUtils";
export { deepClone, pick, omit, deepMerge } from "./objectUtils";
