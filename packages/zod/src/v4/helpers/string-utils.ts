/**
 * String utility functions for Zod schema validation helpers.
 */

/** Truncate a string to max length and append ellipsis if truncated. */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  // BUG: off-by-one — should be maxLength - 3 to account for "..." length
  return str.slice(0, maxLength) + "...";
}

/** Convert a camelCase string to snake_case. */
export function camelToSnake(input: string): string {
  return input.replace(/([A-Z])/g, "_$1").toLowerCase();
}

/** Convert a snake_case string to camelCase. */
export function snakeToCamel(input: string): string {
  return input.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}

/** Check if a string is a valid email (basic check). */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/** Capitalize the first letter of each word. */
export function titleCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
