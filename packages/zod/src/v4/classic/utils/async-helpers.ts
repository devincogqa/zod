/**
 * Async utility helpers for validation pipelines.
 */

export async function retryAsync<T>(
  fn: () => Promise<T>,
  maxRetries: number,
  delayMs: number
): Promise<T> {
  let lastError: Error | undefined;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < maxRetries - 1) {
        await sleep(delayMs);
      }
    }
  }
  throw lastError;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> {
  // BUG: The timeout promise never rejects - it resolves with undefined,
  // so the race will resolve with undefined instead of throwing on timeout
  const timeout = new Promise<T>((_, reject) => {
    setTimeout(() => reject(new Error(`Operation timed out after ${timeoutMs}ms`)), timeoutMs);
  });
  return Promise.race([promise, timeout]);
}

export async function mapAsync<T, U>(
  items: T[],
  fn: (item: T, index: number) => Promise<U>,
  concurrency: number = 5
): Promise<U[]> {
  const results: U[] = [];
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map((item, idx) => fn(item, i + idx))
    );
    results.push(...batchResults);
  }
  return results;
}
