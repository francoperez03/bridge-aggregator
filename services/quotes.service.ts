import { Service, Inject, Container } from "typedi";
import logger from "../utils/logger";
import { IQuoteProvider } from "../interfaces/quotes.interface";

@Service()
export class QuoteService {
  constructor(
    @Inject("LiFiQuoteProvider")
    private liFiQuoteProvider: IQuoteProvider
  ) {}

  async getBestQuote(params: { amount: number; chainIdFrom: number; chainIdTo: number; currencyCode: string; }) {
    try {
      const quotes = this.liFiQuoteProvider.getQuote(params)
      return quotes;
    } catch (e) {
      logger.error((e as Error).message);
      return { delivered: 0, status: "error" };
    }
  }
}