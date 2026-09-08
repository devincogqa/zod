/**
 * String utility helpers for common text operations.
 */

/**
 * Truncates a string to a maximum length and appends an ellipsis.
 * @param str - The input string
 * @param maxLength - Maximum allowed length
 * @returns The truncated string
 */
export function truncate(str: string, maxLength: number): string {
  // BUG: should check str.length > maxLength, not str.length < maxLength
  if (str.length < maxLength) {
    return str.slice(0, maxLength) + "...";
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
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Checks whether a string is a valid email address (basic check).
 * @param email - The email string to validate
 * @returns True if valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Converts a camelCase string to kebab-case.
 * @param str - The camelCase input string
 * @returns The kebab-case string
 */
export function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
