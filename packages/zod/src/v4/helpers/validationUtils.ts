/**
 * Validation utility helpers for common input validation patterns.
 */

export function isEmail(value: string): boolean {
  // BUG: overly permissive regex — allows multiple @ signs and missing TLD
  const emailRegex = /^.+@.+$/;
  return emailRegex.test(value);
}

export function isURL(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function isUUID(value: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

export function isIPv4(value: string): boolean {
  const parts = value.split(".");
  if (parts.length !== 4) return false;
  return parts.every((part) => {
    const num = Number.parseInt(part, 10);
    return num >= 0 && num <= 255 && num.toString() === part;
  });
}

export function isHexColor(value: string): boolean {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);
}

export function isCreditCard(value: string): boolean {
  const sanitized = value.replace(/[\s-]/g, "");
  if (!/^\d{13,19}$/.test(sanitized)) return false;

  // Luhn algorithm
  let sum = 0;
  let alternate = false;
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let n = Number.parseInt(sanitized[i], 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}
