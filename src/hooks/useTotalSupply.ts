import { Token, TokenAmount } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { useTokenContract } from './useContract'
import { useSingleCallResult } from '@app/store/multicall/hooks'

/**
 * Get the total supply of given token
 * @returns `undefined` if input token is undefined, or fails to get token contract,
 * or contract total supply cannot be fetched
 */
function useTotalSupply(token?: Token): TokenAmount | undefined {
  const contract = useTokenContract(token?.address)

  const totalSupply = useSingleCallResult(contract, 'totalSupply')?.result?.[0]

  return token && totalSupply ? new TokenAmount(token, totalSupply.toString()) : undefined
}

export default useTotalSupply
