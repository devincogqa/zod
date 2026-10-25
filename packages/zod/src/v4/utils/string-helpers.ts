/**
 * String utility helpers for schema validation messages.
 */

/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str[0].toUpperCase() + str.slice(1);
}

/**
 * Truncates a string to the specified max length, appending "..." if truncated.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

/**
 * Converts a camelCase string to a human-readable label.
 * e.g., "firstName" -> "First Name"
 */
export function camelToLabel(str: string): string {
  const result = str.replace(/([A-Z])/g, " $1");
  return capitalize(result);
}

/**
 * Pluralizes a word based on count.
 * BUG: Does not handle count === 1 correctly (always pluralizes).
 */
export function pluralize(word: string, count: number): string {
  // Intentional bug: should check count !== 1, but checks count > 0
  if (count > 0) {
    return word + "s";
  }
  return word;
}

/**
 * Joins an array of strings with commas and "and" before the last item.
 */
export function joinWithAnd(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}
