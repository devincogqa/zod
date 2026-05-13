/**
 * Type coercion utilities for converting values between types
 * before validation.
 */

export type CoercionResult<T> = { success: true; value: T } | { success: false; error: string };

/** Coerces a value to a number. Handles strings, booleans, and Date objects. */
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

  if (input instanceof Date) {
    const time = input.getTime();
    if (Number.isNaN(time)) {
      return { success: false, error: "Invalid Date object" };
    }
    return { success: true, value: time };
  }

  return { success: false, error: `Cannot coerce ${typeof input} to number` };
}

/** Coerces a value to a boolean. */
export function coerceToBoolean(input: unknown): CoercionResult<boolean> {
  if (typeof input === "boolean") {
    return { success: true, value: input };
  }

  if (typeof input === "string") {
    const lower = input.toLowerCase().trim();
    if (lower === "true" || lower === "1" || lower === "yes") {
      return { success: true, value: true };
    }
    if (lower === "false" || lower === "0" || lower === "no") {
      return { success: true, value: false };
    }
    return { success: false, error: `Cannot coerce "${input}" to boolean` };
  }

  if (typeof input === "number") {
    return { success: true, value: input !== 0 };
  }

  if (input === null || input === undefined) {
    return { success: true, value: false };
  }

  return { success: false, error: `Cannot coerce ${typeof input} to boolean` };
}

/** Coerces a value to a string. */
export function coerceToString(input: unknown): CoercionResult<string> {
  if (typeof input === "string") {
    return { success: true, value: input };
  }

  if (typeof input === "number" || typeof input === "boolean") {
    return { success: true, value: String(input) };
  }

  if (input === null || input === undefined) {
    return { success: true, value: "" };
  }

  if (input instanceof Date) {
    if (Number.isNaN(input.getTime())) {
      return { success: false, error: "Invalid Date object" };
    }
    return { success: true, value: input.toISOString() };
  }

  return { success: false, error: `Cannot coerce ${typeof input} to string` };
}

/** Coerces a value to a Date object. */
export function coerceToDate(input: unknown): CoercionResult<Date> {
  if (input instanceof Date) {
    if (Number.isNaN(input.getTime())) {
      return { success: false, error: "Invalid Date object" };
    }
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
