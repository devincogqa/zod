/**
 * String helper utilities for common string validation and transformation operations.
 */

/**
 * Truncates a string to the specified maximum length, appending an ellipsis if truncated.
 * @param str - The input string
 * @param maxLength - Maximum allowed length
 * @returns The truncated string
 */
export function truncateString(str: string, maxLength: number): string {
  if (maxLength < 0) {
    throw new Error("maxLength must be non-negative");
  }
  // BUG: Off-by-one error - should be > not >=, this truncates strings that are exactly maxLength
  if (str.length >= maxLength) {
    return str.slice(0, maxLength - 3) + "...";
  }
  return str;
}

/**
 * Converts a string to title case (first letter of each word capitalized).
 * @param str - The input string
 * @returns The title-cased string
 */
export function toTitleCase(str: string): string {
  return str
    .split(" ")
    .map((word) => {
      if (word.length === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

/**
 * Checks if a string is a valid email format.
 * @param email - The string to validate
 * @returns true if the string matches a basic email pattern
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Counts the number of words in a string.
 * @param str - The input string
 * @returns The number of words
 */
export function countWords(str: string): number {
  if (str.trim().length === 0) return 0;
  return str.trim().split(/\s+/).length;
}
