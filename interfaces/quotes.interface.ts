export interface IQuoteProvider {
  getQuote(
    amount: number,
    fromChain: number,
    toChain: number,
    tokenCode: string
  ): any;
}

export interface QuoteResponse {
  amountReceived: string
}
