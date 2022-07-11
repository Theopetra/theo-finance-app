export function cleanSymbol(symbol?: string) {
  if (['eth', 'weth'].includes(symbol?.toLowerCase() || '')) {
    return 'ETH';
  } else {
    return symbol;
  }
}
