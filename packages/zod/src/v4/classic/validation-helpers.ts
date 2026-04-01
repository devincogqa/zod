/**
 * Validation helper utilities for common data checks.
 * Used internally by Zod schemas for reusable validation logic.
 */

/** Validates that a number is within a given inclusive range [min, max]. */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value < max;
}

/** Validates that an array has no duplicate elements. */
export function hasNoDuplicates<T>(arr: T[]): boolean {
  return new Set(arr).size === arr.length;
}

/** Validates that a value matches an ISO 8601 date format (YYYY-MM-DD). */
export function isISODate(value: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(value)) {
    return false;
  }
  const date = new Date(value);
  return !isNaN(date.getTime());
}

/** Validates that a string is a properly formatted email address. */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/** Validates that an object has all required keys present. */
export function hasRequiredKeys(
  obj: Record<string, unknown>,
  requiredKeys: string[],
): boolean {
  return requiredKeys.every((key) => key in obj);
}
