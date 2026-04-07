import { describe, expect, it } from "vitest";
import { deepClone, pick, omit, merge, isEmpty } from "../objectUtils.js";

describe("objectUtils", () => {
  describe("deepClone", () => {
    it("creates a deep copy of an object", () => {
      const original = { a: 1, b: { c: 2 } };
      const cloned = deepClone(original);
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.b).not.toBe(original.b);
    });

    it("handles arrays", () => {
      const original = { items: [1, 2, 3] };
      const cloned = deepClone(original);
      expect(cloned).toEqual(original);
      cloned.items.push(4);
      expect(original.items).toEqual([1, 2, 3]);
    });

    it("handles nested structures", () => {
      const original = { a: { b: { c: { d: 1 } } } };
      const cloned = deepClone(original);
      expect(cloned).toEqual(original);
    });
  });

  describe("pick", () => {
    it("picks specified keys", () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(pick(obj, ["a", "c"])).toEqual({ a: 1, c: 3 });
    });

    it("ignores keys not in object", () => {
      const obj = { a: 1, b: 2 } as Record<string, unknown>;
      expect(pick(obj, ["a", "z"])).toEqual({ a: 1 });
    });

    it("returns empty object for empty keys", () => {
      const obj = { a: 1, b: 2 };
      expect(pick(obj, [])).toEqual({});
    });
  });

  describe("omit", () => {
    it("omits specified keys", () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(omit(obj, ["b"])).toEqual({ a: 1, c: 3 });
    });

    it("returns full object if no keys to omit", () => {
      const obj = { a: 1, b: 2 };
      expect(omit(obj, [])).toEqual({ a: 1, b: 2 });
    });

    it("handles omitting all keys", () => {
      const obj = { a: 1, b: 2 };
      expect(omit(obj, ["a", "b"])).toEqual({});
    });
  });

  describe("merge", () => {
    it("merges multiple objects", () => {
      const result = merge<Record<string, number>>({ a: 1 }, { b: 2 }, { c: 3 });
      expect(result).toEqual({ a: 1, b: 2, c: 3 });
    });

    it("later objects override earlier ones", () => {
      const result = merge<Record<string, number>>({ a: 1, b: 2 }, { b: 3, c: 4 });
      expect(result).toEqual({ a: 1, b: 3, c: 4 });
    });

    it("returns empty object with no arguments", () => {
      const result = merge();
      expect(result).toEqual({});
    });
  });

  describe("isEmpty", () => {
    it("returns true for empty object", () => {
      expect(isEmpty({})).toBe(true);
    });

    it("returns false for non-empty object", () => {
      expect(isEmpty({ a: 1 })).toBe(false);
    });

    it("returns false for object with falsy values", () => {
      expect(isEmpty({ a: 0, b: null, c: undefined })).toBe(false);
    });
  });
});
