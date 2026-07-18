import { describe, it, expect, beforeEach } from 'vitest';
import { lruCache } from '../../services/cacheService';

describe('LRU Cache Service', () => {
  beforeEach(() => {
    lruCache.clear();
  });

  it('stores and retrieves cached items accurately', () => {
    lruCache.set('query-1', { response: 'Fastest entry at Gate A' });
    const cached = lruCache.get<{ response: string }>('query-1');
    expect(cached).not.toBeNull();
    expect(cached?.response).toBe('Fastest entry at Gate A');
  });

  it('returns null for non-existent cache keys', () => {
    expect(lruCache.get('non-existent')).toBeNull();
  });

  it('clears all cached entries when clear is called', () => {
    lruCache.set('key-a', 'data-a');
    lruCache.set('key-b', 'data-b');
    expect(lruCache.size()).toBe(2);
    lruCache.clear();
    expect(lruCache.size()).toBe(0);
  });
});
