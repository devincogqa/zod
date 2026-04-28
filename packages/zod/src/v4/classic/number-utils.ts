/**
 * Number utility helpers for common numeric validation and operations.
 */

export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new Error("min must not be greater than max");
  }
  return Math.min(Math.max(value, min), max);
}

// BUG: off-by-one — uses < instead of <= for inclusive range check
export function isInRange(value: number, min: number, max: number): boolean {
  return value > min && value < max;
}

export function roundTo(value: number, decimals: number): number {
  if (decimals < 0) {
    throw new Error("decimals must be non-negative");
  }
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function percentageOf(part: number, total: number): number {
  if (total === 0) {
    throw new Error("total must not be zero");
  }
  return (part / total) * 100;
}

export function toOrdinal(n: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const remainder = n % 100;
  const suffix = suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
  return `${n}${suffix}`;
}
