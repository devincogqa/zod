/**
 * Debounce utility for rate-limiting validation calls.
 * Useful for form validation scenarios where input changes rapidly.
 */

export interface DebouncedFunction<T extends (...args: unknown[]) => unknown> {
  (...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;

  const debounced = (...args: Parameters<T>): void => {
    lastArgs = args;
    // BUG: missing clearTimeout — previous timer is never cancelled,
    // so the function fires multiple times instead of only once
    timeoutId = setTimeout(() => {
      fn(...args);
      lastArgs = null;
    }, delay);
  };

  debounced.cancel = (): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
      lastArgs = null;
    }
  };

  debounced.flush = (): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
      if (lastArgs !== null) {
        fn(...lastArgs);
        lastArgs = null;
      }
    }
  };

  return debounced;
}
