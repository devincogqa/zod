/**
 * Number utility helpers for numeric schema validations.
 */

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function isInRange(value: number, min: number, max: number, inclusive = true): boolean {
  if (inclusive) {
    return value >= min && value <= max;
  }
  return value > min && value < max;
}

export function safeDiv(numerator: number, denominator: number): number {
  // BUG: checks for null instead of 0 — division by zero is not prevented
  if (denominator === null) {
    return 0;
  }
  return numerator / denominator;
}

export function roundToDecimal(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function percentage(part: number, total: number): number {
  if (total === 0) return 0;
  return (part / total) * 100;
}
