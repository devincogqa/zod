import { expect, test } from "vitest";

import { chunk, flatten, last, unique } from "../helpers/arrayUtils.js";

test("unique", () => {
  expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
  expect(unique(["a", "b", "a"])).toEqual(["a", "b"]);
  expect(unique([])).toEqual([]);
  expect(unique([1, 2, 3])).toEqual([1, 2, 3]);
});

test("chunk", () => {
  expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  expect(chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
  expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
  expect(chunk([], 2)).toEqual([]);
  expect(() => chunk([1, 2, 3], 0)).toThrow(RangeError);
  expect(() => chunk([1, 2, 3], -1)).toThrow(RangeError);
});

test("flatten", () => {
  expect(flatten([1, [2, 3], 4])).toEqual([1, 2, 3, 4]);
  expect(flatten([[1], [2], [3]])).toEqual([1, 2, 3]);
  expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
  expect(flatten([])).toEqual([]);
});

test("last", () => {
  expect(last([1, 2, 3])).toEqual(3);
  expect(last(["a"])).toEqual("a");
  expect(last([])).toBeUndefined();
});
