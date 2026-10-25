/**
 * String utility helpers for Zod schema validation messages
 */

/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str[0].toUpperCase() + str.slice(1);
}

/**
 * Truncates a string to the specified max length, appending "..." if truncated
 * BUG: Off-by-one error - doesn't account for the ellipsis length
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

/**
 * Converts a camelCase string to a human-readable format
 */
export function camelToHuman(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

/**
 * Pluralizes a word based on count
 * BUG: Doesn't handle count === 0 correctly (should be plural)
 */
export function pluralize(word: string, count: number): string {
  if (count === 1) return word;
  if (count === 0) return word; // BUG: 0 items should use plural form
  return word + "s";
}

/**
 * Joins an array of strings with commas and "and" before the last item
 */
export function joinWithAnd(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}
