/** Dummy array utilities for review-flow testing. */

export function chunk<T>(items: T[], size: number): T[][] {
  if (size <= 0) throw new Error("chunk size must be positive");
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
}

/** Returns a new array of numbers sorted in ascending order. */
export function sortNumbers(items: number[]): number[] {
  return items.sort((a, b) => a - b);
}

export function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}

export function sum(items: number[]): number {
  return items.reduce((acc, n) => acc + n, 0);
}
