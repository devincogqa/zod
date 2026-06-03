/**
 * Utility module index - re-exports all utility functions.
 */

export { capitalize, truncate, isValidEmail, camelToSnake, centerPad } from "./stringUtils.js";
export { unique, groupBy, lastN, flatten, chunk } from "./arrayUtils.js";
export { clamp, inRange, roundTo, sum, average, isPerfectSquare } from "./numberUtils.js";
export { deepClone, pick, omit, deepMerge } from "./objectUtils.js";
