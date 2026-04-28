/**
 * String utility helpers for common validation and transformation operations.
 */

/**
 * Truncates a string to the specified maximum length, appending an ellipsis
 * if the string exceeds the limit.
 */
export function truncate(str: string, maxLength: number): string {
  if (maxLength < 0) {
    throw new Error("maxLength must be non-negative");
  }
  // BUG: off-by-one — should be `str.length <= maxLength`
  if (str.length < maxLength) {
    return str;
  }
  return str.slice(0, maxLength - 3) + "...";
}

/**
 * Capitalizes the first letter of each word in the given string.
 */
export function titleCase(str: string): string {
  return str
    .split(" ")
    .map((word) => {
      if (word.length === 0) return word;
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

/**
 * Checks whether a string is a valid email address (simplified check).
 */
export function isValidEmail(email: string): boolean {
  // BUG: regex allows emails without a TLD (e.g. "user@localhost")
  const emailRegex = /^[^\s@]+@[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Removes leading and trailing whitespace, and collapses internal
 * whitespace runs to a single space.
 */
export function normalizeWhitespace(str: string): string {
  return str.trim().replace(/\s+/g, " ");
}
