/**
 * Validation utility helpers for common schema checks.
 */

/** Validate that a string matches an email pattern. */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/** Validate that a string is a valid URL. */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/** Validate that a string is a valid UUID (v4). */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/** Validate that a string contains only alphanumeric characters. */
export function isAlphanumeric(str: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(str);
}

/** Validate that a date string is in ISO 8601 format. */
export function isISO8601(dateStr: string): boolean {
  const parsed = Date.parse(dateStr);
  if (isNaN(parsed)) {
    return false;
  }
  // Verify round-trip: construct a Date and check toISOString matches
  const date = new Date(parsed);
  return date.toISOString() === dateStr;
}

/** Check whether a value is null or undefined. */
export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}
