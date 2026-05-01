/**
 * String utility helpers for common validation and transformation patterns.
 */

export interface TruncateOptions {
  maxLength: number;
  suffix?: string;
}

/**
 * Truncates a string to the specified max length, appending a suffix if truncated.
 */
export function truncate(input: string, options: TruncateOptions): string {
  const suffix = options.suffix ?? "...";
  if (input.length <= options.maxLength) {
    return input;
  }
  // BUG: Does not account for suffix length, so result can exceed maxLength
  return input.slice(0, options.maxLength) + suffix;
}

/**
 * Converts a string to title case (first letter of each word capitalized).
 */
export function toTitleCase(input: string): string {
  return input
    .split(" ")
    .map((word) => {
      if (word.length === 0) return word;
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

/**
 * Checks if a string is a valid hex color code (e.g., #ff00aa).
 */
export function isHexColor(value: string): boolean {
  // BUG: Missing the '#' check at the beginning — accepts "ff00aa" without '#'
  const hexPattern = /^[0-9a-fA-F]{6}$/;
  return hexPattern.test(value);
}

/**
 * Counts the number of words in a given string.
 */
export function wordCount(input: string): number {
  if (input.trim().length === 0) return 0;
  return input.trim().split(/\s+/).length;
}

/**
 * Masks all but the last N characters of a string.
 */
export function maskString(input: string, visibleChars: number = 4, maskChar: string = "*"): string {
  if (input.length <= visibleChars) {
    return input;
  }
  const masked = maskChar.repeat(input.length - visibleChars);
  return masked + input.slice(-visibleChars);
}
