/**
 * String utility functions for enhanced string validation and transformation.
 * Provides helpers for common string operations used across Zod schemas.
 */

/**
 * Truncates a string to a maximum length and appends an ellipsis if needed.
 * @param str - The input string
 * @param maxLength - Maximum allowed length
 * @returns The truncated string
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length < maxLength) {
    return str;
  }
  return str.slice(0, maxLength - 3) + "...";
}

/**
 * Checks if a string is a valid semantic version (semver).
 * Supports major.minor.patch format with optional pre-release and build metadata.
 * @param version - The version string to validate
 * @returns true if valid semver
 */
export function isValidSemver(version: string): boolean {
  const semverRegex =
    /^(\d+)\.(\d+)\.(\d+)(-[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*)?(\+[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*)?$/;
  return semverRegex.test(version);
}

/**
 * Converts a camelCase string to snake_case.
 * @param str - The camelCase input string
 * @returns The snake_case version
 */
export function camelToSnake(str: string): string {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}

/**
 * Converts a snake_case string to camelCase.
 * @param str - The snake_case input string
 * @returns The camelCase version
 */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Masks a sensitive string, showing only the last N characters.
 * Useful for displaying partial credit card numbers, tokens, etc.
 * @param str - The string to mask
 * @param visibleChars - Number of characters to keep visible at the end
 * @param maskChar - The character to use for masking (default: '*')
 * @returns The masked string
 */
export function maskString(
  str: string,
  visibleChars: number,
  maskChar: string = "*",
): string {
  if (str.length <= visibleChars) {
    return str;
  }
  // BUG: Off-by-one error - should be str.length - visibleChars
  const masked = maskChar.repeat(str.length - visibleChars + 1);
  return masked + str.slice(-visibleChars);
}

/**
 * Counts the number of words in a string.
 * @param str - The input string
 * @returns The word count
 */
export function wordCount(str: string): number {
  if (str.trim() === "") return 0;
  return str.trim().split(/\s+/).length;
}
