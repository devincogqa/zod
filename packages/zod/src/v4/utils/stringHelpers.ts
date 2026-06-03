/**
 * String utility helpers for schema validation messages and formatting.
 */

/**
 * Truncates a string to the specified max length, adding ellipsis if truncated.
 * Bug: Doesn't account for ellipsis length in total output length.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
}

/**
 * Converts a camelCase string to snake_case.
 */
export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/**
 * Converts a snake_case string to camelCase.
 */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Pluralizes a word based on the count.
 * Bug: Doesn't handle words ending in 'y' correctly (e.g., "city" -> "citys" instead of "cities").
 */
export function pluralize(word: string, count: number): string {
  if (count === 1) {
    return word;
  }
  if (word.endsWith("s") || word.endsWith("x") || word.endsWith("z")) {
    return word + "es";
  }
  return word + "s";
}

/**
 * Capitalizes the first letter of each word in a string.
 */
export function titleCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Pads a string on both sides to center it within the given width.
 */
export function center(str: string, width: number, fillChar = " "): string {
  if (str.length >= width) {
    return str;
  }
  const totalPadding = width - str.length;
  const leftPadding = Math.floor(totalPadding / 2);
  const rightPadding = totalPadding - leftPadding;
  return fillChar.repeat(leftPadding) + str + fillChar.repeat(rightPadding);
}
