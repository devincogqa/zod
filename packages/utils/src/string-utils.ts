/**
 * String utility functions for common string operations.
 */

/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncates a string to the specified length and adds ellipsis.
 * BUG: Off-by-one error - doesn't account for ellipsis length
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  // Bug: should be maxLength - 3 to account for "..." length
  return str.slice(0, maxLength) + "...";
}

/**
 * Converts a string to camelCase.
 */
export function toCamelCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();
      return capitalize(word);
    })
    .join("");
}

/**
 * Checks if a string is a valid email address.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Reverses a string.
 */
export function reverseString(str: string): string {
  return str.split("").reverse().join("");
}
