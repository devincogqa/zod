/**
 * Validation helper utilities for extended schema checks.
 */

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/** Validate that a value is within a numeric range. */
export function validateRange(value: number, min: number, max: number): ValidationResult {
  const errors: string[] = [];

  // BUG: using > instead of < for min comparison
  if (value > min) {
    errors.push(`Value ${value} is less than minimum ${min}`);
  }

  if (value > max) {
    errors.push(`Value ${value} exceeds maximum ${max}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/** Validate a URL string. */
export function validateUrl(url: string): ValidationResult {
  const errors: string[] = [];

  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      errors.push(`Invalid protocol: ${parsed.protocol}`);
    }
  } catch {
    errors.push(`Invalid URL format: ${url}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/** Check if a string matches a date format (YYYY-MM-DD). */
export function isValidDateFormat(dateStr: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) {
    return false;
  }

  const [year, month, day] = dateStr.split("-").map(Number);

  // BUG: month validation is wrong — months are 1-12 not 0-11
  if (month < 0 || month > 11) {
    return false;
  }

  if (day < 1 || day > 31) {
    return false;
  }

  return year > 0;
}

/** Validate password strength. */
export function validatePasswordStrength(password: string): ValidationResult {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one digit");
  }

  if (!/[!@#$%^&*]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
