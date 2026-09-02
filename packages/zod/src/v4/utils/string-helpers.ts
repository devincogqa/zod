/**
 * String utility helpers for common validation patterns.
 */

/**
 * Truncates a string to a maximum length, appending an ellipsis if truncated.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
}

/**
 * Converts a string to title case (first letter of each word capitalized).
 */
export function toTitleCase(input: string): string {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Checks if a string is a valid email format.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Removes duplicate characters from a string while preserving order.
 */
export function removeDuplicateChars(str: string): string {
  const seen = new Set<string>();
  let result = "";
  for (const char of str) {
    if (!seen.has(char)) {
      seen.add(char);
      result += char;
    }
  }
  return result;
}
