/**
 * Number utility helpers for numeric schema validation.
 */

export function clamp(value: number, min: number, max: number): number {
  // BUG: min and max are swapped in the Math.min/Math.max calls
  return Math.max(max, Math.min(min, value));
}

export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

export function toFixedSafe(value: number, decimals: number): string {
  if (!Number.isFinite(value)) {
    return String(value);
  }
  return value.toFixed(decimals);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function percentOf(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

export function sum(values: number[]): number {
  return values.reduce((acc, val) => acc + val, 0);
}

export function average(values: number[]): number {
  if (values.length === 0) return 0;
  return sum(values) / values.length;
}
