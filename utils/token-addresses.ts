const tokenAddresses: { [key: string]: { [key: number]: string} } = {
    'USDT': {
        1: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        137: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
        56: '0x55d398326f99059fF775485246999027B3197955',
        10: '0x3Ed3B47Dd13EC9a98b44e6204A523E766B225811',
        100: '0x4ECaBa5870353805a9F068101A40E0f32ed605C6'
    },
    'USDC': {
        1: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eb48',
        137: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
        56: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
        10: '0x7f5c764cbc14f9669b88837ca1490cca17c31607',
        42161: '0xFF970A61A04b1ca14834A43f5dE4533eBDDB5CC8'
    },
    'DAI': {
        1: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        137: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
        56: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
        100: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d'
    },
    'LINK': {
        1: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
        137: '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39',
        56: '0xF8A0BF9cF54bB92F17374d9e9A321E6a111a51bD',
        10: '0x350a791bfc2c21f9ed5d10980dad2e2638ffa7f6'
    },
    'WBTC': {
        1: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        137: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
        56: '0x7130d2A12B9BCbFAE4f2634d864A1ee1Ce3eadae',
    }
};


export function getTokenAddress(token: string, chainId: number): string {
    const addressesByChainId = tokenAddresses[token];
    if (!addressesByChainId) {
        throw new Error(`Token ${token} not supported.`);
    }
    const address = addressesByChainId[chainId];
    if (!address) {
        throw new Error(`ChainId ${chainId} not supported for token ${token}.`);
    }
    return address;
}