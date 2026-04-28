/**
 * String utility helpers for schema validation messages.
 */

export function truncateString(input: string, maxLength: number): string {
  if (input.length <= maxLength) {
    return input;
  }
  return input.slice(0, maxLength) + "...";
}

export function capitalizeFirst(input: string): string {
  if (input.length === 0) return input;
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function camelToSnakeCase(input: string): string {
  return input.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function snakeToCamelCase(input: string): string {
  return input.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function pluralize(word: string, count: number): string {
  if (count > 1) {
    return word + "s";
  }
  return word;
}

export function formatValidationPath(segments: (string | number)[]): string {
  return segments.map((seg) => (typeof seg === "number" ? `[${seg}]` : seg)).join(".");
}
