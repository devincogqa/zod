import { describe, expect, it } from "vitest";
import { unique, chunk, flatten, intersection, groupBy, zip } from "../arrayUtils.js";

describe("arrayUtils", () => {
  describe("unique", () => {
    it("removes duplicate values", () => {
      expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    });

    it("returns empty array for empty input", () => {
      expect(unique([])).toEqual([]);
    });

    it("handles arrays with no duplicates", () => {
      expect(unique([1, 2, 3])).toEqual([1, 2, 3]);
    });

    it("works with strings", () => {
      expect(unique(["a", "b", "a"])).toEqual(["a", "b"]);
    });
  });

  describe("chunk", () => {
    it("splits array into chunks of given size", () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    it("handles array length divisible by size", () => {
      expect(chunk([1, 2, 3, 4], 2)).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    it("returns empty array for empty input", () => {
      expect(chunk([], 3)).toEqual([]);
    });

    it("throws on zero size", () => {
      expect(() => chunk([1, 2, 3], 0)).toThrow("chunk size must be a positive number");
    });

    it("throws on negative size", () => {
      expect(() => chunk([1, 2, 3], -1)).toThrow("chunk size must be a positive number");
    });
  });

  describe("flatten", () => {
    it("flattens nested arrays by one level", () => {
      expect(flatten([[1, 2], [3, 4], [5]])).toEqual([1, 2, 3, 4, 5]);
    });

    it("returns empty array for empty input", () => {
      expect(flatten([])).toEqual([]);
    });

    it("handles arrays with empty sub-arrays", () => {
      expect(flatten([[1], [], [2, 3]])).toEqual([1, 2, 3]);
    });
  });

  describe("intersection", () => {
    it("returns common elements", () => {
      expect(intersection([1, 2, 3, 4], [2, 4, 6])).toEqual([2, 4]);
    });

    it("returns empty array when no common elements", () => {
      expect(intersection([1, 2], [3, 4])).toEqual([]);
    });

    it("returns empty array for empty inputs", () => {
      expect(intersection([], [1, 2])).toEqual([]);
    });

    it("works with strings", () => {
      expect(intersection(["a", "b", "c"], ["b", "c", "d"])).toEqual(["b", "c"]);
    });
  });

  describe("groupBy", () => {
    it("groups elements by key function", () => {
      const result = groupBy([1, 2, 3, 4, 5], (n) => (n % 2 === 0 ? "even" : "odd"));
      expect(result).toEqual({ odd: [1, 3, 5], even: [2, 4] });
    });

    it("returns empty object for empty input", () => {
      expect(groupBy([], (x: number) => x)).toEqual({});
    });

    it("groups objects by property", () => {
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
  });

  describe("zip", () => {
    it("zips two arrays of equal length", () => {
      expect(zip([1, 2, 3], ["a", "b", "c"])).toEqual([
        [1, "a"],
        [2, "b"],
        [3, "c"],
      ]);
    });

    it("truncates to shorter array length", () => {
      expect(zip([1, 2, 3], ["a"])).toEqual([[1, "a"]]);
    });

    it("returns empty array when one input is empty", () => {
      expect(zip([], ["a", "b"])).toEqual([]);
    });

    it("returns empty array when both inputs are empty", () => {
      expect(zip([], [])).toEqual([]);
    });
  });
});
