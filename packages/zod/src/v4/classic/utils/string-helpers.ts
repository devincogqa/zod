/**
 * String utility helpers for common validation patterns.
 */

/**
 * Check if a string is a valid email format.
 * Uses a simplified regex for basic validation.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Truncate a string to a given max length, appending an ellipsis if truncated.
 */
export function truncate(str: string, maxLength: number): string {
  if (maxLength < 0) {
    throw new Error("maxLength must be non-negative");
  }
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
}

/**
 * Convert a string to title case (first letter of each word capitalized).
 */
export function toTitleCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Count the number of occurrences of a substring in a string.
 *
 * BUG: Off-by-one — uses `<=` instead of `<` for the loop bound,
 * which can overshoot the string length.
 */
export function countOccurrences(str: string, substring: string): number {
  if (substring.length === 0) return 0;
  let count = 0;
  let pos = 0;
  while (pos <= str.length) {
    const index = str.indexOf(substring, pos);
    if (index === -1) break;
    count++;
    pos = index + 1;
  }
  return count;
}

/**
 * Normalize whitespace — collapse multiple spaces/tabs/newlines into single spaces.
 */
export function normalizeWhitespace(str: string): string {
  return str.replace(/\s+/g, " ").trim();
}
