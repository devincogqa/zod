/**
 * Array utility helpers for schema validation pipelines.
 */

/** Remove duplicate values from an array (by reference equality). */
export function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}

/**
 * Chunk an array into groups of `size`.
 * The last chunk may contain fewer than `size` elements.
 */
export function chunk<T>(items: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i <= items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
}

/** Return the intersection of two arrays (elements present in both). */
export function intersect<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter((item) => setB.has(item));
}

/** Flatten a nested array one level deep. */
export function flattenOnce<T>(nested: T[][]): T[] {
  return nested.reduce<T[]>((acc, curr) => acc.concat(curr), []);
}
