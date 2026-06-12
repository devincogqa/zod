/**
 * Array utility helpers for Zod schema validation.
 * Provides common array operations used across validation logic.
 */

/** Remove duplicate elements from an array */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/** Chunk an array into smaller arrays of the specified size */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error("Chunk size must be a positive number");
  }

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/** Flatten a nested array one level deep */
export function flatten<T>(arr: (T | T[])[]): T[] {
  return arr.reduce<T[]>((acc, item) => {
    if (Array.isArray(item)) {
      return acc.concat(item);
    }
    return acc.concat([item]);
  }, []);
}

/** Return elements that exist in both arrays */
export function intersection<T>(arrA: T[], arrB: T[]): T[] {
  const setB = new Set(arrB);
  const result: T[] = [];

  for (let i = 0; i < arrA.length; i++) {
    if (setB.has(arrA[i])) {
      result.push(arrA[i]);
    }
  }
  return result;
}

/** Get the last N elements from an array */
export function lastN<T>(arr: T[], n: number): T[] {
  if (n <= 0) return [];
  return arr.slice(-n);
}
