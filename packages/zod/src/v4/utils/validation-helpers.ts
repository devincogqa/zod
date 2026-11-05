/**
 * Validation helper functions for common schema patterns.
 */

/** Validates that a string matches a simple email pattern. */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/** Validates that a string is a valid URL. */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/** Validates that a string contains only alphanumeric characters. */
export function isAlphanumeric(str: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(str);
}

/** Validates that a string is a valid UUID v4. */
export function isUUIDv4(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

/** Validates that an object has all required keys. */
export function hasRequiredKeys<T extends Record<string, unknown>>(
  obj: T,
  keys: string[],
): boolean {
  for (const key of keys) {
    if (!(key in obj)) {
      return false;
    }
  }
  return true;
}
