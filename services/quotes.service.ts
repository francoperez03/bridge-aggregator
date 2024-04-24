import { Service, Inject, Container } from "typedi";
import logger from "../utils/logger";
import { IQuoteProvider } from "../interfaces/quotes.interface";

@Service()
export class QuoteService {
  constructor(
    @Inject("LiFiQuoteProvider")
    private liFiQuoteProvider: IQuoteProvider,
    @Inject("ConnextQuoteProvider")
    private connextQuoteProvider: IQuoteProvider,
  ) {}

  async getBestQuote(amount: number, fromChain: string | number, toChain: string | number, tokenCode: string) {
    try {
      const quotes = await this.connextQuoteProvider.getQuote(amount, fromChain, toChain, tokenCode )
      return quotes;
    } catch (e) {
      logger.error((e as Error).message);
      return { delivered: 0, status: "error" };
    }
  }
}