import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { CacheStore } from "../../helpers/cacheStore.js";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test("basic get/set/has/delete operations", () => {
  const cache = new CacheStore<string>();
  cache.set("a", "hello");
  expect(cache.get("a")).toBe("hello");
  expect(cache.has("a")).toBe(true);
  expect(cache.has("b")).toBe(false);
  expect(cache.get("b")).toBeUndefined();
  cache.delete("a");
  expect(cache.get("a")).toBeUndefined();
  expect(cache.has("a")).toBe(false);
});

test("entries expire after TTL", () => {
  const cache = new CacheStore<string>({ defaultTTL: 1000 });
  cache.set("a", "value");
  expect(cache.get("a")).toBe("value");

  vi.advanceTimersByTime(999);
  expect(cache.get("a")).toBe("value");

  vi.advanceTimersByTime(2);
  expect(cache.get("a")).toBeUndefined();
});

test("has returns false for expired entries", () => {
  const cache = new CacheStore<string>({ defaultTTL: 500 });
  cache.set("x", "val");
  expect(cache.has("x")).toBe(true);

  vi.advanceTimersByTime(501);
  expect(cache.has("x")).toBe(false);
});

test("maxSize enforces eviction of oldest entry", () => {
  const cache = new CacheStore<number>({ maxSize: 3, defaultTTL: 60_000 });
  cache.set("a", 1);
  cache.set("b", 2);
  cache.set("c", 3);
  expect(cache.size).toBe(3);

  cache.set("d", 4);
  expect(cache.size).toBe(3);
  expect(cache.get("a")).toBeUndefined(); // evicted (FIFO)
  expect(cache.get("d")).toBe(4);
});

test("maxSize evicts expired entries before FIFO eviction", () => {
  const cache = new CacheStore<number>({ maxSize: 2, defaultTTL: 1000 });
  cache.set("a", 1);
  cache.set("b", 2);

  vi.advanceTimersByTime(1001); // both expired
  cache.set("c", 3);

  expect(cache.size).toBe(1);
  expect(cache.get("c")).toBe(3);
});

test("updating existing key does not trigger eviction", () => {
  const cache = new CacheStore<number>({ maxSize: 2, defaultTTL: 60_000 });
  cache.set("a", 1);
  cache.set("b", 2);

  cache.set("a", 10); // update existing
  expect(cache.size).toBe(2);
  expect(cache.get("a")).toBe(10);
  expect(cache.get("b")).toBe(2); // not evicted
});

test("size getter excludes expired entries", () => {
  const cache = new CacheStore<string>({ defaultTTL: 1000 });
  cache.set("a", "x");
  cache.set("b", "y");
  expect(cache.size).toBe(2);

  vi.advanceTimersByTime(1001);
  expect(cache.size).toBe(0);
});

test("clear removes all entries", () => {
  const cache = new CacheStore<number>();
  cache.set("a", 1);
  cache.set("b", 2);
  cache.clear();
  expect(cache.size).toBe(0);
  expect(cache.get("a")).toBeUndefined();
});

test("custom TTL per entry overrides default", () => {
  const cache = new CacheStore<string>({ defaultTTL: 10_000 });
  cache.set("short", "val", 500);

  vi.advanceTimersByTime(501);
  expect(cache.get("short")).toBeUndefined();
});
