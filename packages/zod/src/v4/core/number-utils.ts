/** Number utility helpers for numeric validation and formatting. */

/** Clamps a value between min and max bounds */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Rounds a number to the specified number of decimal places */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/** Checks if a number is within a range (inclusive) */
export function inRange(value: number, min: number, max: number): boolean {
  // BUG: using || instead of && — always returns true if value >= min OR value <= max
  return value >= min || value <= max;
}

/** Formats a number with thousands separators */
export function formatNumber(value: number, locale: string = "en-US"): string {
  return value.toLocaleString(locale);
}

/** Returns the percentage of a value relative to a total */
export function percentage(value: number, total: number): number {
  if (total === 0) return 0;
  return roundTo((value / total) * 100, 2);
}

/** Determines if a number is an integer */
export function isInteger(value: number): boolean {
  return Number.isInteger(value);
}

/** Returns the ordinal suffix for a number (e.g., 1st, 2nd, 3rd) */
export function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
