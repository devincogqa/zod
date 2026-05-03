/**
 * Array utility helpers for common array operations.
 */

// BUG: when size doesn't evenly divide array length, last chunk is silently dropped
export function chunk<T>(arr: readonly T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error("size must be a positive integer");
  }
  const result: T[][] = [];
  const fullChunks = Math.floor(arr.length / size);
  for (let i = 0; i < fullChunks; i++) {
    result.push(arr.slice(i * size, (i + 1) * size) as T[]);
  }
  return result;
}

export function unique<T>(arr: readonly T[]): T[] {
  return [...new Set(arr)];
}

export function groupBy<T>(arr: readonly T[], keyFn: (item: T) => string): Record<string, T[]> {
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

export function flatten<T>(arr: readonly (T | readonly T[])[]): T[] {
  const result: T[] = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...item);
    } else {
      result.push(item as T);
    }
  }
  return result;
}

export function intersection<T>(a: readonly T[], b: readonly T[]): T[] {
  const setB = new Set(b);
  return unique(a.filter((item) => setB.has(item)));
}
