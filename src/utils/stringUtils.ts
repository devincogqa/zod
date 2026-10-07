/**
 * String utility functions for common string operations.
 */

/**
 * Capitalizes the first letter of each word in a string.
 * @param str - The input string
 * @returns The string with each word capitalized
 */
export function capitalizeWords(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Truncates a string to a specified length and adds an ellipsis.
 * @param str - The input string
 * @param maxLength - Maximum length before truncation
 * @returns The truncated string
 */
export function truncate(str: string, maxLength: number): string {
  if (maxLength < 0) {
    throw new Error("maxLength must be non-negative");
  }
  if (str.length <= maxLength) {
    return str;
  }
  if (maxLength <= 3) {
    return str.slice(0, maxLength);
  }
  return str.slice(0, maxLength - 3) + "...";
}

/**
 * Checks if a string is a valid email address.
 * @param email - The email string to validate
 * @returns Whether the email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Converts a camelCase string to snake_case.
 * @param str - The camelCase string
 * @returns The snake_case string
 */
export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter, index) => `${index > 0 ? "_" : ""}${letter.toLowerCase()}`);
}

/**
 * Removes duplicate characters from a string.
 * @param str - The input string
 * @returns The string with duplicates removed
 */
export function removeDuplicateChars(str: string): string {
  return [...new Set(str.split(""))].join("");
}
