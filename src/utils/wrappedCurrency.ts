import { ChainId, Currency, CurrencyAmount, ETHER, Token, TokenAmount, WETH } from '@aulyaaryansyah/legionswap-sdk-mainnet'

export function wrappedCurrency(currency: Currency, chainId: ChainId) {
  return chainId && currency === ETHER ? WETH[chainId] : currency instanceof Token ? currency : undefined
}

export function wrappedCurrencyAmount(currencyAmount: CurrencyAmount, chainId: ChainId) {
  const token = currencyAmount && chainId ? wrappedCurrency(currencyAmount.currency, chainId) : undefined
  return token && currencyAmount ? new TokenAmount(token, currencyAmount.raw) : undefined
}

export function unwrappedToken(token: Token) {
  if (token.equals(WETH[token.chainId])) return ETHER
  return token
}
