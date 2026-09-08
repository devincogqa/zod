import { describe, expect, it } from "vitest";
import { chunk, flatten, lastN, unique } from "../arrayHelpers.js";

describe("chunk", () => {
  it("splits array into chunks of given size", () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
  });

  it("handles remainder elements", () => {
    expect(chunk([1, 2, 3], 2)).toEqual([[1, 2], [3]]);
  });

  it("returns empty array for empty input", () => {
    expect(chunk([], 3)).toEqual([]);
  });

  it("handles size larger than array", () => {
    expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
  });

  it("handles size of 1", () => {
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });

  it("throws for size <= 0", () => {
    expect(() => chunk([1, 2], 0)).toThrow();
    expect(() => chunk([1, 2], -1)).toThrow();
  });
});

describe("unique", () => {
  it("removes duplicates", () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
  });

  it("preserves insertion order", () => {
    expect(unique([3, 1, 2, 1, 3])).toEqual([3, 1, 2]);
  });

  it("returns empty array for empty input", () => {
    expect(unique([])).toEqual([]);
  });
});

describe("flatten", () => {
  it("flattens one level of nesting", () => {
    expect(flatten([[1, 2], [3], [4, 5]])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles empty inner arrays", () => {
    expect(flatten([[], [1], []])).toEqual([1]);
  });

  it("returns empty array for empty input", () => {
    expect(flatten([])).toEqual([]);
  });
});

describe("lastN", () => {
  it("returns last N elements", () => {
    expect(lastN([1, 2, 3, 4, 5], 3)).toEqual([3, 4, 5]);
  });

  it("returns full array when n > length", () => {
    expect(lastN([1, 2], 5)).toEqual([1, 2]);
  });

  it("returns empty array for n = 0", () => {
    expect(lastN([1, 2, 3], 0)).toEqual([]);
  });

  it("returns empty array for negative n", () => {
    expect(lastN([1, 2, 3], -1)).toEqual([]);
  });
});
