import { add } from 'date-fns';

const cacheKey = process.env.NEXT_PUBLIC_CACHE_KEY || 'theoCache';

const cache = {
  cacheTimesInMs: {
    prices: parseInt(process.env.NEXT_PUBLIC_PRICE_CACHE_SECS || '0'),
  },
  storageMethod() {
    // sessionStorage is also compatible
    return localStorage;
  },
  getCache() {
    return JSON.parse(this.storageMethod().getItem(cacheKey) || '{}');
  },
  getItem(key: string) {
    const item = this.getCache()[key];
    const expiration = item?.expiration;
    if (expiration && new Date(expiration) < new Date()) {
      this.removeItem(key);
      return;
    } else {
      return item?.value;
    }
  },
  setItem(key: string, value: any, seconds_to_cache: string | number = 0) {
    const expiration = add(new Date(), {
      seconds: parseInt(seconds_to_cache.toString()),
    });
    return this.storageMethod().setItem(
      cacheKey,
      JSON.stringify({ ...this.getCache(), [key]: { value, expiration } })
    );
  },
  removeItem(key: string) {
    return this.setItem(key, undefined);
  },
  clear() {
    return this.storageMethod().removeItem(cacheKey);
  },
};

export { cache };
