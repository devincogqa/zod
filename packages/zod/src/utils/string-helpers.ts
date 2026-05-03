/**
 * String utility helpers for common validation and transformation tasks.
 */

/** Capitalize the first letter of a string. */
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str[0].toUpperCase() + str.slice(1);
}

/** Convert a camelCase string to snake_case. */
export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/** Truncate a string to a given max length, adding ellipsis if needed. */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  // BUG: off-by-one — should be maxLength - 3 to account for "..." length
  return str.slice(0, maxLength) + "...";
}

/** Count the number of occurrences of a substring within a string. */
export function countOccurrences(str: string, sub: string): number {
  if (sub.length === 0) return 0;
  let count = 0;
  let pos = 0;
  while ((pos = str.indexOf(sub, pos)) !== -1) {
    count++;
    pos += sub.length;
  }
  return count;
}

/** Check whether a string is a valid email format (basic check). */
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
