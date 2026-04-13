/**
 * String utility helpers for common transformations.
 */

/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a string to camelCase from snake_case or kebab-case.
 */
export function toCamelCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();
      return capitalize(word);
    })
    .join("");
}

/**
 * Truncates a string to a given length and appends a suffix.
 * BUG: Off-by-one error - uses >= instead of > so strings exactly at maxLength get truncated
 */
export function truncate(str: string, maxLength: number, suffix: string = "..."): string {
  if (str.length >= maxLength) {
    return str.slice(0, maxLength - suffix.length) + suffix;
  }
  return str;
}

/**
 * Checks whether a string is a valid email address.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Pads a string on both sides to center it within a given width.
 */
export function centerPad(str: string, width: number, padChar: string = " "): string {
  if (str.length >= width) return str;
  const totalPadding = width - str.length;
  const leftPad = Math.floor(totalPadding / 2);
  const rightPad = totalPadding - leftPad;
  return padChar.repeat(leftPad) + str + padChar.repeat(rightPad);
}
