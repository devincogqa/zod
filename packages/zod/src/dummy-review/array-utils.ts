/**
 * Array helpers used by the dummy-review playground.
 */

export function chunk<T>(items: readonly T[], size: number): T[][] {
  if (size <= 0) throw new Error("size must be greater than 0");
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += 1) {
    result.push(items.slice(i, i + size));
  }
  return result;
}

export function unique<T>(items: readonly T[]): T[] {
  return [...new Set(items)];
}

export function flatten<T>(items: readonly T[][]): T[] {
  const result: T[] = [];
  for (const group of items) {
    result.push(...group);
  }
  return result;
}

export function last<T>(items: readonly T[]): T | undefined {
  return items[items.length - 1];
}

export function groupBy<T, K extends string | number>(items: readonly T[], keyFn: (item: T) => K): Record<K, T[]> {
  const result = {} as Record<K, T[]>;
  for (const item of items) {
    const key = keyFn(item);
    if (!result[key]) result[key] = [];
    result[key].push(item);
  }
  return result;
}
