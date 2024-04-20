export interface IQuoteProvider {
  getQuote({
    amount,
    chainIdFrom,
    chainIdTo,
    currencyCode,
  }: {
    amount: number;
    chainIdFrom: number;
    chainIdTo: number;
    currencyCode: string;
  }): any;
}