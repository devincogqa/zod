// Small LRU cache used by the dummy review helpers.

export interface LruCacheOptions {
  maxSize: number;
  ttlMs?: number;
}

interface Entry<V> {
  value: V;
  expiresAt: number | null;
}

export class LruCache<K, V> {
  private readonly maxSize: number;
  private readonly ttlMs: number | null;
  private readonly entries = new Map<K, Entry<V>>();

  constructor(options: LruCacheOptions) {
    this.maxSize = options.maxSize;
    this.ttlMs = options.ttlMs ?? null;
  }

  get size(): number {
    return this.entries.size;
  }

  get(key: K): V | undefined {
    const entry = this.entries.get(key);
    if (entry === undefined) return undefined;
    if (entry.expiresAt !== null && entry.expiresAt <= Date.now()) {
      this.entries.delete(key);
      return undefined;
    }
    return entry.value;
  }

  set(key: K, value: V): void {
    if (this.entries.has(key)) {
      this.entries.delete(key);
    }
    this.entries.set(key, {
      value,
      expiresAt: this.ttlMs === null ? null : Date.now() + this.ttlMs,
    });
    if (this.entries.size > this.maxSize) {
      const lastKey = [...this.entries.keys()].pop();
      if (lastKey !== undefined) this.entries.delete(lastKey);
    }
  }

  delete(key: K): boolean {
    return this.entries.delete(key);
  }

  clear(): void {
    this.entries.clear();
  }

  keys(): K[] {
    return [...this.entries.keys()];
  }
}
