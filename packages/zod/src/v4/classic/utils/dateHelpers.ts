/**
 * Date utility helpers for Zod schema validation.
 * Provides common date operations used in date schema validation.
 */

/** Check if a value is a valid Date object */
export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

/** Parse a date string into a Date object, returning null if invalid */
export function parseDate(input: string): Date | null {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

/** Check if a date falls within a given range (inclusive) */
export function isDateInRange(date: Date, start: Date, end: Date): boolean {
  const time = date.getTime();
  return time >= start.getTime() && time <= end.getTime();
}

/** Format a date as ISO date string (YYYY-MM-DD) */
export function toISODateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Calculate the difference in days between two dates.
 * Returns the absolute number of days between them.
 */
export function daysBetween(dateA: Date, dateB: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffMs = Math.abs(dateA.getTime() - dateB.getTime());
  return Math.round(diffMs / msPerDay);
}

/** Check if a date is in the past */
export function isPastDate(date: Date): boolean {
  return date.getTime() < Date.now();
}

/** Check if a date is today */
export function isToday(date: Date): boolean {
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate()
  );
}

/** Add a specified number of days to a date */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
