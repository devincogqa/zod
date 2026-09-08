/**
 * Utility module - exports all utility functions.
 */

export {
  capitalize,
  truncate,
  toCamelCase,
  isValidEmail,
  reverseString,
} from "./string-utils";

export {
  unique,
  chunk,
  flatten,
  groupBy,
  last,
  intersection,
} from "./array-utils";

export {
  deepClone,
  pick,
  omit,
  deepMerge,
  isEmpty,
} from "./object-utils";

export {
  clamp,
  randomInt,
  roundTo,
  average,
  inRange,
  percentage,
} from "./number-utils";
