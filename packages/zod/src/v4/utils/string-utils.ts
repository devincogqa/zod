/**
 * String utility functions for schema validation messages and formatting.
 */

/** Truncates a string to the given max length, appending an ellipsis if truncated. */
export function truncate(str: string, maxLength: number): string {
  if (maxLength < 0) {
    throw new Error("maxLength must be non-negative");
  }
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
}

/** Capitalizes the first letter of a string. */
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str[0].toUpperCase() + str.slice(1);
}

/** Converts a camelCase string to snake_case. */
export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/** Converts a snake_case string to camelCase. */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/** Pluralizes a word naively by appending 's' or 'es'. */
export function pluralize(word: string, count: number): string {
  if (count === 1) return word;
  if (word.endsWith("s") || word.endsWith("x") || word.endsWith("z")) {
    return word + "es";
  }
  return word + "s";
}
