import { TokenAmount, Pair, Currency } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { useMemo } from 'react'
import { Interface } from '@ethersproject/abi'

import useActiveWeb3React from '@app/hooks/useActiveWeb3React'
import { wrappedCurrency } from '@app/utils/wrappedCurrency'
import { useMultipleContractSingleData } from '@app/store/multicall/hooks'

import UniswapV2PairABI from '@uniswap/v2-core/build/IUniswapV2Pair.json'

const PAIR_INTERFACE = new Interface(UniswapV2PairABI.abi)

export enum PairState {
  LOADING = 'LOADING',
  NOT_EXISTS = 'NOT_EXISTS',
  EXISTS = 'EXISTS',
  INVALID = 'INVALID',
}

export function usePairs(currencies: [Currency | undefined, Currency | undefined][]): [PairState, Pair | null][] {
  const { chainId } = useActiveWeb3React()

  const tokens = useMemo(
    () =>
      currencies.map(([currencyA, currencyB]) => [
        wrappedCurrency(currencyA, chainId),
        wrappedCurrency(currencyB, chainId),
      ]),
    [chainId, currencies]
  )

  const pairAddresses = useMemo(
    () =>
      tokens.map(([tokenA, tokenB]) => {
        return tokenA && tokenB && !tokenA.equals(tokenB) ? Pair.getAddress(tokenA, tokenB) : undefined
      }),
    [tokens]
  )

  const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')

  return useMemo(() => {
    return results.map((result, i) => {
      const { result: reserves, loading } = result
      const tokenA = tokens[i][0]
      const tokenB = tokens[i][1]

      if (loading) return [PairState.LOADING, null]
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null]
      if (!reserves) return [PairState.NOT_EXISTS, null]
      const { reserve0, reserve1 } = reserves
      const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
      return [
        PairState.EXISTS,
        new Pair(new TokenAmount(token0, reserve0.toString()), new TokenAmount(token1, reserve1.toString())),
      ]
    })
  }, [results, tokens])
}

export function usePair(tokenA?: Currency, tokenB?: Currency): [PairState, Pair | null] {
  return usePairs([[tokenA, tokenB]])[0]
}
