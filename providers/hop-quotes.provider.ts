import axios, { AxiosError } from 'axios';
import { IQuoteProvider } from '../interfaces/quotes.interface';
import logger from '../utils/logger';
import { CacheManager } from '../utils/cache';
import { BigNumberish } from 'ethers';

const BASE_URL = 'https://api.hop.exchange/v1'
export class HopQuoteProvider implements IQuoteProvider {

    private cache: CacheManager;
  
    private chainNames: { [key: number]: string } = {
        1: 'ethereum',
        137: 'polygon',
    }

    constructor() {
        this.cache = new CacheManager();
    }

    private getChainName( chainId: number ): string {
        return this.chainNames[chainId]
	}

    private getCacheKey(fromChain: number, toChain: number, tokenCode: string): string {
        return `${fromChain}-${toChain}-${tokenCode}`;
    }

    private calculateAmountReceived(amount: number, estimatedRate: number): number {
        return amount * estimatedRate;
    }
    

	async getQuote(amount: number, fromChain: number, toChain: number, tokenCode: string) {
        const cacheKey = this.getCacheKey(fromChain, toChain, tokenCode);
        const cachedData = this.cache.getFromCache(cacheKey);
        if (cachedData) {
			logger.info('HIT!');
            return { amountReceived: this.calculateAmountReceived(amount, cachedData) };
        }

		try {
			const { data } = await axios.get(`${BASE_URL}/quote`, {
                params: {
                    amount,
                    token: tokenCode,
                    fromChain: this.getChainName(fromChain),
                    toChain: this.getChainName(toChain),
                    slippage: 0.5,
                    network: 'mainnet'
                },
            });
            const estimatedReceived = BigInt(data.estimatedReceived);
            const amountIn = BigInt(data.amountIn);
            if (amountIn === 0n) {
                throw new Error("amountIn is zero, cannot perform division");
            }
            const result = estimatedReceived / amountIn
            console.log(data)
            this.cache.setCache(cacheKey, result)
			return { amountReceived: result }
		} catch (error) {
			logger.error((error as AxiosError).message);
			throw error;
		}
	}
}


