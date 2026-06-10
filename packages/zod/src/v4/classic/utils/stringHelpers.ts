/**
 * String utility helpers for validation message formatting.
 */

/** Capitalize the first character of a string. */
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Truncate a string to the given max length, appending "..." if truncated. */
export function truncate(str: string, maxLength: number): string {
  if (maxLength < 0) {
    throw new RangeError("maxLength must be non-negative");
  }
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
}

/** Convert a camelCase string to kebab-case. */
export function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

/** Convert a kebab-case string to camelCase. */
export function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

/** Check if a string is a valid email format (basic check). */
export function isEmail(str: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

/** Pad a string on the left with the given character to reach target length. */
export function padLeft(str: string, targetLength: number, padChar: string = " "): string {
  while (str.length < targetLength) {
    str = padChar + str;
  }
  return str;
}
