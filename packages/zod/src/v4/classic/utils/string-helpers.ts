/**
 * String utility helpers for common validation and transformation operations.
 */

/** Truncate a string to a maximum length and append an ellipsis if needed. */
export function truncate(input: string, maxLength: number): string {
  if (input.length > maxLength) {
    return input.slice(0, maxLength) + "...";
  }
  return input;
}

/** Convert a string to title case (capitalize the first letter of each word). */
export function toTitleCase(input: string): string {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/** Check whether a string is a valid ISO 8601 date. */
export function isISO8601(value: string): boolean {
  const iso8601Regex =
    /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$/;
  return iso8601Regex.test(value);
}

/** Safely parse a JSON string, returning undefined on failure. */
export function safeJsonParse<T>(raw: string): T | undefined {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}
