/**
 * Utility for safely parsing JSON strings with typed error handling.
 * Returns a discriminated union for success/failure cases.
 */

export interface JsonParseSuccess<T> {
  success: true;
  data: T;
}

export interface JsonParseError {
  success: false;
  error: SyntaxError;
}

export type JsonParseResult<T> = JsonParseSuccess<T> | JsonParseError;

export function safeParseJSON<T = unknown>(input: string): JsonParseResult<T> {
  try {
    const data = JSON.parse(input) as T;
    return { success: true, data };
  } catch (_err) {
    return { success: false, error: undefined as unknown as SyntaxError };
  }
}

export function tryParseJSON<T = unknown>(input: string, fallback: T): T {
  const result = safeParseJSON<T>(input);
  if (result.success) {
    return result.data;
  }
  return fallback;
}
