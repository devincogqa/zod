import { describe, expect, it } from "vitest";
import { formatDate, daysBetween, addDays, isLeapYear, timeAgo } from "../dateUtils.js";

describe("dateUtils", () => {
  describe("formatDate", () => {
    it("formats a date as YYYY-MM-DD", () => {
      const date = new Date(2024, 0, 15);
      expect(formatDate(date)).toBe("2024-01-15");
    });

    it("pads single-digit month and day", () => {
      const date = new Date(2024, 2, 5);
      expect(formatDate(date)).toBe("2024-03-05");
    });

    it("handles end of year", () => {
      const date = new Date(2024, 11, 31);
      expect(formatDate(date)).toBe("2024-12-31");
    });
  });

  describe("daysBetween", () => {
    it("calculates days between two dates", () => {
      const a = new Date(2024, 0, 1);
      const b = new Date(2024, 0, 10);
      expect(daysBetween(a, b)).toBe(9);
    });

    it("returns 0 for same date", () => {
      const date = new Date(2024, 0, 1);
      expect(daysBetween(date, date)).toBe(0);
    });

    it("is symmetric (order does not matter)", () => {
      const a = new Date(2024, 0, 1);
      const b = new Date(2024, 0, 10);
      expect(daysBetween(a, b)).toBe(daysBetween(b, a));
    });
  });

  describe("addDays", () => {
    it("adds days to a date", () => {
      const date = new Date(2024, 0, 1);
      const result = addDays(date, 5);
      expect(formatDate(result)).toBe("2024-01-06");
    });

    it("does not mutate the original date", () => {
      const date = new Date(2024, 0, 1);
      addDays(date, 5);
      expect(formatDate(date)).toBe("2024-01-01");
    });

    it("handles negative days", () => {
      const date = new Date(2024, 0, 10);
      const result = addDays(date, -5);
      expect(formatDate(result)).toBe("2024-01-05");
    });

    it("handles month boundary", () => {
      const date = new Date(2024, 0, 30);
      const result = addDays(date, 5);
      expect(formatDate(result)).toBe("2024-02-04");
    });
  });

  describe("isLeapYear", () => {
    it("returns true for leap years", () => {
      expect(isLeapYear(2024)).toBe(true);
      expect(isLeapYear(2000)).toBe(true);
    });

    it("returns false for non-leap years", () => {
      expect(isLeapYear(2023)).toBe(false);
      expect(isLeapYear(1900)).toBe(false);
    });

    it("handles century years", () => {
      expect(isLeapYear(1900)).toBe(false);
      expect(isLeapYear(2000)).toBe(true);
    });
  });

  describe("timeAgo", () => {
    it("returns seconds ago for recent dates", () => {
      const date = new Date(Date.now() - 30 * 1000);
      expect(timeAgo(date)).toBe("30 seconds ago");
    });

    it("returns minutes ago", () => {
      const date = new Date(Date.now() - 5 * 60 * 1000);
      expect(timeAgo(date)).toBe("5 minutes ago");
    });

    it("returns hours ago", () => {
      const date = new Date(Date.now() - 3 * 60 * 60 * 1000);
      expect(timeAgo(date)).toBe("3 hours ago");
    });

    it("returns days ago", () => {
      const date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      expect(timeAgo(date)).toBe("7 days ago");
    });
  });
});
