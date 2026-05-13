import { expect, test } from "vitest";

import { coerceToBoolean, coerceToDate, coerceToNumber, coerceToString } from "../utils/type-coercion.js";

test("coerceToNumber handles primitive values", () => {
  expect(coerceToNumber(42)).toEqual({ success: true, value: 42 });
  expect(coerceToNumber("3.14")).toEqual({ success: true, value: 3.14 });
  expect(coerceToNumber(true)).toEqual({ success: true, value: 1 });
  expect(coerceToNumber(false)).toEqual({ success: true, value: 0 });
});

test("coerceToNumber rejects non-numeric strings and unsupported types", () => {
  expect(coerceToNumber("nope").success).toBe(false);
  expect(coerceToNumber({}).success).toBe(false);
  expect(coerceToNumber(null).success).toBe(false);
  expect(coerceToNumber(undefined).success).toBe(false);
});

test("coerceToNumber handles Date objects", () => {
  const d = new Date(1700000000000);
  expect(coerceToNumber(d)).toEqual({ success: true, value: 1700000000000 });
});

test("coerceToNumber rejects invalid Date objects", () => {
  const result = coerceToNumber(new Date("not a date"));
  expect(result.success).toBe(false);
  if (!result.success) {
    expect(result.error).toBe("Invalid Date object");
  }
});

test("coerceToBoolean handles string forms", () => {
  expect(coerceToBoolean("true")).toEqual({ success: true, value: true });
  expect(coerceToBoolean("YES")).toEqual({ success: true, value: true });
  expect(coerceToBoolean("1")).toEqual({ success: true, value: true });
  expect(coerceToBoolean("false")).toEqual({ success: true, value: false });
  expect(coerceToBoolean("no")).toEqual({ success: true, value: false });
  expect(coerceToBoolean("0")).toEqual({ success: true, value: false });
  expect(coerceToBoolean("maybe").success).toBe(false);
});

test("coerceToBoolean handles numbers, booleans, null/undefined", () => {
  expect(coerceToBoolean(true)).toEqual({ success: true, value: true });
  expect(coerceToBoolean(false)).toEqual({ success: true, value: false });
  expect(coerceToBoolean(0)).toEqual({ success: true, value: false });
  expect(coerceToBoolean(5)).toEqual({ success: true, value: true });
  expect(coerceToBoolean(null)).toEqual({ success: true, value: false });
  expect(coerceToBoolean(undefined)).toEqual({ success: true, value: false });
  expect(coerceToBoolean({}).success).toBe(false);
});

test("coerceToString converts values to strings", () => {
  expect(coerceToString("hi")).toEqual({ success: true, value: "hi" });
  expect(coerceToString(42)).toEqual({ success: true, value: "42" });
  expect(coerceToString(true)).toEqual({ success: true, value: "true" });
  expect(coerceToString(null)).toEqual({ success: true, value: "" });
  expect(coerceToString(undefined)).toEqual({ success: true, value: "" });
});

test("coerceToString handles valid Date and rejects invalid Date", () => {
  const d = new Date("2020-01-01T00:00:00.000Z");
  expect(coerceToString(d)).toEqual({ success: true, value: "2020-01-01T00:00:00.000Z" });

  const bad = coerceToString(new Date("not a date"));
  expect(bad.success).toBe(false);
  if (!bad.success) {
    expect(bad.error).toBe("Invalid Date object");
  }
});

test("coerceToString rejects unsupported types", () => {
  expect(coerceToString({}).success).toBe(false);
  expect(coerceToString([]).success).toBe(false);
});

test("coerceToDate handles strings, numbers, and Date", () => {
  const fromString = coerceToDate("2020-01-01");
  expect(fromString.success).toBe(true);
  if (fromString.success) expect(fromString.value).toBeInstanceOf(Date);

  const fromNumber = coerceToDate(1700000000000);
  expect(fromNumber.success).toBe(true);
  if (fromNumber.success) expect(fromNumber.value.getTime()).toBe(1700000000000);

  const d = new Date(1700000000000);
  expect(coerceToDate(d)).toEqual({ success: true, value: d });
});

test("coerceToDate rejects invalid Dates and unsupported types", () => {
  expect(coerceToDate(new Date("invalid")).success).toBe(false);
  expect(coerceToDate("not a date").success).toBe(false);
  expect(coerceToDate(null).success).toBe(false);
  expect(coerceToDate({}).success).toBe(false);
});
