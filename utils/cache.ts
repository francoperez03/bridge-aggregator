export interface ICacheManager {
    getCacheKey(
        amount: number,
        fromChain: number,
        toChain: number,
        tokenCode: string
      ): any;
}

const CACHE_TTL = 60000

export class CacheManager {

    private data: {
        [key: string]: {
            data: any,
            timestamp: number
        }
    } = {};


    public setCache(key: string, data: any) {
        const timestamp = Date.now();
        this.data[key] = { data, timestamp };
    }
    
    public getFromCache(key: string): any {
        const entry = this.data[key];
        if (entry) {
            const now = Date.now();
            const ttl = CACHE_TTL;
            if (now - entry.timestamp < ttl) {
                return entry.data;
            }
        }
        return null;
    }
}