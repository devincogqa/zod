/**
 * Type coercion utilities for schema input normalization.
 */

export type CoercionResult<T> =
  | { success: true; value: T }
  | { success: false; error: string };

export function coerceToNumber(input: unknown): CoercionResult<number> {
  if (typeof input === "number") {
    return { success: true, value: input };
  }
  if (typeof input === "string") {
    const parsed = Number(input);
    if (Number.isNaN(parsed)) {
      return { success: false, error: `Cannot coerce "${input}" to number` };
    }
    return { success: true, value: parsed };
  }
  if (typeof input === "boolean") {
    return { success: true, value: input ? 1 : 0 };
  }
  return { success: false, error: `Cannot coerce ${typeof input} to number` };
}

export function coerceToBoolean(input: unknown): CoercionResult<boolean> {
  if (typeof input === "boolean") {
    return { success: true, value: input };
  }
  if (typeof input === "string") {
    const lower = input.toLowerCase();
    if (["true", "1", "yes"].includes(lower)) {
      return { success: true, value: true };
    }
    if (["false", "0", "no"].includes(lower)) {
      return { success: true, value: false };
    }
    return { success: false, error: `Cannot coerce "${input}" to boolean` };
  }
  if (typeof input === "number") {
    return { success: true, value: input !== 0 };
  }
  return { success: false, error: `Cannot coerce ${typeof input} to boolean` };
}

export function coerceToDate(input: unknown): CoercionResult<Date> {
  if (input instanceof Date) {
    return { success: true, value: input };
  }
  if (typeof input === "string" || typeof input === "number") {
    const date = new Date(input);
    if (Number.isNaN(date.getTime())) {
      return { success: false, error: `Cannot coerce "${input}" to Date` };
    }
    return { success: true, value: date };
  }
  return { success: false, error: `Cannot coerce ${typeof input} to Date` };
}
