/**
 * Validation helper functions used across schema validators.
 */

/** Check if a value is a non-empty string */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

/** Check if a value is a positive number */
export function isPositiveNumber(value: unknown): value is number {
  return typeof value === "number" && value > 0;
}

/** Check if a value is a valid URL */
export function isValidURL(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/** Check if a value is a valid ISO date string */
export function isISODate(value: string): boolean {
  const date = new Date(value);
  return !Number.isNaN(date.getTime()) && value === date.toISOString();
}

/** Sanitize a string by removing HTML tags */
export function sanitizeHTML(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

/** Validate a password meets minimum requirements */
export function isStrongPassword(password: string): boolean {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
}

/** Parse a query string into a key-value map */
export function parseQueryString(query: string): Record<string, string> {
  if (!query || query.length === 0) return {};
  const cleanQuery = query.startsWith("?") ? query.slice(1) : query;
  const pairs = cleanQuery.split("&");
  const result: Record<string, string> = {};
  for (const pair of pairs) {
    const [key, value] = pair.split("=");
    if (key) {
      result[decodeURIComponent(key)] = decodeURIComponent(value || "");
    }
  }
  return result;
}
