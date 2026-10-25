/**
 * Truncates a string to `maxLen` characters, appending an ellipsis if truncated.
 */
export function truncate(input: string, maxLen: number): string {
  if (input.length <= maxLen) {
    return input;
  }
  return `${input.slice(0, maxLen)}…`;
}

/**
 * Converts a camelCase or PascalCase string to snake_case.
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "");
}

/**
 * Capitalizes the first letter of each word in a string.
 */
export function titleCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Checks whether a string is a valid ISO-8601 date (YYYY-MM-DD).
 */
export function isISODate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}
