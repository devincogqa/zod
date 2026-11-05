/**
 * Capitalize the first character of a string and lowercase the rest.
 */
export function capitalize(value: string): string {
  if (value.length === 0) return value;
  return value[0].toUpperCase() + value.slice(1).toLowerCase();
}

/**
 * Truncate a string to at most `maxLength` characters, appending an ellipsis
 * when the string was shortened. The returned string (including the ellipsis)
 * never exceeds `maxLength` characters.
 */
export function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  const ellipsis = "…";
  return value.slice(0, maxLength - ellipsis.length) + ellipsis;
}

/**
 * Convert an arbitrary string into a URL-friendly slug.
 */
export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
