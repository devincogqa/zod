import { expect, test } from "vitest";

import {
  chunk,
  difference,
  flatten,
  groupBy,
  intersection,
  keyBy,
  last,
  partition,
  unique,
  zip,
} from "../utils/collection-helpers.js";

test("unique removes duplicates", () => {
  expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
  expect(unique<string>([])).toEqual([]);
  expect(unique(["a", "b", "a"])).toEqual(["a", "b"]);
});

test("chunk splits array into groups", () => {
  expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
  expect(chunk<number>([], 3)).toEqual([]);
  expect(chunk([1], 5)).toEqual([[1]]);
});

test("chunk throws for non-positive size", () => {
  expect(() => chunk([1, 2], 0)).toThrow("Chunk size must be positive");
  expect(() => chunk([1, 2], -1)).toThrow("Chunk size must be positive");
});

test("groupBy groups by key function", () => {
  const items = [
    { type: "a", v: 1 },
    { type: "b", v: 2 },
    { type: "a", v: 3 },
  ];
  expect(groupBy(items, (i) => i.type)).toEqual({
    a: [
      { type: "a", v: 1 },
      { type: "a", v: 3 },
    ],
    b: [{ type: "b", v: 2 }],
  });
  expect(groupBy<number, string>([], () => "x")).toEqual({});
});

test("intersection returns common elements", () => {
  expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
  expect(intersection([1, 2], [3, 4])).toEqual([]);
  expect(intersection<number>([], [1])).toEqual([]);
});

test("difference returns elements in a not in b", () => {
  expect(difference([1, 2, 3], [2])).toEqual([1, 3]);
  expect(difference([1, 2], [1, 2])).toEqual([]);
  expect(difference<number>([], [1])).toEqual([]);
});

test("flatten flattens one level", () => {
  expect(flatten([[1, 2], [3], [4, 5]])).toEqual([1, 2, 3, 4, 5]);
  expect(flatten([1, [2, 3], 4])).toEqual([1, 2, 3, 4]);
  expect(flatten<number>([])).toEqual([]);
});

test("keyBy creates a map keyed by function", () => {
  const items = [
    { id: "a", v: 1 },
    { id: "b", v: 2 },
  ];
  const map = keyBy(items, (i) => i.id);
  expect(map.get("a")).toEqual({ id: "a", v: 1 });
  expect(map.get("b")).toEqual({ id: "b", v: 2 });
  expect(map.size).toBe(2);
});

test("keyBy keeps last value on duplicate keys", () => {
  const items = [
    { id: "a", v: 1 },
    { id: "a", v: 2 },
  ];
  const map = keyBy(items, (i) => i.id);
  expect(map.get("a")).toEqual({ id: "a", v: 2 });
  expect(map.size).toBe(1);
});

test("zip pairs elements and truncates", () => {
  expect(zip([1, 2, 3], ["a", "b", "c"])).toEqual([
    [1, "a"],
    [2, "b"],
    [3, "c"],
  ]);
  expect(zip([1, 2, 3], ["a"])).toEqual([[1, "a"]]);
  expect(zip<number, string>([], ["a"])).toEqual([]);
});

test("last returns last element or undefined", () => {
  expect(last([1, 2, 3])).toBe(3);
  expect(last(["only"])).toBe("only");
  expect(last<number>([])).toBeUndefined();
});

test("partition splits by predicate", () => {
  expect(partition([1, 2, 3, 4], (n) => n % 2 === 0)).toEqual([
    [2, 4],
    [1, 3],
  ]);
  expect(partition<number>([], () => true)).toEqual([[], []]);
  expect(partition([1, 2], () => true)).toEqual([[1, 2], []]);
});
