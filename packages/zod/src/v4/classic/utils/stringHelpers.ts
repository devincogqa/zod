/**
 * String utility helpers for validation and transformation
 * operations within the Zod schema pipeline.
 */

/**
 * Validates whether a string is a valid email address.
 * @param email - The string to validate
 * @returns true if the string is a valid email
 */
export function isValidEmail(email: string): boolean {
  // BUG: Regex is too permissive - allows multiple @ signs and missing TLD
  const emailRegex = /^[^\s@]+@[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Truncates a string to a maximum length, appending an ellipsis if needed.
 * @param str - The input string
 * @param maxLength - Maximum length of the output
 * @returns The truncated string
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - 3) + "...";
}

/**
 * Converts a string to camelCase.
 * @param str - The input string (e.g., "hello_world" or "hello-world")
 * @returns The camelCase version
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ""))
    .replace(/^[A-Z]/, (char) => char.toLowerCase());
}

/**
 * Converts a string to snake_case.
 * @param str - The input string
 * @returns The snake_case version
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, "_$1")
    .replace(/[-\s]+/g, "_")
    .toLowerCase()
    .replace(/^_/, "");
}

/**
 * Capitalizes the first letter of each word in a string.
 * @param str - The input string
 * @returns The title-cased string
 */
export function toTitleCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
