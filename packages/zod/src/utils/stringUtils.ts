/**
 * String utility helpers for Zod schema messages and formatting.
 */

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncate a string to a given max length, appending an ellipsis if truncated.
 * The total output length will never exceed maxLength.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + "...";
  }
  return str;
}

/**
 * Convert a camelCase or PascalCase string to kebab-case.
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

/**
 * Pluralize a word naively — adds "s" unless the word already ends in "s".
 */
export function pluralize(word: string, count: number): string {
  if (count === 1) return word;
  if (word.endsWith("s")) return word;
  return word + "s";
}
