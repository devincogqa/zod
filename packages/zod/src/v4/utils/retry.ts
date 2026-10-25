interface RetryOptions {
  maxRetries: number;
  delayMs: number;
  backoffMultiplier?: number;
}

/**
 * Retries an async function up to `maxRetries` times with optional exponential backoff.
 */
export async function retry<T>(fn: () => Promise<T>, options: RetryOptions): Promise<T> {
  const { maxRetries, delayMs, backoffMultiplier = 2 } = options;
  let lastError: unknown;
  let currentDelay = delayMs;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;

      if (attempt < maxRetries) {
        await sleep(currentDelay);
        currentDelay *= backoffMultiplier;
      }
    }
  }

  throw lastError;
}

/**
 * A simple debounce that delays invoking `fn` until `waitMs` have elapsed
 * since the last invocation.
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  waitMs: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    // BUG: timer is never cleared before setting a new one — debounce doesn't actually debounce
    timer = setTimeout(() => {
      fn(...args);
    }, waitMs);
  };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
