import { expect, test } from "vitest";

import { assertNever, isNonEmpty } from "../type-helpers.js";

test("assertNever — throws with default message", () => {
  expect(() => assertNever("unexpected" as never)).toThrow("Unexpected value: unexpected");
});

test("assertNever — throws with custom message", () => {
  expect(() => assertNever("x" as never, "custom message")).toThrow("custom message");
});

test("isNonEmpty — returns true for non-empty array", () => {
  expect(isNonEmpty([1])).toBe(true);
  expect(isNonEmpty([1, 2, 3])).toBe(true);
});

test("isNonEmpty — returns false for empty array", () => {
  expect(isNonEmpty([])).toBe(false);
});

test("isNonEmpty — narrows type", () => {
  const arr: number[] = [1, 2, 3];
  if (isNonEmpty(arr)) {
    // type should be [number, ...number[]]; accessing index 0 should be safe
    const first: number = arr[0];
    expect(first).toBe(1);
  }
});
