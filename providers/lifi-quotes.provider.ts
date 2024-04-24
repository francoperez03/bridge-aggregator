import axios, { AxiosError } from 'axios';
import { IQuoteProvider } from '../interfaces/quotes.interface';
import logger from '../utils/logger';

const BASE_URL = 'https://li.quest/v1'


export class LiFiQuoteProvider implements IQuoteProvider {
  
	async getQuote(amount: number, fromChain: string | number, toChain: string | number, tokenCode: string) {
		try {
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
		const result = await axios.get(`${BASE_URL}/connections`, {
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
			const result = await axios.get(`${BASE_URL}/chains`, {
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
			const result = await axios.get(`${BASE_URL}/tokens`, {
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
		const result = await axios.get(`${BASE_URL}/token`, {
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
			const result = await axios.get(`${BASE_URL}/tools`);
			return result.data;
		} catch (error) {
			logger.error((error as AxiosError).message);
			throw error;
		}
	}
}
