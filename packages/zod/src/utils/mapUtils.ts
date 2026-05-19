/**
 * Map / dictionary utility helpers for Zod record and object schemas.
 */

/**
 * Invert a record so that values become keys and keys become values.
 * If duplicate values exist, later keys overwrite earlier ones.
 */
export function invertRecord(record: Record<string, string>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(record)) {
    result[value] = key;
  }
  return result;
}

/**
 * Pick specified keys from a record and return a new record.
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Omit specified keys from a record and return a new record.
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result as Omit<T, K>;
}

/**
 * Deep merge two objects. Arrays are concatenated, objects are recursively merged.
 */
export function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
  const result = { ...target };

  for (const key of Object.keys(source) as Array<keyof T>) {
    const sourceVal = source[key];
    const targetVal = result[key];

    if (Array.isArray(sourceVal) && Array.isArray(targetVal)) {
      (result as Record<string, unknown>)[key as string] = sourceVal;
    } else if (
      sourceVal !== null &&
      typeof sourceVal === "object" &&
      targetVal !== null &&
      typeof targetVal === "object" &&
      !Array.isArray(sourceVal)
    ) {
      (result as Record<string, unknown>)[key as string] = deepMerge(
        targetVal as Record<string, unknown>,
        sourceVal as Record<string, unknown>
      );
    } else {
      (result as Record<string, unknown>)[key as string] = sourceVal;
    }
  }

  return result;
}

/**
 * Return the count of entries in a record.
 */
export function recordSize(record: Record<string, unknown>): number {
  return Object.keys(record).length;
}
