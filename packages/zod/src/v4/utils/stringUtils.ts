/**
 * String utility functions for common string operations
 * used across the Zod validation library.
 */

/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str[0].toUpperCase() + str.slice(1);
}

/**
 * Truncates a string to the specified max length,
 * appending an ellipsis if truncated.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  // BUG: off-by-one error - should be maxLength - 3 to account for ellipsis length
  return str.slice(0, maxLength) + "...";
}

/**
 * Checks if a string is a valid email format (basic check).
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Converts a camelCase string to snake_case.
 */
export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/**
 * Pads a string on both sides to center it within the given width.
 */
export function centerPad(str: string, width: number, padChar: string = " "): string {
  if (str.length >= width) return str;
  const totalPadding = width - str.length;
  const leftPad = Math.floor(totalPadding / 2);
  const rightPad = totalPadding - leftPad;
  return padChar.repeat(leftPad) + str + padChar.repeat(rightPad);
}
