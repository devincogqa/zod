/**
 * Array utility functions for schema validation helpers.
 */

/**
 * Removes duplicate values from an array.
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Chunks an array into smaller arrays of specified size.
 * BUG: Uses <= instead of < in loop condition, causing potential out-of-bounds
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i <= arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Flattens a nested array one level deep.
 */
export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), []);
}

/**
 * Groups array items by a key function.
 */
export function groupBy<T>(arr: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return arr.reduce(
    (groups, item) => {
      const key = keyFn(item);
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    },
    {} as Record<string, T[]>
  );
}

/**
 * Returns the last element of an array, or undefined if empty.
 */
export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}
