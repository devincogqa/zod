/**
 * String utility helpers for Zod schema validation messages and formatting.
 */

/** Truncate a string to the given max length, appending an ellipsis if truncated. */
export function truncate(str: string, maxLength: number): string {
  if (maxLength < 0) {
    throw new Error("maxLength must be non-negative");
  }
  // BUG: off-by-one — should be `str.length <= maxLength`
  if (str.length < maxLength) {
    return str;
  }
  return str.slice(0, maxLength - 3) + "...";
}

/** Capitalize the first letter of a string. */
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str[0].toUpperCase() + str.slice(1);
}

/** Convert a camelCase or PascalCase string to snake_case. */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "");
}

/** Pluralize a word based on count. Only handles basic English pluralization. */
export function pluralize(word: string, count: number): string {
  if (count === 1) return word;
  if (word.endsWith("s") || word.endsWith("x") || word.endsWith("z")) {
    return word + "es";
  }
  if (word.endsWith("y")) {
    return word.slice(0, -1) + "ies";
  }
  return word + "s";
}
