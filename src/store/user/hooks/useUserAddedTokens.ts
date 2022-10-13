import { useMemo } from 'react'
import { ChainId, Token } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import useActiveWeb3React from '@app/hooks/useActiveWeb3React'
import { deserializeToken } from './helpers'
import { useAppSelector } from '@app/store/typed'

export default function useUserAddedTokens(): Token[] {
  const { chainId } = useActiveWeb3React()
  const serializedTokensMap = useAppSelector(({ user: { tokens } }) => tokens)

  return useMemo(() => {
    if (!chainId) return []
    return Object.values(serializedTokensMap?.[chainId as ChainId] ?? {}).map(deserializeToken)
  }, [serializedTokensMap, chainId])
}
