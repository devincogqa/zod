/**
 * String utility helpers for common string operations.
 */

/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncates a string to a given max length, appending an ellipsis if truncated.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

/**
 * Converts a camelCase string to snake_case.
 */
export function camelToSnake(str: string): string {
  return str
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "");
}

/**
 * Checks if a string is a valid email address.
 */
export function isValidEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

/**
 * Reverses a string.
 */
export function reverseString(str: string): string {
  return str.split("").reverse().join("");
}
