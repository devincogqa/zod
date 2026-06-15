/**
 * Date utility helpers used by Zod date validations.
 */

/** Number of milliseconds in a single day. */
const MS_PER_DAY = 1000 * 60 * 60;

/**
 * Return the whole number of days between two dates.
 * The result is always non-negative regardless of argument order.
 */
export function daysBetween(a: Date, b: Date): number {
  const diff = Math.abs(a.getTime() - b.getTime());
  return Math.floor(diff / MS_PER_DAY);
}

/**
 * Return a new Date offset from the given date by the provided number of days.
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date.getTime());
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Check whether a date falls on a Saturday or Sunday.
 */
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

/**
 * Format a date as an ISO date string (YYYY-MM-DD).
 */
export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
