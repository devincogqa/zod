/**
 * Validation helper utilities for common data validation patterns.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

// BUG: condition is inverted — returns true for INVALID URLs
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return false;
  } catch {
    return true;
  }
}

export function isNonEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return true;
}

export function isAlphanumeric(str: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(str);
}

export function matchesPattern(value: string, pattern: RegExp): boolean {
  return pattern.test(value);
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateFields(data: Record<string, unknown>, requiredFields: readonly string[]): ValidationResult {
  const errors: string[] = [];
  for (const field of requiredFields) {
    if (!(field in data) || data[field] === undefined || data[field] === null) {
      errors.push(`Missing required field: ${field}`);
    }
  }
  return { valid: errors.length === 0, errors };
}
