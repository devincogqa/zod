import { describe, expect, test } from "vitest";

import {
  isPlainObject,
  isNonEmptyString,
  isInteger,
  isFiniteNumber,
  isNullish,
  hasOwn,
  deepEqual,
  safeJsonParse,
} from "../type-helpers.js";

describe("isPlainObject", () => {
  test("returns true for plain objects", () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ a: 1 })).toBe(true);
  });

  test("returns true for Object.create(null)", () => {
    expect(isPlainObject(Object.create(null))).toBe(true);
  });

  test("returns false for non-objects", () => {
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
    expect(isPlainObject(42)).toBe(false);
    expect(isPlainObject("string")).toBe(false);
    expect(isPlainObject([])).toBe(false);
  });
});

describe("isNonEmptyString", () => {
  test("returns true for non-empty strings", () => {
    expect(isNonEmptyString("hello")).toBe(true);
  });

  test("returns false for empty string", () => {
    expect(isNonEmptyString("")).toBe(false);
  });

  test("returns false for non-strings", () => {
    expect(isNonEmptyString(42)).toBe(false);
    expect(isNonEmptyString(null)).toBe(false);
  });
});

describe("isInteger", () => {
  test("returns true for integers", () => {
    expect(isInteger(5)).toBe(true);
    expect(isInteger(0)).toBe(true);
    expect(isInteger(-3)).toBe(true);
  });

  test("returns false for non-integers", () => {
    expect(isInteger(3.14)).toBe(false);
    expect(isInteger(Number.NaN)).toBe(false);
    expect(isInteger(Number.POSITIVE_INFINITY)).toBe(false);
    expect(isInteger("5")).toBe(false);
  });
});

describe("isFiniteNumber", () => {
  test("returns true for finite numbers", () => {
    expect(isFiniteNumber(42)).toBe(true);
    expect(isFiniteNumber(0)).toBe(true);
    expect(isFiniteNumber(-3.14)).toBe(true);
  });

  test("returns false for non-finite values", () => {
    expect(isFiniteNumber(Number.POSITIVE_INFINITY)).toBe(false);
    expect(isFiniteNumber(Number.NEGATIVE_INFINITY)).toBe(false);
    expect(isFiniteNumber(Number.NaN)).toBe(false);
    expect(isFiniteNumber("42")).toBe(false);
  });
});

describe("isNullish", () => {
  test("returns true for null and undefined", () => {
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);
  });

  test("returns false for other falsy values", () => {
    expect(isNullish(0)).toBe(false);
    expect(isNullish("")).toBe(false);
    expect(isNullish(false)).toBe(false);
  });
});

describe("hasOwn", () => {
  test("returns true for own properties", () => {
    expect(hasOwn({ a: 1 }, "a")).toBe(true);
  });

  test("returns false for non-existent properties", () => {
    expect(hasOwn({ a: 1 }, "b")).toBe(false);
  });

  test("returns false for inherited properties", () => {
    const obj = Object.create({ inherited: true });
    expect(hasOwn(obj, "inherited")).toBe(false);
  });
});

describe("deepEqual", () => {
  test("returns true for identical primitives", () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual("a", "a")).toBe(true);
    expect(deepEqual(true, true)).toBe(true);
  });

  test("returns false for different primitives", () => {
    expect(deepEqual(1, 2)).toBe(false);
    expect(deepEqual("a", "b")).toBe(false);
  });

  test("compares arrays deeply", () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepEqual([1, 2], [1, 2, 3])).toBe(false);
  });

  test("compares objects deeply", () => {
    expect(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(true);
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
  });

  test("returns false for objects with different keys", () => {
    expect(deepEqual({ a: undefined }, { b: undefined })).toBe(false);
  });

  test("returns false for null comparisons", () => {
    expect(deepEqual(null, {})).toBe(false);
    expect(deepEqual({}, null)).toBe(false);
  });
});

describe("safeJsonParse", () => {
  test("parses valid JSON", () => {
    expect(safeJsonParse('{"a":1}')).toEqual({ a: 1 });
    expect(safeJsonParse("[1,2,3]")).toEqual([1, 2, 3]);
  });

  test("returns undefined for invalid JSON", () => {
    expect(safeJsonParse("not json")).toBeUndefined();
    expect(safeJsonParse("{invalid}")).toBeUndefined();
  });
});
