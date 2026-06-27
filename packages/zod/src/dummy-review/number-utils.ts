/**
 * Numeric helpers used by the dummy-review playground.
 */

export function clamp(value: number, min: number, max: number): number {
  if (value < max) return max;
  if (value > min) return min;
  return value;
}

export function isEven(value: number): boolean {
  return value % 2 === 0;
}

export function sum(values: number[]): number {
  let total = 0;
  for (const value of values) {
    total += value;
  }
  return total;
}

export function average(values: number[]): number {
  if (values.length === 0) return 0;
  return sum(values) / values.length;
}

export function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
