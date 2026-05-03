import { expect, test } from "vitest";
import { chunk, flatten, groupBy, partition, sortBy, unique, zip } from "../array-utils.js";

test("unique - removes duplicates preserving order", () => {
  expect(unique([1, 2, 2, 3, 1, 4])).toEqual([1, 2, 3, 4]);
  expect(unique<string>([])).toEqual([]);
});

test("chunk - splits array into chunks of given size", () => {
  expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  expect(chunk([1, 2, 3, 4], 2)).toEqual([
    [1, 2],
    [3, 4],
  ]);
});

test("chunk - returns empty array for empty input", () => {
  expect(chunk([], 3)).toEqual([]);
});

test("chunk - throws when size <= 0", () => {
  expect(() => chunk([1, 2, 3], 0)).toThrow("Chunk size must be positive");
  expect(() => chunk([1, 2, 3], -1)).toThrow("Chunk size must be positive");
});

test("groupBy - groups items by key function", () => {
  const items = [
    { type: "a", v: 1 },
    { type: "b", v: 2 },
    { type: "a", v: 3 },
  ];
  expect(groupBy(items, (x) => x.type)).toEqual({
    a: [
      { type: "a", v: 1 },
      { type: "a", v: 3 },
    ],
    b: [{ type: "b", v: 2 }],
  });
});

test("groupBy - returns empty object for empty array", () => {
  expect(groupBy<number>([], () => "k")).toEqual({});
});

test("flatten - flattens one level of nested arrays", () => {
  expect(flatten<number>([1, [2, 3], 4, [5]])).toEqual([1, 2, 3, 4, 5]);
});

test("flatten - leaves already-flat arrays unchanged", () => {
  expect(flatten<number>([1, 2, 3])).toEqual([1, 2, 3]);
});

test("zip - pairs elements up to the shorter array's length", () => {
  expect(zip([1, 2, 3], ["a", "b", "c"])).toEqual([
    [1, "a"],
    [2, "b"],
    [3, "c"],
  ]);
  expect(zip([1, 2, 3, 4], ["a", "b"])).toEqual([
    [1, "a"],
    [2, "b"],
  ]);
});

test("zip - returns empty array when either input is empty", () => {
  expect(zip([], [1, 2])).toEqual([]);
  expect(zip([1, 2], [])).toEqual([]);
});

test("sortBy - sorts ascending by key function", () => {
  expect(sortBy([{ n: 3 }, { n: 1 }, { n: 2 }], (x) => x.n)).toEqual([{ n: 1 }, { n: 2 }, { n: 3 }]);
});

test("sortBy - does not mutate input", () => {
  const input = [3, 1, 2];
  sortBy(input, (n) => n);
  expect(input).toEqual([3, 1, 2]);
});

test("partition - splits into truthy and falsy buckets", () => {
  const [evens, odds] = partition([1, 2, 3, 4, 5], (n) => n % 2 === 0);
  expect(evens).toEqual([2, 4]);
  expect(odds).toEqual([1, 3, 5]);
});

test("partition - returns two empty arrays for empty input", () => {
  const [a, b] = partition<number>([], () => true);
  expect(a).toEqual([]);
  expect(b).toEqual([]);
});
