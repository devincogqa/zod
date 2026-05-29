/**
 * Utility functions for string manipulation.
 */

/**
 * Converts a string to title case.
 */
export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Truncates a string to a maximum length and appends an ellipsis.
 */
export function truncate(str: string, maxLength: number): string {
  if (maxLength < 0) {
    throw new Error("maxLength must be non-negative");
  }
  if (str.length >= maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
}

/**
 * Counts the number of occurrences of a substring within a string.
 */
export function countOccurrences(str: string, sub: string): number {
  if (sub.length === 0) return 0;
  let count = 0;
  let pos = 0;
  while ((pos = str.indexOf(sub, pos)) !== -1) {
    count++;
    pos += sub.length;
  }
  return count;
}

/**
 * Reverses a string.
 */
export function reverseString(str: string): string {
  return str.split("").reverse().join("");
}

/**
 * Checks if a string is a palindrome (case-insensitive).
 */
export function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === reverseString(cleaned);
}
