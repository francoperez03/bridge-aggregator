import axios, { AxiosError } from 'axios';
import { IQuoteProvider } from '../interfaces/quotes.interface';
import logger from '../utils/logger';

export class LiFiQuoteProvider implements IQuoteProvider {
	constructor() {}
	async getQuote(amount: number, fromChain: string | number, toChain: string | number, tokenCode: string) {
		try {
			//   const fromChain = 'DAI';
			//   const fromToken = 'USDC';
			//   const toChain = 'POL';
			//   const toToken = 'USDC';
			//   const fromAmount = '1000000';
			//   const result = await axios.get('https://li.quest/v1/quote', {
			//     params: {
			//         fromChain,
			//         toChain,
			//         fromToken,
			//         toToken,
			//         fromAmount,
			//         fromAddress: '0xfd5ffa749a02D92a393327583821E2a38aAEC885',
			//     }
			// });
      logger.info({fromChain, toChain, tokenCode, a:'EVM'})
			return await this.getConnections(fromChain, toChain, tokenCode, tokenCode, 'EVM');
		} catch (error) {
			logger.error((error as AxiosError).message);
			throw error;
		}
	}

	private async getConnections(
		fromChain: string | number,
		toChain: string | number,
		fromToken: string,
		toToken: string,
		chainTypes: string
	) {
		const result = await axios.get('https://li.quest/v1/connections', {
			params: {
				fromChain,
				toChain,
				fromToken,
				toToken,
				chainTypes,
			},
		});
		return result.data;
	}

	private async getChains() {
		try {
			const optionalChainTypes = 'EVM';
			const result = await axios.get('https://li.quest/v1/chains', {
				params: { chainTypes: optionalChainTypes },
			});
			return result.data;
		} catch (error) {
			logger.error((error as AxiosError).message);
			throw error;
		}
	}

	private async getTokens() {
		try {
			const optionalChainType = 'EVM';
			const optionalFilter = ['ETH', 137];
			const result = await axios.get('https://li.quest/v1/tokens', {
				params: {
					chains: optionalFilter.join(','),
					chainTypes: optionalChainType,
				},
			});
			return result.data;
		} catch (error) {
			logger.error((error as AxiosError).message);
			throw error;
		}
	}

	private async getToken(chain: number | string, token: string) {
		const result = await axios.get('https://li.quest/v1/token', {
			params: {
				chain,
				token,
			},
		});
		return result.data;
	}

	private async getTools() {
		try {
			const optionalChainTypes = 'EVM';
			const result = await axios.get('https://li.quest/v1/tools');
			return result.data;
		} catch (error) {
			logger.error((error as AxiosError).message);
			throw error;
		}
	}
}
