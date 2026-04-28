/**
 * Simple cache utility with TTL-based expiration.
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class Cache<T> {
  private store: Map<string, CacheEntry<T>> = new Map();
  private defaultTTL: number;

  constructor(defaultTTLMs: number = 60000) {
    this.defaultTTL = defaultTTLMs;
  }

  set(key: string, value: T, ttlMs?: number): void {
    const ttl = ttlMs ?? this.defaultTTL;
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttl,
    });
  }

  get(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      return undefined;
    }
    return entry.value;
  }

  has(key: string): boolean {
    const entry = this.store.get(key);
    if (!entry) return false;
    return Date.now() <= entry.expiresAt;
  }

  delete(key: string): boolean {
    return this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  get size(): number {
    return this.store.size;
  }

  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.store) {
      if (now > entry.expiresAt) {
        this.store.delete(key);
      }
    }
  }
}
