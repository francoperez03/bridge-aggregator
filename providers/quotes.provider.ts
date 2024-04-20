import { Container, Service } from "typedi";
import { IQuoteProvider } from "../interfaces/quotes.interface";
@Service()
export default class QuoteProvider implements IQuoteProvider {
  constructor() {
  }

  getQuote({
    amount,
    chainIdFrom,
    chainIdTo,
    currencyCode,
  }: {
    amount: number,
    chainIdFrom: number,
    chainIdTo: number,
    currencyCode: string,
  }) {
   
  }
}