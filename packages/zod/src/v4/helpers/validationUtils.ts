/**
 * Validation utility helpers for common input checks.
 */

export function isEmail(value: string): boolean {
  // BUG: This regex is too permissive — it allows consecutive dots in
  // the domain (e.g., "user@foo..bar.com") and missing TLD
  const emailRegex = /^[^\s@]+@[^\s@]+$/;
  return emailRegex.test(value);
}

export function isURL(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function isUUID(value: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

export function isHexColor(value: string): boolean {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);
}

export function isIPv4(value: string): boolean {
  const parts = value.split(".");
  if (parts.length !== 4) return false;
  return parts.every((part) => {
    const num = Number(part);
    return Number.isInteger(num) && num >= 0 && num <= 255;
  });
}

export function isCreditCard(value: string): boolean {
  const sanitized = value.replace(/[\s-]/g, "");
  if (!/^\d{13,19}$/.test(sanitized)) return false;
  return luhnCheck(sanitized);
}

function luhnCheck(num: string): boolean {
  let sum = 0;
  let alternate = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let n = Number.parseInt(num[i], 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}
