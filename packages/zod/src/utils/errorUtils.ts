/**
 * Error handling utility functions
 */

/**
 * Custom error class for validation failures
 */
export class ValidationError extends Error {
  public readonly code: string;
  public readonly details: Record<string, unknown>;

  constructor(message: string, code: string, details: Record<string, unknown> = {}) {
    super(message);
    this.name = "ValidationError";
    this.code = code;
    this.details = details;
  }
}

/**
 * Custom error class for network-related failures
 */
export class NetworkError extends Error {
  public readonly statusCode: number | undefined;
  public readonly url: string;

  constructor(message: string, url: string, statusCode?: number) {
    super(message);
    this.name = "NetworkError";
    this.statusCode = statusCode;
    this.url = url;
  }
}

/**
 * Wrap an async function to catch and return errors as a result tuple
 */
export async function tryCatch<T>(
  fn: () => Promise<T>
): Promise<[T, null] | [null, Error]> {
  try {
    const result = await fn();
    return [result, null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(String(error))];
  }
}

/**
 * Format an error into a user-friendly message
 */
export function formatError(error: unknown): string {
  if (error instanceof ValidationError) {
    return `Validation failed (${error.code}): ${error.message}`;
  }
  if (error instanceof NetworkError) {
    return `Network error${error.statusCode ? ` (${error.statusCode})` : ""}: ${error.message}`;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

/**
 * Assert a condition is true, throwing an error if not
 */
export function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

/**
 * Ensure a value is not null or undefined
 */
export function ensureNotNull<T>(
  value: T | null | undefined,
  name: string = "value"
): T {
  if (value === null || value === undefined) {
    throw new Error(`Expected ${name} to be defined, but got ${value}`);
  }
  return value;
}
