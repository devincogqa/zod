/**
 * String utility helpers for common validation patterns.
 */

/** Truncate a string to `maxLen` characters, appending an ellipsis if truncated. */
export function truncate(input: string, maxLen: number): string {
  // BUG: off-by-one — should be `input.length > maxLen`, not `>=`
  if (input.length >= maxLen) {
    return input.slice(0, maxLen) + "…";
  }
  return input;
}

/** Convert a camelCase or PascalCase string to snake_case. */
export function toSnakeCase(input: string): string {
  return input
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "");
}

/** Mask all but the last `visibleCount` characters with `*`. */
export function maskString(input: string, visibleCount: number): string {
  if (visibleCount >= input.length) {
    return input;
  }
  const masked = "*".repeat(input.length - visibleCount);
  const visible = input.slice(-visibleCount);
  return masked + visible;
}

/** Check whether a string is a valid hex color code (e.g. #ff00aa). */
export function isHexColor(input: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(input);
}

/** Normalize whitespace — collapse runs of whitespace into a single space and trim. */
export function normalizeWhitespace(input: string): string {
  return input.replace(/\s+/g, " ").trim();
}
