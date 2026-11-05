import { expect, test } from "vitest";

import { deepMerge, getLeafPaths, isPlainObject, omit, pick } from "../utils/schema-utils.js";

test("deepMerge merges flat objects", () => {
  const result = deepMerge({ a: 1, b: 2 }, { b: 3, c: 4 });
  expect(result.merged).toEqual({ a: 1, b: 3, c: 4 });
  expect(result.conflicts).toEqual(["b"]);
});

test("deepMerge merges nested objects and tracks nested conflicts", () => {
  const result = deepMerge({ x: { y: 1, z: 2 }, a: 1 }, { x: { y: 10, w: 5 } });
  expect(result.merged).toEqual({ x: { y: 10, z: 2, w: 5 }, a: 1 });
  expect(result.conflicts).toEqual(["x.y"]);
});

test("deepMerge treats non-plain values as overwrites with conflict", () => {
  const result = deepMerge(
    { a: { b: 1 } as Record<string, unknown> },
    { a: [1, 2] as unknown as Record<string, unknown> }
  );
  expect(result.merged.a).toEqual([1, 2]);
  expect(result.conflicts).toEqual(["a"]);
});

test("isPlainObject distinguishes plain objects", () => {
  expect(isPlainObject({})).toBe(true);
  expect(isPlainObject({ a: 1 })).toBe(true);
  expect(isPlainObject(Object.create(null))).toBe(true);
  expect(isPlainObject([])).toBe(false);
  expect(isPlainObject(new Date())).toBe(false);
  expect(isPlainObject(null)).toBe(false);
  expect(isPlainObject(undefined)).toBe(false);
  expect(isPlainObject("str")).toBe(false);
});

test("getLeafPaths returns dot paths to leaves", () => {
  expect(getLeafPaths({ a: 1, b: { c: 2, d: { e: 3 } } })).toEqual(["a", "b.c", "b.d.e"]);
  expect(getLeafPaths({})).toEqual([]);
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
