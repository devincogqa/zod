import { expect, test } from "vitest";

import { deepFreeze, merge, omit, pick } from "../helpers/objectUtils.js";

test("omit", () => {
  expect(omit({ a: 1, b: 2, c: 3 }, ["b"])).toEqual({ a: 1, c: 3 });
  expect(omit({ a: 1, b: 2 }, ["a", "b"])).toEqual({});
  expect(omit({ a: 1, b: 2 }, [])).toEqual({ a: 1, b: 2 });
});

test("pick", () => {
  expect(pick({ a: 1, b: 2, c: 3 }, ["a", "c"])).toEqual({ a: 1, c: 3 });
  expect(pick({ a: 1, b: 2 }, [])).toEqual({});
  expect(pick({ a: 1, b: 2 }, ["a", "b"])).toEqual({ a: 1, b: 2 });
});

test("deepFreeze", () => {
  const obj = { a: 1, nested: { b: 2 } };
  const frozen = deepFreeze(obj);
  expect(Object.isFrozen(frozen)).toEqual(true);
  expect(Object.isFrozen(frozen.nested)).toEqual(true);
  expect(() => {
    (frozen as any).a = 99;
  }).toThrow();
  expect(frozen.a).toEqual(1);
});

test("merge", () => {
  expect(merge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  expect(merge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
  expect(merge({}, { a: 1 })).toEqual({ a: 1 });
});
