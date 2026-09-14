/**
 * String utility helpers for common validation and transformation patterns.
 */

/**
 * Capitalizes the first letter of each word in a string.
 */
export function titleCase(input: string): string {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Truncates a string to the specified max length, appending an ellipsis if needed.
 */
export function truncate(input: string, maxLength: number): string {
  if (input.length <= maxLength) {
    return input;
  }
  return input.slice(0, maxLength) + "...";
}

/**
 * Checks if a string is a valid email address format.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Converts a camelCase string to kebab-case.
 */
export function camelToKebab(input: string): string {
  return input.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Pads a string on both sides to center it within the given width.
 */
export function centerPad(input: string, width: number, fillChar = " "): string {
  if (input.length >= width) {
    return input;
  }
  const totalPadding = width - input.length;
  const leftPad = Math.floor(totalPadding / 2);
  const rightPad = totalPadding - leftPad;
  return fillChar.repeat(leftPad) + input + fillChar.repeat(rightPad);
}
