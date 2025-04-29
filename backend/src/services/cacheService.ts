const cache = new Map<string, { data: any; expireAt: number }>();

export const setCache = (key: string, data: any, ttl: number) => {
  cache.set(key, { data, expireAt: Date.now() + ttl });
};

export const getCache = (key: string) => {
  const cached = cache.get(key);
  if (!cached) return null;
  if (Date.now() > cached.expireAt) {
    cache.delete(key);
    return null;
  }
  return cached.data;
};
