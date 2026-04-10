import { expect, test } from "vitest";

import { isNonEmptyString, isPositiveInteger, hasRequiredKeys, isValidURL, isValidISODate, deepEqual } from "../validation-helpers";

// isNonEmptyString
test("isNonEmptyString accepts non-empty strings", () => {
  expect(isNonEmptyString("hello")).toBe(true);
  expect(isNonEmptyString("a")).toBe(true);
});

test("isNonEmptyString rejects empty or whitespace-only strings", () => {
  expect(isNonEmptyString("")).toBe(false);
  expect(isNonEmptyString("   ")).toBe(false);
  expect(isNonEmptyString("\t\n")).toBe(false);
});

test("isNonEmptyString rejects non-string values", () => {
  expect(isNonEmptyString(null)).toBe(false);
  expect(isNonEmptyString(undefined)).toBe(false);
  expect(isNonEmptyString(42)).toBe(false);
  expect(isNonEmptyString({})).toBe(false);
});

// isPositiveInteger
test("isPositiveInteger accepts positive integers", () => {
  expect(isPositiveInteger(1)).toBe(true);
  expect(isPositiveInteger(100)).toBe(true);
});

test("isPositiveInteger rejects zero, negatives, and non-integers", () => {
  expect(isPositiveInteger(0)).toBe(false);
  expect(isPositiveInteger(-1)).toBe(false);
  expect(isPositiveInteger(1.5)).toBe(false);
  expect(isPositiveInteger(NaN)).toBe(false);
  expect(isPositiveInteger(Infinity)).toBe(false);
});

test("isPositiveInteger rejects non-number values", () => {
  expect(isPositiveInteger("1")).toBe(false);
  expect(isPositiveInteger(null)).toBe(false);
  expect(isPositiveInteger(undefined)).toBe(false);
});

// hasRequiredKeys
test("hasRequiredKeys returns true when all keys present", () => {
  expect(hasRequiredKeys({ a: 1, b: 2, c: 3 }, ["a", "b"])).toBe(true);
});

test("hasRequiredKeys returns false when keys missing", () => {
  expect(hasRequiredKeys({ a: 1 }, ["a", "b"])).toBe(false);
});

test("hasRequiredKeys returns false when key value is undefined", () => {
  expect(hasRequiredKeys({ a: undefined }, ["a"])).toBe(false);
});

test("hasRequiredKeys handles empty keys array", () => {
  expect(hasRequiredKeys({}, [])).toBe(true);
});

// isValidURL
test("isValidURL accepts valid URLs", () => {
  expect(isValidURL("https://example.com")).toBe(true);
  expect(isValidURL("http://localhost:3000")).toBe(true);
  expect(isValidURL("ftp://files.example.com")).toBe(true);
});

test("isValidURL rejects invalid URLs", () => {
  expect(isValidURL("not a url")).toBe(false);
  expect(isValidURL("")).toBe(false);
  expect(isValidURL("example.com")).toBe(false);
});

// isValidISODate
test("isValidISODate accepts valid ISO 8601 strings", () => {
  expect(isValidISODate("2024-01-15T12:00:00.000Z")).toBe(true);
  expect(isValidISODate("2000-06-15T00:00:00.000Z")).toBe(true);
});

test("isValidISODate rejects invalid date strings", () => {
  expect(isValidISODate("not a date")).toBe(false);
  expect(isValidISODate("")).toBe(false);
  expect(isValidISODate("2024-01-15")).toBe(false);
  expect(isValidISODate("2024-13-01T00:00:00.000Z")).toBe(false);
});

// deepEqual
test("deepEqual compares primitives", () => {
  expect(deepEqual(1, 1)).toBe(true);
  expect(deepEqual("a", "a")).toBe(true);
  expect(deepEqual(true, true)).toBe(true);
  expect(deepEqual(null, null)).toBe(true);
  expect(deepEqual(1, 2)).toBe(false);
  expect(deepEqual("a", "b")).toBe(false);
});

test("deepEqual compares objects", () => {
  expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
  expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
  expect(deepEqual({ a: 1 }, { b: 1 })).toBe(false);
  expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
});

test("deepEqual compares nested objects", () => {
  expect(deepEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
  expect(deepEqual({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false);
});

test("deepEqual compares arrays", () => {
  expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
  expect(deepEqual([1, 2], [1, 2, 3])).toBe(false);
});

test("deepEqual handles type mismatches", () => {
  expect(deepEqual(1, "1")).toBe(false);
  expect(deepEqual(null, undefined)).toBe(false);
  expect(deepEqual({}, null)).toBe(false);
});
