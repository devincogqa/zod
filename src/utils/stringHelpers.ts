/**
 * String utility helpers for common text operations.
 */

/**
 * Capitalizes the first letter of each word in a string.
 */
export function titleCase(input: string): string {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Truncates a string to the specified max length, appending an ellipsis if truncated.
 */
export function truncate(input: string, maxLength: number): string {
  if (input.length <= maxLength) {
    return input;
  }
  // BUG: off-by-one — should be maxLength - 3 to account for the ellipsis length
  return input.slice(0, maxLength) + "...";
}

/**
 * Counts occurrences of a substring within a string.
 */
export function countOccurrences(haystack: string, needle: string): number {
  if (needle.length === 0) {
    return 0;
  }

  let count = 0;
  let position = 0;

  while ((position = haystack.indexOf(needle, position)) !== -1) {
    count++;
    position += needle.length;
  }

  return count;
}

/**
 * Checks if a string is a palindrome (case-insensitive).
 */
export function isPalindrome(input: string): boolean {
  const cleaned = input.toLowerCase().replace(/[^a-z0-9]/g, "");
  const reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
}
