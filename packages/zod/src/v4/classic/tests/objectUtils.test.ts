import { expect, test } from "vitest";
import { deepClone, hasKey, mergeDefaults, omit, pick } from "../../helpers/objectUtils.js";

test("deepClone returns primitives as-is", () => {
  expect(deepClone(1)).toBe(1);
  expect(deepClone("hello")).toBe("hello");
  expect(deepClone(null)).toBe(null);
  expect(deepClone(undefined)).toBe(undefined);
});

test("deepClone clones nested objects without sharing references", () => {
  const original = { a: 1, b: { c: 2, d: { e: 3 } } };
  const cloned = deepClone(original);
  expect(cloned).toEqual(original);
  expect(cloned).not.toBe(original);
  expect(cloned.b).not.toBe(original.b);
  expect(cloned.b.d).not.toBe(original.b.d);
});

test("pick selects only the requested keys", () => {
  const obj = { a: 1, b: 2, c: 3 };
  expect(pick(obj, ["a", "c"])).toEqual({ a: 1, c: 3 });
  expect(pick(obj, [])).toEqual({});
});

test("pick ignores keys not present on the object", () => {
  const obj = { a: 1, b: 2 } as { a: number; b: number; c?: number };
  expect(pick(obj, ["a", "c"])).toEqual({ a: 1 });
});

test("omit removes the requested keys", () => {
  const obj = { a: 1, b: 2, c: 3 };
  expect(omit(obj, ["b"])).toEqual({ a: 1, c: 3 });
  expect(omit(obj, ["a", "b", "c"])).toEqual({});
  expect(omit(obj, [])).toEqual(obj);
});

test("hasKey only reports own properties", () => {
  const obj = { a: 1 };
  expect(hasKey(obj, "a")).toBe(true);
  expect(hasKey(obj, "b")).toBe(false);
  expect(hasKey(obj, "toString")).toBe(false);
});

test("mergeDefaults lets target values override defaults", () => {
  expect(mergeDefaults({ a: 1, b: 2 }, { a: 99, c: 3 } as { a?: number; b?: number; c?: number })).toEqual({
    a: 1,
    b: 2,
    c: 3,
  });
  expect(mergeDefaults({}, { a: 1 } as { a?: number })).toEqual({ a: 1 });
});
