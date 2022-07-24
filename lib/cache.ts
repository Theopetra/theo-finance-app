const cacheKey = 'theoCache';

const cache = {
  cacheTimesInMs: {
    prices: 5 * 60 * 1000, // five minutes
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
      console.log('expired', key);
      this.removeItem(key);
      return;
    } else {
      console.log('getItem cache', this.getCache());
      return item?.value;
    }
  },
  setItem(key: string, value: any, expiration?: Date) {
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
