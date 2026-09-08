import { describe, expect, it } from "vitest";
import { isPalindrome, toTitleCase, truncate, wordCount } from "../stringHelpers.js";

describe("isPalindrome", () => {
  it("detects simple palindromes", () => {
    expect(isPalindrome("racecar")).toBe(true);
  });

  it("is case-insensitive", () => {
    expect(isPalindrome("Racecar")).toBe(true);
  });

  it("ignores spaces and punctuation", () => {
    expect(isPalindrome("A man, a plan, a canal: Panama")).toBe(true);
  });

  it("returns false for non-palindromes", () => {
    expect(isPalindrome("hello")).toBe(false);
  });

  it("handles empty string", () => {
    expect(isPalindrome("")).toBe(true);
  });
});

describe("truncate", () => {
  it("truncates long strings with ellipsis", () => {
    expect(truncate("hello world", 8)).toBe("hello...");
  });

  it("returns original string if shorter than maxLen", () => {
    expect(truncate("hi", 10)).toBe("hi");
  });

  it("handles maxLen equal to string length", () => {
    expect(truncate("hello", 5)).toBe("hello");
  });

  it("handles maxLen < 3", () => {
    expect(truncate("hello", 2)).toBe("he");
  });

  it("handles maxLen of 0", () => {
    expect(truncate("hello", 0)).toBe("");
  });
});

describe("toTitleCase", () => {
  it("capitalizes first letter of each word", () => {
    expect(toTitleCase("hello world")).toBe("Hello World");
  });

  it("handles already title-cased string", () => {
    expect(toTitleCase("Hello World")).toBe("Hello World");
  });

  it("handles single word", () => {
    expect(toTitleCase("hello")).toBe("Hello");
  });
});

describe("wordCount", () => {
  it("counts words in a sentence", () => {
    expect(wordCount("hello world foo")).toBe(3);
  });

  it("handles multiple spaces", () => {
    expect(wordCount("  hello   world  ")).toBe(2);
  });

  it("returns 0 for empty string", () => {
    expect(wordCount("")).toBe(0);
  });

  it("handles single word", () => {
    expect(wordCount("hello")).toBe(1);
  });
});
