import { Service, Inject } from "typedi";
import { IQuoteProvider } from "../interfaces/quotes.interface";
import logger from "../utils/logger";
@Service()
export default class QuoteService {
  constructor(
    @Inject("QuoteProvider")
    private quoteProvider: IQuoteProvider
  ) {}

  public async getQuote({amount, chainIdFrom, chainIdTo, currencyCode}: {
    amount: number;
    chainIdFrom: number;
    chainIdTo: number;
    currencyCode: string;
  }) {
    try {

    } catch (e) {
      logger.error("Quote service", { e });
      return { delivered: 0, status: "error" };
    }
  }
}
