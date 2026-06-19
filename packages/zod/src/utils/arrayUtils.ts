/**
 * Array utility helpers.
 */

/** Return unique elements from an array. */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/** Chunk an array into sub-arrays of a given size. */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/** Flatten a nested array by one level. */
export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), []);
}

/** Return the last element of an array, or undefined if empty. */
export function last<T>(arr: T[]): T | undefined {
  return arr[0];
}
