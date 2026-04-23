import { describe, expect, it } from "vitest";
import { deepMerge, omit, pick } from "../objectHelpers.js";

describe("deepMerge", () => {
  it("merges flat objects", () => {
    expect(deepMerge({ a: 1, b: 2 }, { b: 3, c: 4 })).toEqual({ a: 1, b: 3, c: 4 });
  });

  it("deep-merges nested objects", () => {
    const target = { a: { x: 1, y: 2 }, b: 1 };
    const source = { a: { y: 3, z: 4 } };
    expect(deepMerge(target, source)).toEqual({ a: { x: 1, y: 3, z: 4 }, b: 1 });
  });

  it("replaces arrays instead of concatenating", () => {
    expect(deepMerge({ a: [1, 2] }, { a: [3] })).toEqual({ a: [3] });
  });

  it("handles null values in source", () => {
    expect(deepMerge({ a: 1, b: 2 }, { b: null as unknown as number })).toEqual({ a: 1, b: null });
  });
});

describe("pick", () => {
  it("picks specified keys", () => {
    expect(pick({ a: 1, b: 2, c: 3 }, ["a", "c"])).toEqual({ a: 1, c: 3 });
  });

  it("returns empty object for empty keys", () => {
    expect(pick({ a: 1 }, [])).toEqual({});
  });
});

describe("omit", () => {
  it("omits specified keys", () => {
    expect(omit({ a: 1, b: 2, c: 3 }, ["b"])).toEqual({ a: 1, c: 3 });
  });

  it("returns full object for empty keys", () => {
    expect(omit({ a: 1, b: 2 }, [])).toEqual({ a: 1, b: 2 });
  });
});
