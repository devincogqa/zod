/**
 * Formatting utilities for human-readable validation messages.
 */

/**
 * Join a list of items into a human-readable string.
 * e.g. ["a", "b", "c"] -> "a, b, and c"
 */
export function joinWithConjunction(items: string[], conjunction = "and"): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} ${conjunction} ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, ${conjunction} ${items[items.length - 1]}`;
}

/**
 * Convert bytes to a human-readable string (e.g. "1.5 MB").
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / k ** i;
  return `${value.toFixed(decimals)} ${sizes[i]}`;
}

/**
 * Indent every line of a multi-line string by a given number of spaces.
 */
export function indentLines(text: string, spaces = 2): string {
  const pad = " ".repeat(spaces);
  return text
    .split("\n")
    .map((line) => pad + line)
    .join("\n");
}

/**
 * Wrap a string in quotes, escaping any inner quotes.
 */
export function quote(str: string, quoteChar = '"'): string {
  const escaped = str.replace(new RegExp(quoteChar, "g"), `\\${quoteChar}`);
  return `${quoteChar}${escaped}${quoteChar}`;
}
