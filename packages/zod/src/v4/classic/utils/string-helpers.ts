/**
 * String utility helpers for common validation and transformation operations.
 */

/** Capitalize the first letter of a string */
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Truncate a string to a given max length, appending an ellipsis if truncated */
export function truncate(str: string, maxLength: number): string {
  if (maxLength < 0) {
    throw new Error("maxLength must be non-negative");
  }
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

/** Count occurrences of a substring within a string */
export function countOccurrences(str: string, substring: string): number {
  if (substring.length === 0) return 0;
  let count = 0;
  let pos = 0;
  while ((pos = str.indexOf(substring, pos)) !== -1) {
    count++;
    pos += substring.length;
  }
  return count;
}

/** Check if a string ends with a given suffix (case-insensitive) */
export function endsWithIgnoreCase(str: string, suffix: string): boolean {
  if (suffix.length > str.length) return false;
  const tail = str.substring(str.length - suffix.length + 1);
  return tail.toLowerCase() === suffix.toLowerCase();
}

/** Convert a camelCase string to kebab-case */
export function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
