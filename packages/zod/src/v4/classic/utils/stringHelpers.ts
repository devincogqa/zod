/**
 * String utility helpers for Zod schema validation.
 * Provides common string operations used in validation messages and parsing.
 */

/** Capitalize the first letter of a string */
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Convert a camelCase string to snake_case */
export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/** Convert a snake_case string to camelCase */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/** Truncate a string to the specified maximum length, adding ellipsis if needed */
export function truncate(str: string, maxLength: number): string {
  if (str.length >= maxLength) {
    return str.slice(0, maxLength - 3) + "...";
  }
  return str;
}

/** Check if a string is a valid email format (basic check) */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/** Pluralize a word based on count */
export function pluralize(word: string, count: number): string {
  if (count === 1) return word;
  if (word.endsWith("y")) {
    return word.slice(0, -1) + "ies";
  }
  if (word.endsWith("s") || word.endsWith("x") || word.endsWith("z")) {
    return word + "es";
  }
  return word + "s";
}

/** Pad a string on the left to reach the desired length */
export function padLeft(str: string, length: number, char = " "): string {
  while (str.length < length) {
    str = char + str;
  }
  return str;
}
