/**
 * In-Memory Response Caching Service
 * Optimizes performance by instantly returning cached AI responses
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class CacheService {
  private cache = new Map<string, CacheEntry<any>>();
  private maxAgeMs: number;

  constructor(maxAgeMinutes: number = 10) {
    this.maxAgeMs = maxAgeMinutes * 60 * 1000;
  }

  public get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.maxAgeMs) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  public set<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  public clear(): void {
    this.cache.clear();
  }

  public size(): number {
    return this.cache.size;
  }
}

export const lruCache = new CacheService();
