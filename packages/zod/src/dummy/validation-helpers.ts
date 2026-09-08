/** Dummy validation helpers for review-flow testing. */

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function isPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

export function clamp(value: number, min: number, max: number): number {
  if (min > max) throw new Error("min must be <= max");
  return Math.min(Math.max(value, min), max);
}

export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}
