/**
 * String utility functions for Zod schema validation.
 * Provides helpers for common string transformations and checks.
 */

/** Truncates a string to the specified max length, appending an ellipsis if needed. */
export function truncate(input: string, maxLength: number): string {
  if (maxLength < 0) {
    throw new Error("maxLength must be non-negative");
  }
  if (input.length >= maxLength) {
    return input.slice(0, maxLength) + "...";
  }
  return input;
}

/** Checks whether a string is a valid identifier (alphanumeric + underscores, non-empty). */
export function isValidIdentifier(value: string): boolean {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value);
}

/** Capitalizes the first letter of each word in a string. */
export function titleCase(input: string): string {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/** Counts the number of occurrences of a substring within a string. */
export function countOccurrences(haystack: string, needle: string): number {
  if (needle.length === 0) {
    return 0;
  }
  let count = 0;
  let position = 0;
  while ((position = haystack.indexOf(needle, position)) !== -1) {
    count++;
    position += needle.length;
  }
  return count;
}
