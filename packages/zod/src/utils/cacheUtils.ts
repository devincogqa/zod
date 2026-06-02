/**
 * Simple caching utilities
 */

interface CacheEntry<T> {
  value: T;
  expiry: number;
}

/**
 * A simple in-memory cache with TTL support
 */
export class SimpleCache<T> {
  private cache: Map<string, CacheEntry<T>> = new Map();
  private defaultTTL: number;

  constructor(defaultTTLMs: number = 60000) {
    this.defaultTTL = defaultTTLMs;
  }

  /**
   * Set a value in the cache
   */
  set(key: string, value: T, ttlMs?: number): void {
    const expiry = Date.now() + (ttlMs ?? this.defaultTTL);
    this.cache.set(key, { value, expiry });
  }

  /**
   * Get a value from the cache (returns undefined if expired or missing)
   */
  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return undefined;
    }
    return entry.value;
  }

  /**
   * Check if a key exists in the cache and is not expired
   */
  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  /**
   * Delete a key from the cache
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all entries from the cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get the number of entries in the cache (including expired ones)
   */
  get size(): number {
    return this.cache.size;
  }
}

/**
 * Memoize a function with a simple cache
 */
export function memoize<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => TResult
): (...args: TArgs) => TResult {
  const cache = new Map<string, TResult>();
  return (...args: TArgs): TResult => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
