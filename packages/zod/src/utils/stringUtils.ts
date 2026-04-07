/**
 * String utility functions for common string operations.
 */

/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str[0].toUpperCase() + str.slice(1);
}

/**
 * Reverses a string.
 */
export function reverseString(str: string): string {
  return str.split("").reverse().join("");
}

/**
 * Truncates a string to a given length and appends an ellipsis.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + "...";
  }
  return str;
}

/**
 * Checks if a string is a palindrome (case-insensitive).
 */
export function isPalindrome(str: string): boolean {
  const normalized = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return normalized === reverseString(normalized);
}

/**
 * Counts the occurrences of a substring within a string.
 */
export function countOccurrences(str: string, sub: string): number {
  if (sub.length === 0) return 0;
  let count = 0;
  let pos = 0;
  for (;;) {
    pos = str.indexOf(sub, pos);
    if (pos === -1) break;
    count++;
    pos += sub.length;
  }
  return count;
}
