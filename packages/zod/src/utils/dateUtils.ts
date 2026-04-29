/**
 * Date utility helpers for Zod date-related validations and formatting.
 */

/**
 * Return the number of whole days between two dates.
 */
export function daysBetween(a: Date, b: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffMs = b.getTime() - a.getTime();
  return Math.floor(diffMs / msPerDay);
}

/**
 * Check whether a date falls within a given range (inclusive).
 */
export function isDateInRange(date: Date, start: Date, end: Date): boolean {
  const t = date.getTime();
  return t >= start.getTime() && t <= end.getTime();
}

/**
 * Format a Date as an ISO-8601 date string (YYYY-MM-DD).
 */
export function toISODateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Add a given number of days to a date, returning a new Date instance.
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
