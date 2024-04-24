import axios, { AxiosError } from 'axios';
import { IQuoteProvider } from '../interfaces/quotes.interface';
import logger from '../utils/logger';

const BASE_URL = 'https://api.hop.exchange/v1'
export class HopQuoteProvider implements IQuoteProvider {
  
    private chainNames: { [key: number]: string } = {
        1: 'ethereum',
        137: 'polygon',
    }

    private getChainName( chainId: number ): string {
        return this.chainNames[chainId]
	}

	async getQuote(amount: number, fromChain: number, toChain: number, tokenCode: string) {
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

			return { amountReceived: data.estimatedRecieved }
		} catch (error) {
			logger.error((error as AxiosError).message);
			throw error;
		}
	}
}
