/**
 * String utility helpers for schema validation messages.
 */

/** Capitalizes the first letter of a string */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Truncates a string to a max length, adding ellipsis if needed */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}

/** Converts a camelCase string to snake_case */
export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/** Converts a snake_case string to camelCase */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/** Pads a string from the start to reach the target length */
export function padStart(str: string, targetLength: number, padChar: string = " "): string {
  if (str.length >= targetLength) return str;
  const padding = padChar.repeat(targetLength - str.length);
  return padding + str;
}
