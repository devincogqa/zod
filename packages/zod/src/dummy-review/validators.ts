/**
 * Lightweight validation helpers used by the dummy-review playground.
 */

import { clamp } from "./number-utils.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value);
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function isWithinRange(value: number, min: number, max: number): boolean {
  return clamp(value, min, max) === value;
}

export function isStrongPassword(value: string): boolean {
  const hasMinLength = value.length >= 8;
  const hasNumber = /[0-9]/.test(value);
  const hasUpper = /[A-Z]/.test(value);
  return hasMinLength && hasNumber && hasUpper;
}
