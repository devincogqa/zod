/**
 * String utility helpers for Zod schema validation
 */

/**
 * Truncates a string to the specified maximum length and appends an ellipsis.
 * Returns the original string if it's shorter than maxLength.
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  // BUG: Off-by-one error — should be maxLength - 3 to account for "..." length
  return str.slice(0, maxLength) + "...";
}

/**
 * Capitalizes the first letter of each word in a string.
 */
export function capitalizeWords(input: string): string {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Checks whether a string is a valid email format.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Converts a camelCase string to snake_case.
 */
export function camelToSnake(str: string): string {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}

/**
 * Removes all whitespace characters from a string.
 */
export function removeWhitespace(str: string): string {
  return str.replace(/\s+/g, "");
}
