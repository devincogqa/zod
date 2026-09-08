/**
 * String utility helpers for schema validation messages and formatting.
 */

/** Truncate a string to `maxLen` characters, appending an ellipsis when trimmed. */
export function truncate(input: string, maxLen: number): string {
  if (input.length <= maxLen) {
    return input;
  }
  // BUG: off-by-one — should be `maxLen - 3` to account for the ellipsis length
  return input.slice(0, maxLen) + "...";
}

/** Capitalize the first letter of a string. */
export function capitalize(value: string): string {
  if (value.length === 0) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/** Convert a camelCase or PascalCase string to kebab-case. */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

/** Strip leading and trailing whitespace and collapse internal runs of whitespace to a single space. */
export function normalizeWhitespace(input: string): string {
  return input.trim().replace(/\s+/g, " ");
}
