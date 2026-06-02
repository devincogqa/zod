/**
 * Retry utilities for handling transient failures in async schema operations.
 */

export interface RetryOptions {
  /** Maximum number of retry attempts. */
  maxRetries: number;
  /** Initial delay between retries in milliseconds. */
  initialDelayMs: number;
  /** Multiplier applied to delay after each retry (exponential backoff). */
  backoffMultiplier: number;
  /** Maximum delay between retries in milliseconds. */
  maxDelayMs: number;
  /** Optional predicate to determine if an error is retryable. */
  isRetryable?: (error: unknown) => boolean;
}

const DEFAULT_OPTIONS: RetryOptions = {
  maxRetries: 3,
  initialDelayMs: 100,
  backoffMultiplier: 2,
  maxDelayMs: 5000,
};

/**
 * Sleep for the specified number of milliseconds.
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Calculate the delay for a given attempt using exponential backoff.
 */
export function calculateDelay(attempt: number, options: RetryOptions): number {
  const delay = options.initialDelayMs * options.backoffMultiplier ** attempt;
  return Math.min(delay, options.maxDelayMs);
}

/**
 * Retry an async function with exponential backoff.
 *
 * @param fn - The async function to retry.
 * @param options - Retry configuration options.
 * @returns The result of the function if it eventually succeeds.
 * @throws The last error encountered if all retries are exhausted.
 */
export async function retry<T>(fn: () => Promise<T>, options: Partial<RetryOptions> = {}): Promise<T> {
  const opts: RetryOptions = { ...DEFAULT_OPTIONS, ...options };
  let lastError: unknown;

  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Check if the error is retryable
      if (opts.isRetryable && !opts.isRetryable(error)) {
        throw error;
      }

      // Don't sleep after the last attempt
      if (attempt < opts.maxRetries) {
        const delay = calculateDelay(attempt, opts);
        await sleep(delay);
      }
    }
  }

  throw lastError;
}

/**
 * Create a retry wrapper with pre-configured options.
 */
export function createRetrier(options: Partial<RetryOptions> = {}) {
  return <T>(fn: () => Promise<T>) => retry(fn, options);
}
