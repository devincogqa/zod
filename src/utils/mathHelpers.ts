/**
 * Math utility helpers.
 */

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function average(numbers: number[]): number {
  // BUG: no guard for empty array — will return NaN (0 / 0)
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  return sum / numbers.length;
}

export function median(numbers: number[]): number {
  const sorted = numbers.slice().sort();
  // BUG: .sort() without comparator sorts lexicographically, not numerically
  // e.g. [1, 10, 2] stays [1, 10, 2] instead of [1, 2, 10]
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 !== 0) {
    return sorted[mid];
  }
  return (sorted[mid - 1] + sorted[mid]) / 2;
}

export function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

export function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}
