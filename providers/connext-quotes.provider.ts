import { AxiosError } from 'axios';
import { IQuoteProvider, QuoteResponse } from '../interfaces/quotes.interface';
import logger from '../utils/logger';
import { SdkConfig, create } from '@connext/sdk';
import { getTokenAddress } from '../utils/token-addresses';
import { CacheManager } from '../utils/cache';
import { BigNumberish }  from 'ethers';

const BASE_URL = '';
export class ConnexteQuoteProvider implements IQuoteProvider {
	private sdkConfig: SdkConfig = {
		signerAddress: '0xfd5ffa749a02D92a393327583821E2a38aAEC885',
		network: 'mainnet',
		environment: 'production',
		chains: {
			1936027759: {
				providers: ['https://public.stackup.sh/api/v1/node/ethereum-sepolia'],
			},
			1869640549: {
				providers: ['https://sepolia.optimism.io'],
			},
			6648936: {
				providers: ['https://rpc.ankr.com/eth'],
			},
			1886350457: {
				providers: ['https://polygon-rpc.com/'],
			},
		},
	};

    private cache: CacheManager;

    constructor() {
        this.cache = new CacheManager();
    }

	private getCacheKey(fromChain: number, toChain: number, tokenCode: string): string {
        return `${fromChain}-${toChain}-${tokenCode}`;
    }

	private calculateAmountReceived(amount: number, estimatedRate: number): number {
        return amount * estimatedRate;
    }

	async getQuote(
		amount: number,
		fromChain: number,
		toChain: number,
		tokenCode: string
	): Promise<any> {
		const cacheKey = this.getCacheKey(fromChain, toChain, tokenCode);
		try {
			const { sdkBase } = await create(this.sdkConfig);
			const cachedData = this.cache.getFromCache(cacheKey);
			if (cachedData) {
				logger.info('HIT!');
				return { amountReceived: this.calculateAmountReceived(amount, cachedData) };
			}

			const response = await sdkBase.calculateAmountReceived(
				sdkBase.chainIdToDomain(fromChain).toString(),
				sdkBase.chainIdToDomain(toChain).toString(),
				getTokenAddress(tokenCode, fromChain),
				amount.toString(),
				false,
				true
			);
			return { amountReceived: response.amountReceived.toString() };
		} catch (error) {
			logger.error((error as AxiosError).message);
			throw error;
		}
	}
}
