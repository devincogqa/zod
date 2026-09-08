import { describe, expect, test } from "vitest";

import { clamp, roundTo, isInRange, toFixedSafe, lerp, percentOf, sum, average } from "../number-utils.js";

describe("clamp", () => {
  test("returns value when within range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  test("clamps to min when below range", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  test("clamps to max when above range", () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  test("returns boundary values correctly", () => {
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });
});

describe("roundTo", () => {
  test("rounds to specified decimal places", () => {
    expect(roundTo(Math.PI, 2)).toBe(3.14);
    expect(roundTo(Math.PI, 0)).toBe(3);
  });

  test("handles zero decimals", () => {
    expect(roundTo(3.7, 0)).toBe(4);
  });
});

describe("isInRange", () => {
  test("returns true when value is in range", () => {
    expect(isInRange(5, 0, 10)).toBe(true);
  });

  test("returns true for boundary values", () => {
    expect(isInRange(0, 0, 10)).toBe(true);
    expect(isInRange(10, 0, 10)).toBe(true);
  });

  test("returns false when value is out of range", () => {
    expect(isInRange(-1, 0, 10)).toBe(false);
    expect(isInRange(11, 0, 10)).toBe(false);
  });
});

describe("toFixedSafe", () => {
  test("formats finite numbers", () => {
    expect(toFixedSafe(Math.PI, 2)).toBe("3.14");
  });

  test("handles non-finite values", () => {
    expect(toFixedSafe(Number.POSITIVE_INFINITY, 2)).toBe("Infinity");
    expect(toFixedSafe(Number.NaN, 2)).toBe("NaN");
  });
});

describe("lerp", () => {
  test("interpolates between two values", () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
    expect(lerp(0, 10, 0)).toBe(0);
    expect(lerp(0, 10, 1)).toBe(10);
  });
});

describe("percentOf", () => {
  test("calculates percentage", () => {
    expect(percentOf(25, 100)).toBe(25);
    expect(percentOf(1, 2)).toBe(50);
  });

  test("returns 0 when total is 0", () => {
    expect(percentOf(5, 0)).toBe(0);
  });
});

describe("sum", () => {
  test("sums values", () => {
    expect(sum([1, 2, 3, 4])).toBe(10);
  });

  test("returns 0 for empty array", () => {
    expect(sum([])).toBe(0);
  });
});

describe("average", () => {
  test("calculates average", () => {
    expect(average([2, 4, 6])).toBe(4);
  });

  test("returns 0 for empty array", () => {
    expect(average([])).toBe(0);
  });
});
