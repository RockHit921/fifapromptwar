import { CACHE_MAX_AGE_MINUTES } from '../constants';

/**
 * Represents an entry in the cache.
 * @template T
 */
interface CacheEntry<T> {
  /** The cached data. */
  data: T;
  /** The timestamp when the data was cached in milliseconds. */
  timestamp: number;
}

/**
 * In-Memory Response Caching Service.
 * Optimizes performance by instantly returning cached AI responses.
 */
export class CacheService {
  private cache = new Map<string, CacheEntry<any>>();
  private maxAgeMs: number;

  /**
   * Initializes the cache service.
   * @param {number} [maxAgeMinutes=CACHE_MAX_AGE_MINUTES] - The maximum age of a cache entry in minutes.
   */
  constructor(maxAgeMinutes: number = CACHE_MAX_AGE_MINUTES) {
    this.maxAgeMs = maxAgeMinutes * 60 * 1000;
  }

  /**
   * Retrieves an item from the cache if it hasn't expired.
   * @template T
   * @param {string} key - The cache key.
   * @returns {T | null} The cached data, or null if not found or expired.
   */
  public get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.maxAgeMs) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Stores an item in the cache.
   * @template T
   * @param {string} key - The cache key.
   * @param {T} data - The data to cache.
   */
  public set<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  /**
   * Clears all items from the cache.
   */
  public clear(): void {
    this.cache.clear();
  }

  /**
   * Returns the number of items currently in the cache.
   * @returns {number} The number of cached items.
   */
  public size(): number {
    return this.cache.size;
  }
}

/**
 * Shared singleton instance of the CacheService.
 */
export const lruCache = new CacheService();
