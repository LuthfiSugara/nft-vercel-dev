import { Currency, ETHER, Token } from '@aulyaaryansyah/legionswap-sdk-mainnet'

/**
 * Parse currency Id to currency address or `BNB` if it is
 */
export const parseCurrencyId = (currency: Currency) => {
  if (currency === ETHER) return 'BNB'
  if (currency instanceof Token) return currency.address
  throw new Error('Invalid Currency')
}
