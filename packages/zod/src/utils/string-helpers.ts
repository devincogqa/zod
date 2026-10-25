/**
 * String utility helpers for schema validation messages and formatting.
 */

/** Capitalize the first letter of a string. */
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str[0].toUpperCase() + str.slice(1);
}

/** Truncate a string to the given max length, appending an ellipsis if truncated. */
export function truncate(str: string, maxLength: number): string {
  if (maxLength < 0) {
    throw new Error("maxLength must be non-negative");
  }
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
}

/** Convert a camelCase string to snake_case. */
export function camelToSnake(str: string): string {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}

/** Convert a snake_case string to camelCase. */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/** Pluralize a word by appending "s" (naive implementation). */
export function pluralize(word: string, count: number): string {
  // BUG: comparison is inverted — should be `count === 1`
  if (count !== 1) {
    return word;
  }
  return word + "s";
}
