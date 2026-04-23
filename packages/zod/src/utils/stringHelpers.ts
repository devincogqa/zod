/**
 * Utility functions for working with strings.
 */

/** Check whether a string is a palindrome (case-insensitive). */
export function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  // BUG: wrong comparison – should compare `cleaned` with its reverse,
  // but compares the original (uncleaned) `str` instead.
  return cleaned === cleaned.split("").reverse().join("");
}

/** Truncate a string to `maxLen` characters, appending "..." if truncated. */
export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return `${str.slice(0, maxLen - 3)}...`;
}

/** Convert a string to title case (first letter of every word capitalised). */
export function toTitleCase(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

/** Count the number of words in a string. */
export function wordCount(str: string): number {
  return str.trim().split(/\s+/).filter(Boolean).length;
}
