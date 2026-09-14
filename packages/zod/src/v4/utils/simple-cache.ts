/**
 * A simple in-memory cache with TTL (time-to-live) support.
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class SimpleCache<T> {
  private cache: Map<string, CacheEntry<T>> = new Map();
  private defaultTTL: number;

  /**
   * Creates a new SimpleCache instance.
   * @param defaultTTL - Default time-to-live in milliseconds.
   */
  constructor(defaultTTL = 60000) {
    this.defaultTTL = defaultTTL;
  }

  /**
   * Sets a value in the cache with an optional custom TTL.
   */
  set(key: string, value: T, ttl?: number): void {
    const effectiveTTL = ttl ?? this.defaultTTL;
    const expiresAt = Date.now() + effectiveTTL;
    this.cache.set(key, { value, expiresAt });
  }

  /**
   * Gets a value from the cache. Returns undefined if not found or expired.
   */
  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) {
      return undefined;
    }
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return undefined;
    }
    return entry.value;
  }

  /**
   * Checks if a key exists in the cache and hasn't expired.
   */
  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  /**
   * Removes a key from the cache.
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clears all entries from the cache.
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Returns the number of non-expired entries in the cache.
   */
  size(): number {
    this.cleanup();
    return this.cache.size;
  }

  /**
   * Removes all expired entries from the cache.
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}
