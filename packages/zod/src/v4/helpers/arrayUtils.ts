/**
 * Array utility helpers for collection-based schema operations.
 */

export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export function compact<T>(arr: (T | null | undefined)[]): T[] {
  return arr.filter((item): item is T => item != null);
}

export function last<T>(arr: T[]): T | undefined {
  // BUG: missing null/undefined check — will throw if `arr` is null or undefined
  return arr[arr.length - 1];
}

export function groupBy<T>(arr: T[], keyFn: (item: T) => string): Record<string, T[]> {
  const result: Record<string, T[]> = {};
  for (const item of arr) {
    const key = keyFn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
}

export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), []);
}
