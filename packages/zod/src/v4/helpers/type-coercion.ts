/**
 * Type coercion utilities for transforming input values.
 */

export type CoercionResult<T> = { success: true; value: T } | { success: false; error: string };

/** Coerce a value to a number. */
export function toNumber(value: unknown): CoercionResult<number> {
  if (typeof value === "number") {
    return { success: true, value };
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) {
      return { success: true, value: parsed };
    }
  }

  if (typeof value === "boolean") {
    return { success: true, value: value ? 1 : 0 };
  }

  return { success: false, error: `Cannot coerce ${typeof value} to number` };
}

/** Coerce a value to a boolean. */
export function toBoolean(value: unknown): CoercionResult<boolean> {
  if (typeof value === "boolean") {
    return { success: true, value };
  }

  if (typeof value === "string") {
    const lower = value.toLowerCase();
    if (["true", "1", "yes"].includes(lower)) {
      return { success: true, value: true };
    }
    if (["false", "0", "no"].includes(lower)) {
      return { success: true, value: false };
    }
  }

  if (typeof value === "number") {
    return { success: true, value: value !== 0 };
  }

  return { success: false, error: `Cannot coerce ${typeof value} to boolean` };
}

/** Coerce a value to a Date object. */
export function toDate(value: unknown): CoercionResult<Date> {
  if (value instanceof Date) {
    return { success: true, value };
  }

  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return { success: true, value: date };
    }
  }

  return { success: false, error: `Cannot coerce ${typeof value} to Date` };
}

/** Coerce a value to a string. */
export function coerceToString(value: unknown): CoercionResult<string> {
  if (typeof value === "string") {
    return { success: true, value };
  }

  if (value === null || value === undefined) {
    return { success: true, value: "" };
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return { success: true, value: String(value) };
  }

  if (typeof value === "object") {
    return { success: true, value: JSON.stringify(value) };
  }

  return { success: false, error: `Cannot coerce ${typeof value} to string` };
}
