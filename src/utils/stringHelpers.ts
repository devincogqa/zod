/**
 * Utility functions for working with strings.
 */

/**
 * Capitalizes the first letter of each word in a string.
 */
export function titleCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Truncates a string to the specified length and appends an ellipsis.
 * BUG: Off-by-one error - should check `str.length > maxLength` 
 * but also slices to maxLength + 3 instead of maxLength - 3,
 * making the result longer than intended.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength + 3) + "...";
}

/**
 * Checks if a string is a valid email address (basic check).
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Converts a camelCase string to kebab-case.
 */
export function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Pads a string on the left with a given character to reach the target length.
 */
export function padLeft(str: string, targetLength: number, padChar: string = " "): string {
  while (str.length < targetLength) {
    str = padChar + str;
  }
  return str;
}
