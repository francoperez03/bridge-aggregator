export interface IQuoteProvider {
  getQuote(
    amount: number,
    fromChainId: string | number,
    toChainId: string | number,
    tokenCode: string
  ): any;
}
