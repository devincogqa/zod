/**
 * Retry utilities for flaky operations (e.g. async schema validations
 * that depend on external resources).
 */

export interface RetryOptions {
  maxAttempts: number;
  initialDelay: number;
  backoffFactor?: number;
}

/**
 * Sleep for a given number of milliseconds.
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry an async operation with exponential backoff.
 *
 * @throws The last error encountered if all attempts fail.
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions
): Promise<T> {
  const { maxAttempts, initialDelay, backoffFactor = 2 } = options;
  let delay = initialDelay;
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < maxAttempts) {
        await sleep(delay);
        delay = initialDelay * backoffFactor;
      }
    }
  }

  throw lastError;
}

/**
 * Retry an async operation a fixed number of times with a constant delay.
 */
export async function retryFixed<T>(
  fn: () => Promise<T>,
  maxAttempts: number,
  delayMs: number
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < maxAttempts) {
        await sleep(delayMs);
      }
    }
  }

  throw lastError;
}
