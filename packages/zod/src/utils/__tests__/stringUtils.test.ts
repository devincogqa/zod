import { describe, expect, it } from "vitest";
import { capitalize, reverseString, truncate, isPalindrome, countOccurrences } from "../stringUtils.js";

describe("stringUtils", () => {
  describe("capitalize", () => {
    it("capitalizes the first letter", () => {
      expect(capitalize("hello")).toBe("Hello");
    });

    it("returns empty string for empty input", () => {
      expect(capitalize("")).toBe("");
    });

    it("handles already capitalized strings", () => {
      expect(capitalize("Hello")).toBe("Hello");
    });

    it("handles single character strings", () => {
      expect(capitalize("a")).toBe("A");
    });
  });

  describe("reverseString", () => {
    it("reverses a string", () => {
      expect(reverseString("hello")).toBe("olleh");
    });

    it("returns empty string for empty input", () => {
      expect(reverseString("")).toBe("");
    });

    it("handles single character", () => {
      expect(reverseString("a")).toBe("a");
    });

    it("handles palindromes", () => {
      expect(reverseString("racecar")).toBe("racecar");
    });
  });

  describe("truncate", () => {
    it("truncates strings longer than maxLength", () => {
      expect(truncate("hello world", 8)).toBe("hello...");
    });

    it("returns original string if shorter than maxLength", () => {
      expect(truncate("hi", 10)).toBe("hi");
    });

    it("returns original string if exactly at maxLength", () => {
      expect(truncate("hello", 5)).toBe("hello");
    });

    it("handles very short maxLength", () => {
      expect(truncate("hello world", 4)).toBe("h...");
    });

    it("handles maxLength less than 3", () => {
      expect(truncate("hello world", 2)).toBe("..");
      expect(truncate("hello world", 1)).toBe(".");
      expect(truncate("hello world", 0)).toBe("");
    });

    it("handles maxLength equal to 3", () => {
      expect(truncate("hello world", 3)).toBe("...");
    });
  });

  describe("isPalindrome", () => {
    it("detects palindromes", () => {
      expect(isPalindrome("racecar")).toBe(true);
    });

    it("is case-insensitive", () => {
      expect(isPalindrome("Racecar")).toBe(true);
    });

    it("ignores non-alphanumeric characters", () => {
      expect(isPalindrome("A man, a plan, a canal: Panama")).toBe(true);
    });

    it("returns false for non-palindromes", () => {
      expect(isPalindrome("hello")).toBe(false);
    });

    it("handles empty string", () => {
      expect(isPalindrome("")).toBe(true);
    });
  });

  describe("countOccurrences", () => {
    it("counts occurrences of a substring", () => {
      expect(countOccurrences("hello hello hello", "hello")).toBe(3);
    });

    it("returns 0 when substring not found", () => {
      expect(countOccurrences("hello", "xyz")).toBe(0);
    });

    it("returns 0 for empty substring", () => {
      expect(countOccurrences("hello", "")).toBe(0);
    });

    it("handles overlapping potential matches (non-overlapping count)", () => {
      expect(countOccurrences("aaa", "aa")).toBe(1);
    });

    it("handles single character substring", () => {
      expect(countOccurrences("banana", "a")).toBe(3);
    });
  });
});
