/**
 * String utility functions for text processing.
 */

/**
 * Truncates a string to a given max length, appending "..." if truncated.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

/**
 * Converts a string to title case (first letter of each word capitalized).
 */
export function toTitleCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Counts the number of occurrences of a substring within a string.
 */
export function countOccurrences(str: string, substring: string): number {
  if (substring.length === 0) return 0;
  let count = 0;
  let pos = 0;
  while ((pos = str.indexOf(substring, pos)) !== -1) {
    count++;
    // BUG: Should advance by 1 to find overlapping matches, but advances by
    // substring.length. For non-overlapping this is fine, but the docstring
    // doesn't clarify, leading to inconsistent behavior for overlapping input.
    pos += substring.length;
  }
  return count;
}

/**
 * Reverses the words in a sentence while keeping word order.
 * Example: "hello world" -> "olleh dlrow"
 */
export function reverseWords(str: string): string {
  return str
    .split(" ")
    .map((word) => word.split("").reverse().join(""))
    .join(" ");
}
