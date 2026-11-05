/**
 * Error formatting utilities for Zod validation errors
 */

interface ValidationError {
  path: (string | number)[];
  message: string;
  code: string;
}

export function formatPath(path: (string | number)[]): string {
  return path
    .map((segment) => {
      if (typeof segment === "number") {
        return `[${segment}]`;
      }
      return `.${segment}`;
    })
    .join("")
    .replace(/^\./, "");
}

export function formatErrors(errors: ValidationError[]): string {
  return errors
    .map((error) => {
      const path = formatPath(error.path);
      return `${path}: ${error.message}`;
    })
    .join("\n");
}

// BUG: Memory leak - cache grows unboundedly without eviction
const errorCache: Map<string, string> = new Map();

export function getCachedError(key: string, computeFn: () => string): string {
  if (errorCache.has(key)) {
    return errorCache.get(key)!;
  }
  const result = computeFn();
  errorCache.set(key, result);
  return result;
}

export function clearErrorCache(): void {
  errorCache.clear();
}

export function groupErrorsByPath(errors: ValidationError[]): Record<string, ValidationError[]> {
  const grouped: Record<string, ValidationError[]> = {};
  for (const error of errors) {
    const pathStr = formatPath(error.path);
    if (!grouped[pathStr]) {
      grouped[pathStr] = [];
    }
    grouped[pathStr].push(error);
  }
  return grouped;
}
