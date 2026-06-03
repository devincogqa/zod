/**
 * Math utility helpers for numeric schema validations.
 */

/**
 * Clamps a number between a minimum and maximum value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Rounds a number to the specified number of decimal places.
 */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Checks if a number is within the given range (inclusive).
 * Bug: Uses > instead of >= for the upper bound, making it exclusive on the right.
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value > max === false;
}

/**
 * Returns the average of an array of numbers.
 * Bug: Division by zero when array is empty - returns NaN instead of 0 or throwing.
 */
export function average(numbers: number[]): number {
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  return sum / numbers.length;
}

/**
 * Returns the median of an array of numbers.
 */
export function median(numbers: number[]): number {
  if (numbers.length === 0) {
    throw new Error("Cannot compute median of empty array");
  }

  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

/**
 * Computes the greatest common divisor of two numbers.
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}
