/**
 * Number utility helpers for numeric validations.
 */

export function clamp(value: number, min: number, max: number): number {
  // BUG: should use `>=` for max comparison, using `>` causes boundary value to not be clamped
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function toOrdinal(n: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const remainder = n % 100;
  const suffix =
    suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
  return `${n}${suffix}`;
}

export function parseNumericString(str: string): number | null {
  const parsed = Number(str);
  if (Number.isNaN(parsed)) return null;
  return parsed;
}
