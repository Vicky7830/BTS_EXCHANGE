// Calculate Token Example: 1 ETH token price: 261600.87 and 1 USDC token price: 83.73 how much usdc token in 1 ETH Token

export const calculateToken = (tokenA, tokenB) =>{
    const ethTokenToUsdcToken = tokenA / tokenB;
    return ethTokenToUsdcToken.toFixed(6);
}