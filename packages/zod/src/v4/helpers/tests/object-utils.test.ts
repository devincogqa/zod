import { expect, test } from "vitest";
import { deepClone, deepMerge, hasKey, mapValues, omit, pick } from "../object-utils.js";

test("deepClone - returns primitives as-is", () => {
  expect(deepClone(42)).toBe(42);
  expect(deepClone("hello")).toBe("hello");
  expect(deepClone(null)).toBe(null);
  expect(deepClone(undefined)).toBe(undefined);
});

test("deepClone - deeply clones nested objects and arrays", () => {
  const original = { a: { b: { c: 1 } }, d: [1, 2, { e: 3 }] };
  const cloned = deepClone(original);
  expect(cloned).toEqual(original);
  expect(cloned).not.toBe(original);
  expect(cloned.a).not.toBe(original.a);
  expect(cloned.a.b).not.toBe(original.a.b);
  expect(cloned.d).not.toBe(original.d);
  expect(cloned.d[2]).not.toBe(original.d[2]);
});

test("deepClone - mutating the clone does not affect the original", () => {
  const original = { a: { b: 1 } };
  const cloned = deepClone(original);
  cloned.a.b = 99;
  expect(original.a.b).toBe(1);
});

test("deepMerge - merges top-level keys", () => {
  expect(deepMerge({ a: 1, b: 2 }, { b: 3, c: 4 } as any)).toEqual({ a: 1, b: 3, c: 4 });
});

test("deepMerge - skips undefined source values", () => {
  expect(deepMerge({ a: 1, b: 2 }, { a: undefined } as any)).toEqual({ a: 1, b: 2 });
});

test("deepMerge - recursively merges nested plain objects", () => {
  const result = deepMerge({ a: { x: 1, y: 2 } } as Record<string, unknown>, {
    a: { x: 3 },
  } as any);
  expect(result).toEqual({ a: { x: 3, y: 2 } });
});

test("deepMerge - source value replaces target when types differ", () => {
  const result = deepMerge({ a: { x: 1 } } as Record<string, unknown>, { a: 5 } as any);
  expect(result).toEqual({ a: 5 });
});

test("deepMerge - arrays are replaced, not merged", () => {
  const result = deepMerge({ a: [1, 2, 3] } as Record<string, unknown>, { a: [4] } as any);
  expect(result).toEqual({ a: [4] });
});

test("deepMerge - does not mutate target", () => {
  const target = { a: { x: 1 } };
  deepMerge(target as Record<string, unknown>, { a: { y: 2 } } as any);
  expect(target).toEqual({ a: { x: 1 } });
});

test("pick - selects only the requested keys", () => {
  expect(pick({ a: 1, b: 2, c: 3 }, ["a", "c"])).toEqual({ a: 1, c: 3 });
});

test("pick - omits keys that are missing from the source", () => {
  expect(pick({ a: 1 } as { a: number; b?: number }, ["a", "b"])).toEqual({ a: 1 });
});

test("omit - removes the requested keys", () => {
  expect(omit({ a: 1, b: 2, c: 3 }, ["b"])).toEqual({ a: 1, c: 3 });
});

test("omit - does not mutate the input", () => {
  const obj = { a: 1, b: 2 };
  omit(obj, ["a"]);
  expect(obj).toEqual({ a: 1, b: 2 });
});

test("hasKey - returns true for own keys and false otherwise", () => {
  expect(hasKey({ a: 1 }, "a")).toBe(true);
  expect(hasKey({ a: 1 }, "b")).toBe(false);
  expect(hasKey({}, "toString")).toBe(false);
});

test("mapValues - applies fn to each value", () => {
  expect(mapValues({ a: 1, b: 2 }, (v) => (v as number) * 2)).toEqual({ a: 2, b: 4 });
});

test("mapValues - passes the key as the second argument", () => {
  expect(mapValues({ a: 1, b: 2 }, (_v, k) => k)).toEqual({ a: "a", b: "b" });
});
