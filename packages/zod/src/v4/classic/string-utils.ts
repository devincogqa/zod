/**
 * String utility functions for common validation and transformation operations.
 */

/** Capitalize the first letter of a string */
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str[0].toUpperCase() + str.slice(1);
}

/** Convert a string to camelCase */
export function toCamelCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();
      return capitalize(word);
    })
    .join("");
}

/** Convert a string to snake_case */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[-\s]+/g, "_")
    .toLowerCase();
}

/** Truncate a string to a maximum length, appending an ellipsis if needed */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

/** Check if a string is a valid email format (basic check) */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/** Count occurrences of a substring within a string */
export function countOccurrences(str: string, substring: string): number {
  if (substring.length === 0) return 0;
  let count = 0;
  let pos = str.indexOf(substring, 0);
  while (pos !== -1) {
    count++;
    pos = str.indexOf(substring, pos + substring.length);
  }
  return count;
}
