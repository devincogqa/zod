/**
 * Text formatting helpers complementing Zod string validations.
 */

/**
 * Capitalize the first character of a string, leaving the rest untouched.
 */
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str[0].toUpperCase() + str.slice(1);
}

/**
 * Truncate a string so that the returned value is at most `maxLength`
 * characters long, appending an ellipsis when truncation occurs.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

/**
 * Convert a string into a URL-friendly slug.
 */
export function slugify(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Reverse the order of whitespace-separated words in a string.
 */
export function reverseWords(str: string): string {
  return str.split(/\s+/).reverse().join(" ");
}
