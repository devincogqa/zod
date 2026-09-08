import { describe, expect, it } from "vitest";
import { average, clamp, gcd, lcm } from "../mathHelpers.js";

describe("clamp", () => {
  it("returns value when within range", () => {
    expect(clamp(5, 1, 10)).toBe(5);
  });

  it("clamps to min when below", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it("clamps to max when above", () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });
});

describe("average", () => {
  it("calculates average of numbers", () => {
    expect(average([1, 2, 3, 4])).toBe(2.5);
  });

  it("returns 0 for empty array", () => {
    expect(average([])).toBe(0);
  });

  it("handles single element", () => {
    expect(average([7])).toBe(7);
  });
});

describe("gcd", () => {
  it("calculates gcd of two positive integers", () => {
    expect(gcd(12, 8)).toBe(4);
  });

  it("handles zero inputs", () => {
    expect(gcd(0, 5)).toBe(5);
    expect(gcd(5, 0)).toBe(5);
  });

  it("handles negative inputs", () => {
    expect(gcd(-12, 8)).toBe(4);
  });
});

describe("lcm", () => {
  it("calculates lcm of two positive integers", () => {
    expect(lcm(4, 6)).toBe(12);
  });

  it("returns 0 when either input is 0", () => {
    expect(lcm(0, 5)).toBe(0);
    expect(lcm(5, 0)).toBe(0);
  });

  it("handles negative inputs", () => {
    expect(lcm(-4, 6)).toBe(12);
  });
});
