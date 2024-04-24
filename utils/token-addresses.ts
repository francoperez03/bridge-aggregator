const symbolToContractAddress: { [key: string]: string } = {
    'USDT': '0xdac17f958d2ee523a2206206994597c13d831ec7',
    'USDC': '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    'LINK': '0x514910771af9ca656af840dff83e8264ecf986ca',
};

export function mapSymbolToContractAddress(symbol: string) {
    const address : string = symbolToContractAddress[symbol];
    if (!address) {
        throw new Error(`No contract address found for symbol: ${symbol}`);
    }
    return address;
}