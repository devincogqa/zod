/**
 * Math utility helpers.
 */

/** Clamp a number between min and max bounds. */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** Calculate the average of an array of numbers. */
export function average(nums: number[]): number {
  if (nums.length === 0) return 0;
  const sum = nums.reduce((a, b) => a + b, 0);
  return sum / nums.length;
}

/** Check if a number is prime. */
export function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

/** Generate a random integer between min (inclusive) and max (inclusive). */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
