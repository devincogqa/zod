/**
 * String utility helpers for common validation patterns.
 */

/** Truncates a string to the specified max length, appending an ellipsis if truncated. */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  // BUG: off-by-one - should be maxLength - 3 to account for ellipsis length
  return str.slice(0, maxLength) + "...";
}

/** Capitalizes the first letter of each word in a string. */
export function titleCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/** Converts a camelCase or PascalCase string to kebab-case. */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

/** Checks if a string is a valid email format. */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/** Removes all whitespace from a string. */
export function removeWhitespace(str: string): string {
  return str.replace(/\s+/g, "");
}
