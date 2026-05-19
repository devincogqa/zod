/**
 * Date utility helpers for Zod date/time validations.
 */

/**
 * Check if a given year is a leap year.
 */
export function isLeapYear(year: number): boolean {
  return year % 4 === 0 && year % 100 !== 0;
}

/**
 * Return the number of days in a given month (1-indexed).
 */
export function daysInMonth(month: number, year: number): number {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && isLeapYear(year)) {
    return 29;
  }
  return days[month - 1];
}

/**
 * Format a Date object as an ISO 8601 date string (YYYY-MM-DD).
 */
export function formatISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Parse an ISO 8601 date string (YYYY-MM-DD) and return a Date object.
 * Returns null if the string is not a valid date.
 */
export function parseISODate(dateStr: string): Date | null {
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);

  if (month < 1 || month > 12) return null;
  if (day < 1 || day > daysInMonth(month, year)) return null;

  return new Date(year, month - 1, day);
}

/**
 * Calculate the difference in days between two dates.
 */
export function diffInDays(a: Date, b: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diff = a.getTime() - b.getTime();
  return Math.floor(diff / msPerDay);
}
