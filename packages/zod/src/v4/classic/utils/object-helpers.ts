/**
 * Object utility helpers for working with schema metadata and configs.
 */

/** Deep-merge two plain objects. Arrays are replaced, not concatenated. */
export function deepMerge<A extends Record<string, unknown>, B extends Record<string, unknown>>(
  target: A,
  source: B
): A & B {
  const output: Record<string, unknown> = { ...target };

  for (const key of Object.keys(source)) {
    const srcVal = source[key];
    const tgtVal = (target as Record<string, unknown>)[key];

    if (isPlainObject(srcVal) && isPlainObject(tgtVal)) {
      output[key] = deepMerge(
        tgtVal as Record<string, unknown>,
        srcVal as Record<string, unknown>
      );
    } else {
      output[key] = srcVal;
    }
  }

  return output as A & B;
}

/** Pick specified keys from an object. */
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

/** Omit specified keys from an object. */
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

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
