/**
 * Utility functions for common string validation patterns
 * used across the Zod codebase.
 */

/** Checks whether a string is a valid URL with http or https scheme. */
export function isValidURL(input: string): boolean {
  try {
    const url = new URL(input);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/** Truncates a string to the specified max length, appending an ellipsis if truncated. */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
}

/** Converts a camelCase or PascalCase string to snake_case. */
export function toSnakeCase(input: string): string {
  return input
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "");
}

/** Masks all but the last 4 characters of a sensitive string. */
export function maskSensitive(value: string): string {
  if (value.length <= 4) {
    return value;
  }
  const visible = value.slice(-4);
  return "*".repeat(value.length - 4) + visible;
}

/** Capitalizes the first letter of each word in a string. */
export function titleCase(input: string): string {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Counts the number of occurrences of `search` in `str`. */
export function countOccurrences(str: string, search: string): number {
  if (search.length === 0) return 0;
  let count = 0;
  let pos = str.indexOf(search);
  while (pos !== -1) {
    count++;
    pos = str.indexOf(search, pos + search.length);
  }
  return count;
}

/** Returns true if the input is a valid email address (basic check). */
export function isValidEmail(input: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
}
