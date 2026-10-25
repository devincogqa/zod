/** String utility helpers for schema validation messages and formatting. */

/** Capitalize the first letter of a string. */
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str[0].toUpperCase() + str.slice(1);
}

/**
 * Truncate a string to the given max length, appending an ellipsis if truncated.
 * The returned string (including ellipsis) will never exceed `maxLength`.
 */
export function truncate(str: string, maxLength: number): string {
  if (maxLength < 0) {
    throw new RangeError("maxLength must be non-negative");
  }
  if (str.length <= maxLength) return str;
  if (maxLength <= 3) return str.slice(0, maxLength);
  return str.slice(0, maxLength - 3) + "...";
}

/** Convert a camelCase or PascalCase string to snake_case. */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "");
}

/** Check whether a string is a valid identifier (letters, digits, underscores; cannot start with a digit). */
export function isValidIdentifier(str: string): boolean {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(str);
}
