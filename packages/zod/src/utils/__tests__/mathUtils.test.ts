import { describe, expect, it } from "vitest";
import { clamp, average, gcd, isPrime, randomInt } from "../mathUtils.js";

describe("mathUtils", () => {
  describe("clamp", () => {
    it("clamps value below minimum", () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    it("clamps value above maximum", () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it("returns value within range", () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });

    it("handles value at boundaries", () => {
      expect(clamp(0, 0, 10)).toBe(0);
      expect(clamp(10, 0, 10)).toBe(10);
    });
  });

  describe("average", () => {
    it("calculates average of numbers", () => {
      expect(average([2, 4, 6])).toBe(4);
    });

    it("returns 0 for empty array", () => {
      expect(average([])).toBe(0);
    });

    it("handles single element", () => {
      expect(average([5])).toBe(5);
    });

    it("handles negative numbers", () => {
      expect(average([-2, 2])).toBe(0);
    });

    it("handles decimal results", () => {
      expect(average([1, 2])).toBe(1.5);
    });
  });

  describe("gcd", () => {
    it("finds GCD of two numbers", () => {
      expect(gcd(12, 8)).toBe(4);
    });

    it("handles coprime numbers", () => {
      expect(gcd(7, 13)).toBe(1);
    });

    it("handles one zero value", () => {
      expect(gcd(5, 0)).toBe(5);
      expect(gcd(0, 5)).toBe(5);
    });

    it("handles negative numbers", () => {
      expect(gcd(-12, 8)).toBe(4);
    });

    it("handles equal numbers", () => {
      expect(gcd(6, 6)).toBe(6);
    });
  });

  describe("isPrime", () => {
    it("returns true for prime numbers", () => {
      expect(isPrime(2)).toBe(true);
      expect(isPrime(3)).toBe(true);
      expect(isPrime(7)).toBe(true);
      expect(isPrime(13)).toBe(true);
    });

    it("returns false for non-prime numbers", () => {
      expect(isPrime(1)).toBe(false);
      expect(isPrime(4)).toBe(false);
      expect(isPrime(9)).toBe(false);
    });

    it("returns false for numbers less than 2", () => {
      expect(isPrime(0)).toBe(false);
      expect(isPrime(-1)).toBe(false);
    });

    it("handles large primes", () => {
      expect(isPrime(97)).toBe(true);
      expect(isPrime(100)).toBe(false);
    });
  });

  describe("randomInt", () => {
    it("returns a number within range", () => {
      for (let i = 0; i < 100; i++) {
        const result = randomInt(1, 10);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(10);
      }
    });

    it("returns integer values", () => {
      const result = randomInt(1, 100);
      expect(Number.isInteger(result)).toBe(true);
    });

    it("handles min equal to max", () => {
      expect(randomInt(5, 5)).toBe(5);
    });
  });
});
