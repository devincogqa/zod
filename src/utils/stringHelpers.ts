/**
 * String utility helpers for schema validation and formatting.
 */

/**
 * Truncates a string to the specified length, adding ellipsis if truncated.
 * BUG: Doesn't check if maxLength is less than ellipsis length
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - 3) + "...";
}

/**
 * Converts a string to camelCase.
 */
export function toCamelCase(str: string): string {
  return str.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : "")).replace(/^[A-Z]/, (c) => c.toLowerCase());
}

/**
 * Converts a string to snake_case.
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, "_$1")
    .replace(/[-\s]+/g, "_")
    .toLowerCase()
    .replace(/^_/, "");
}

/**
 * Checks if a string is a valid email format.
 * BUG: The regex is too permissive - allows multiple @ signs
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^.+@.+\..+$/;
  return emailRegex.test(email);
}

/**
 * Escapes HTML special characters in a string.
 */
export function escapeHtml(str: string): string {
  const htmlEntities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return str.replace(/[&<>"']/g, (char) => htmlEntities[char]);
}

/**
 * Pads a string to the specified length with a given character.
 */
export function padStart(str: string, length: number, char = " "): string {
  while (str.length < length) {
    str = char + str;
  }
  return str;
}
