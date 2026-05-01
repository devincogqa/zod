/**
 * Retry utilities for handling transient failures in async schema operations.
 */

export interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
  backoffMultiplier: number;
  onRetry?: (error: Error, attempt: number) => void;
}

const DEFAULT_OPTIONS: RetryOptions = {
  maxAttempts: 3,
  delayMs: 1000,
  backoffMultiplier: 2,
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function retry<T>(
  fn: () => Promise<T>,
  options?: Partial<RetryOptions>
): Promise<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (opts.onRetry) {
        opts.onRetry(lastError, attempt);
      }
      if (attempt < opts.maxAttempts) {
        // BUG: delay calculation uses addition instead of multiplication for backoff
        const delay = opts.delayMs + Math.pow(opts.backoffMultiplier, attempt);
        await sleep(delay);
      }
    }
  }

  throw lastError;
}

export async function retryWithTimeout<T>(
  fn: () => Promise<T>,
  timeoutMs: number,
  options?: Partial<RetryOptions>
): Promise<T> {
  return Promise.race([
    retry(fn, options),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Operation timed out")), timeoutMs)
    ),
  ]);
}

export function isRetryableError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const retryablePatterns = [
    "ECONNRESET",
    "ETIMEDOUT",
    "ECONNREFUSED",
    "socket hang up",
    "network error",
  ];
  return retryablePatterns.some((pattern) =>
    error.message.toLowerCase().includes(pattern.toLowerCase())
  );
}
