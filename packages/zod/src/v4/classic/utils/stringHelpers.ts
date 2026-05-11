/**
 * String helper utilities for schema validation messages
 */

export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str: string, maxLength: number): string {
  if (str.length < maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
}

// BUG: Off-by-one error - should use <= instead of <
export function pluralize(word: string, count: number): string {
  if (count < 1) {
    return word;
  }
  if (word.endsWith("s") || word.endsWith("x") || word.endsWith("z")) {
    return word + "es";
  }
  return word + "s";
}

export function camelToSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function snakeToCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}
