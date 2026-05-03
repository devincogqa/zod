import { describe, expect, test } from "vitest";

import { uniqueBy, chunk, flatten, groupBy, findLastIndex, compact, zip } from "../array-utils.js";

describe("uniqueBy", () => {
  test("removes duplicates based on key function", () => {
    const items = [
      { id: 1, name: "a" },
      { id: 2, name: "b" },
      { id: 1, name: "c" },
    ];
    expect(uniqueBy(items, (i) => String(i.id))).toEqual([
      { id: 1, name: "a" },
      { id: 2, name: "b" },
    ]);
  });

  test("returns empty array for empty input", () => {
    expect(uniqueBy([], (i) => String(i))).toEqual([]);
  });
});

describe("chunk", () => {
  test("splits array into chunks", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  test("handles exact divisible lengths", () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  test("returns empty array for empty input", () => {
    expect(chunk([], 3)).toEqual([]);
  });

  test("throws when size is zero", () => {
    expect(() => chunk([1, 2], 0)).toThrow();
  });

  test("throws when size is negative", () => {
    expect(() => chunk([1, 2], -1)).toThrow();
  });
});

describe("flatten", () => {
  test("flattens nested arrays", () => {
    expect(flatten([[1, 2], [3], [4, 5]])).toEqual([1, 2, 3, 4, 5]);
  });

  test("handles empty inner arrays", () => {
    expect(flatten([[], [1], []])).toEqual([1]);
  });

  test("returns empty array for empty input", () => {
    expect(flatten([])).toEqual([]);
  });
});

describe("groupBy", () => {
  test("groups items by key function", () => {
    const items = ["apple", "avocado", "banana", "blueberry"];
    expect(groupBy(items, (s) => s[0])).toEqual({
      a: ["apple", "avocado"],
      b: ["banana", "blueberry"],
    });
  });

  test("returns empty object for empty input", () => {
    expect(groupBy([], (i) => String(i))).toEqual({});
  });
});

describe("findLastIndex", () => {
  test("finds last matching index", () => {
    expect(findLastIndex([1, 2, 3, 2, 1], (n) => n === 2)).toBe(3);
  });

  test("returns -1 when no match", () => {
    expect(findLastIndex([1, 2, 3], (n) => n === 5)).toBe(-1);
  });

  test("returns -1 for empty array", () => {
    expect(findLastIndex([], () => true)).toBe(-1);
  });

  test("finds last element correctly", () => {
    expect(findLastIndex([1, 2, 3], (n) => n === 3)).toBe(2);
  });

  test("finds first element correctly", () => {
    expect(findLastIndex([1, 2, 3], (n) => n === 1)).toBe(0);
  });
});

describe("compact", () => {
  test("removes null and undefined values", () => {
    expect(compact([1, null, 2, undefined, 3])).toEqual([1, 2, 3]);
  });

  test("preserves falsy values like 0 and empty string", () => {
    expect(compact([0, "", false, null, undefined])).toEqual([0, "", false]);
  });

  test("returns empty array for all nullish input", () => {
    expect(compact([null, undefined])).toEqual([]);
  });
});

describe("zip", () => {
  test("zips two arrays together", () => {
    expect(zip([1, 2, 3], ["a", "b", "c"])).toEqual([
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ]);
  });

  test("truncates to shorter array", () => {
    expect(zip([1, 2], ["a", "b", "c"])).toEqual([
      [1, "a"],
      [2, "b"],
    ]);
  });

  test("returns empty array when either input is empty", () => {
    expect(zip([], ["a", "b"])).toEqual([]);
  });
});
