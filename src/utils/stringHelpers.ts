/**
 * String manipulation utilities.
 */

/** Convert a string to camelCase. */
export function toCamelCase(str: string): string {
  return str.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : "")).replace(/^[A-Z]/, (c) => c.toLowerCase());
}

/** Truncate a string to a given length, adding an ellipsis if needed. */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

/** Check if a string is a valid email (basic check). */
export function isValidEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

/** Capitalize the first letter of each word. */
export function titleCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/** Reverse a string. */
export function reverseString(str: string): string {
  return str.split("").reverse().join("");
}
