/**
 * Date utility helpers for Zod date schema validation.
 */

/**
 * Check if a date is after another date.
 */
export function isAfter(date: Date, compareDate: Date): boolean {
  return date.getTime() > compareDate.getTime();
}

/**
 * Check if a date is before another date.
 */
export function isBefore(date: Date, compareDate: Date): boolean {
  return date.getTime() < compareDate.getTime();
}

/**
 * Check if a date falls within a given range (inclusive).
 */
export function isWithinRange(date: Date, start: Date, end: Date): boolean {
  const time = date.getTime();
  return time >= start.getTime() && time <= end.getTime();
}

/**
 * Get the difference between two dates in days.
 */
export function diffInDays(dateA: Date, dateB: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diff = dateA.getTime() - dateB.getTime();
  return Math.floor(diff / msPerDay);
}

/**
 * Format a date as ISO string without time component (YYYY-MM-DD).
 */
export function toDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
