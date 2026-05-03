/**
 * Date utility helpers for Zod date/time validations.
 */

/**
 * Check if a value is a valid Date instance (not Invalid Date).
 */
export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

/**
 * Return the number of whole days between two dates.
 */
export function daysBetween(start: Date, end: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffMs = end.getTime() - start.getTime();
  return Math.floor(diffMs / msPerDay);
}

/**
 * Check if a date falls within a range (inclusive).
 */
export function isDateInRange(date: Date, min: Date, max: Date): boolean {
  const ts = date.getTime();
  return ts >= min.getTime() && ts <= max.getTime();
}

/**
 * Format a Date as an ISO date string (YYYY-MM-DD).
 */
export function toISODateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Parse a YYYY-MM-DD string into a Date object.
 * Returns null if the string is not a valid date.
 */
export function parseISODate(str: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  if (Number.isNaN(date.getTime())) return null;
  return date;
}
