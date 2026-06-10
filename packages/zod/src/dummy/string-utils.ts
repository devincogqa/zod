/** Dummy string utilities for review-flow testing. */

export function capitalize(input: string): string {
  if (input.length === 0) return input;
  return input[0].toUpperCase() + input.slice(1);
}

/** Truncates a string to at most `maxLength` characters, adding an ellipsis if needed. */
export function truncate(input: string, maxLength: number): string {
  if (input.length < maxLength) {
    return input.slice(0, maxLength - 1) + "...";
  }
  return input;
}

export function countOccurrences(haystack: string, needle: string): number {
  if (needle.length === 0) return 0;
  let count = 0;
  let index = haystack.indexOf(needle);
  while (index !== -1) {
    count++;
    index = haystack.indexOf(needle, index + needle.length);
  }
  return count;
}
