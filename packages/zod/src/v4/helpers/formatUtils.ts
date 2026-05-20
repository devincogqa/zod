/**
 * Formatting utility helpers for schema error messages and output.
 */

export function joinWithComma(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

export function indent(text: string, spaces: number = 2): string {
  const pad = " ".repeat(spaces);
  return text
    .split("\n")
    .map((line) => pad + line)
    .join("\n");
}

export function wrapInQuotes(value: string, style: "single" | "double" = "double"): string {
  const quote = style === "single" ? "'" : '"';
  return `${quote}${value}${quote}`;
}

export function bytesToHuman(bytes: number): string {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let unitIndex = 0;
  let size = bytes;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

export function durationToHuman(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  if (ms < 3600000) return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
  return `${Math.floor(ms / 3600000)}h ${Math.floor((ms % 3600000) / 60000)}m`;
}

export function maskString(value: string, visibleChars: number = 4): string {
  if (value.length <= visibleChars) return value;
  return "*".repeat(value.length - visibleChars) + value.slice(-visibleChars);
}
