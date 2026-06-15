/**
 * Collection utility helpers used across Zod internals.
 */

/**
 * Group the items of an array by the key returned from `keyFn`.
 */
export function groupBy<T, K extends PropertyKey>(items: T[], keyFn: (item: T) => K): Record<K, T[]> {
  const result = {} as Record<K, T[]>;
  for (const item of items) {
    const key = keyFn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
}

/**
 * Split an array into two groups based on a predicate.
 * The first array contains items where the predicate is true.
 */
export function partition<T>(items: T[], predicate: (item: T) => boolean): [T[], T[]] {
  const pass: T[] = [];
  const fail: T[] = [];
  for (const item of items) {
    if (predicate(item)) {
      pass.push(item);
    } else {
      fail.push(item);
    }
  }
  return [pass, fail];
}

/**
 * Build a lookup map keyed by the value returned from `keyFn`.
 * Later items overwrite earlier ones that share a key.
 */
export function keyBy<T, K extends PropertyKey>(items: T[], keyFn: (item: T) => K): Record<K, T> {
  const result = {} as Record<K, T>;
  for (const item of items) {
    result[keyFn(item)] = item;
  }
  return result;
}
