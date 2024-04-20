import axios from 'axios';
import { IQuoteProvider } from '../interfaces/quotes.interface';
import logger from "../utils/logger";

export class LiFiQuoteProvider implements IQuoteProvider {
  constructor(){
  }
  getQuote({ amount, chainIdFrom, chainIdTo, currencyCode }: { amount: number; chainIdFrom: number; chainIdTo: number; currencyCode: string; }) {
    try {
      return {ok:'ok'};
    } catch (error) {
      logger.error('2222222222')
      logger.error('Error fetching quote from LI.FI$', error);
      throw error;
    }
  }
}

