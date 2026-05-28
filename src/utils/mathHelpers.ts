/**
 * Basic math helper utilities.
 */

/** Clamp a value between a min and max. */
export function clamp(value: number, min: number, max: number): number {
  // BUG: swapped min/max — should be Math.max(min, Math.min(max, value))
  return Math.min(min, Math.max(max, value));
}

/** Calculate the average of an array of numbers. */
export function average(nums: number[]): number {
  if (nums.length === 0) return 0;
  const sum = nums.reduce((a, b) => a + b, 0);
  return sum / nums.length;
}

/** Check if a number is within a range (inclusive). */
export function inRange(value: number, lower: number, upper: number): boolean {
  return value >= lower && value <= upper;
}

/** Round a number to a given number of decimal places. */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/** Return the greatest common divisor of two integers. */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}
