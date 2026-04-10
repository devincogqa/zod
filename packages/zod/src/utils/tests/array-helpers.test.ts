import { expect, test } from "vitest";

import { chunk, unique, flatten, groupBy } from "../array-helpers";

// chunk
test("chunk splits array into chunks of given size", () => {
  expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
  expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  expect(chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
  expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
});

test("chunk handles array shorter than size", () => {
  expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
});

test("chunk handles empty array", () => {
  expect(chunk([], 3)).toEqual([]);
});

test("chunk throws on size <= 0", () => {
  expect(() => chunk([1, 2], 0)).toThrow("Chunk size must be greater than 0");
  expect(() => chunk([1, 2], -1)).toThrow("Chunk size must be greater than 0");
});

// unique
test("unique removes duplicate values", () => {
  expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
  expect(unique(["a", "b", "a"])).toEqual(["a", "b"]);
});

test("unique handles empty array", () => {
  expect(unique([])).toEqual([]);
});

test("unique preserves order", () => {
  expect(unique([3, 1, 2, 1, 3])).toEqual([3, 1, 2]);
});

// flatten
test("flatten flattens one level deep", () => {
  expect(flatten([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
  expect(flatten([1, [2, 3], 4])).toEqual([1, 2, 3, 4]);
});

test("flatten handles empty array", () => {
  expect(flatten([])).toEqual([]);
});

test("flatten does not flatten deeper than one level", () => {
  expect(flatten([[1, [2, 3]], [4]])).toEqual([1, [2, 3], 4]);
});

// groupBy
test("groupBy groups elements by key function", () => {
  const result = groupBy([1, 2, 3, 4, 5], (n) => (n % 2 === 0 ? "even" : "odd"));
  expect(result).toEqual({ odd: [1, 3, 5], even: [2, 4] });
});

test("groupBy handles empty array", () => {
  expect(groupBy([], () => "key")).toEqual({});
});

test("groupBy groups objects by property", () => {
  const items = [
    { type: "a", value: 1 },
    { type: "b", value: 2 },
    { type: "a", value: 3 },
  ];
  const result = groupBy(items, (item) => item.type);
  expect(result).toEqual({
    a: [
      { type: "a", value: 1 },
      { type: "a", value: 3 },
    ],
    b: [{ type: "b", value: 2 }],
  });
});
