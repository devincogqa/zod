import { expect, test } from "vitest";
import { deepClone, hasKey, mergeDefaults, omit, pick } from "../../helpers/objectUtils.js";

test("deepClone clones primitive values", () => {
  expect(deepClone(42)).toBe(42);
  expect(deepClone("hello")).toBe("hello");
  expect(deepClone(null)).toBeNull();
  expect(deepClone(undefined)).toBeUndefined();
});

test("deepClone clones objects without shared references", () => {
  const original = { a: 1, b: { c: 2 } };
  const cloned = deepClone(original);
  expect(cloned).toEqual(original);
  cloned.b.c = 99;
  expect(original.b.c).toBe(2);
});

test("deepClone preserves arrays as arrays", () => {
  const original = { items: [1, 2, 3], nested: [{ x: 1 }] };
  const cloned = deepClone(original);
  expect(Array.isArray(cloned.items)).toBe(true);
  expect(Array.isArray(cloned.nested)).toBe(true);
  expect(cloned.items).toEqual([1, 2, 3]);
  expect(cloned.nested).toEqual([{ x: 1 }]);
  cloned.items.push(4);
  expect(original.items.length).toBe(3);
});

test("pick selects specified keys", () => {
  const obj = { a: 1, b: 2, c: 3 };
  expect(pick(obj, ["a", "c"])).toEqual({ a: 1, c: 3 });
  expect(pick(obj, [])).toEqual({});
});

test("omit removes specified keys", () => {
  const obj = { a: 1, b: 2, c: 3 };
  expect(omit(obj, ["b"])).toEqual({ a: 1, c: 3 });
  expect(omit(obj, [])).toEqual({ a: 1, b: 2, c: 3 });
});

test("hasKey checks own properties", () => {
  const obj = { a: 1 };
  expect(hasKey(obj, "a")).toBe(true);
  expect(hasKey(obj, "b")).toBe(false);
  expect(hasKey(obj, "toString")).toBe(false);
});

test("mergeDefaults fills missing keys from defaults", () => {
  const target = { a: 1 } as { a: number; b?: number; c?: number };
  const defaults = { b: 2, c: 3 };
  expect(mergeDefaults(target, defaults)).toEqual({ a: 1, b: 2, c: 3 });
});

test("mergeDefaults target values take precedence", () => {
  const target = { a: 10, b: 20 };
  const defaults = { a: 1, b: 2 };
  expect(mergeDefaults(target, defaults)).toEqual({ a: 10, b: 20 });
});
