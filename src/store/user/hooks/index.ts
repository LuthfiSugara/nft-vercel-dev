import { ChainId, Pair, Token } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import flatMap from 'lodash/flatMap'
import { useCallback, useMemo } from 'react'
import { BASES_TO_TRACK_LIQUIDITY_FOR, PINNED_PAIRS } from '@app/config/constants'
import useActiveWeb3React from '@app/hooks/useActiveWeb3React'
import { useAllTokens } from '@app/hooks/Tokens'
import { FarmStakedOnly, SerializedPair } from '../actions'
import {
  addSerializedPair,
  addSerializedToken,
  muteAudio,
  removeSerializedToken,
  unmuteAudio,
  updateUserDeadline,
  updateUserExpertMode,
  updateUserFarmStakedOnly,
  updateUserSingleHopOnly,
  updateUserSlippageTolerance,
  updateGasPrice,
  addWatchlistToken,
  addWatchlistPool,
  // updateUserPoolStakedOnly,
  // updateUserPoolsViewMode,
  // updateUserFarmsViewMode,
  // updateUserPredictionChartDisclaimerShow,
  // updateUserPredictionAcceptedRisk,
  // updateUserUsernameVisibility,
  updateUserExpertModeAcknowledgementShow,
} from '../slice'

import { deserializeToken, GAS_PRICE_GWEI, serializeToken } from './helpers'
import { useAppDispatch, useAppSelector } from '@app/store/typed'

export function useAudioModeManager() {
  const dispatch = useAppDispatch()
  const audioPlay = useAppSelector((state) => state.user.audioPlay)

  const toggleSetAudioMode = useCallback(() => {
    if (audioPlay) {
      dispatch(muteAudio())
    } else {
      dispatch(unmuteAudio())
    }
  }, [audioPlay, dispatch])

  return [audioPlay, toggleSetAudioMode] as const
}

export function useIsExpertMode(): boolean {
  return useAppSelector((state) => state.user.userExpertMode)
}

export function useExpertModeManager() {
  const dispatch = useAppDispatch()
  const expertMode = useIsExpertMode()

  const toggleSetExpertMode = useCallback(() => {
    dispatch(updateUserExpertMode({ userExpertMode: !expertMode }))
  }, [expertMode, dispatch])

  return [expertMode, toggleSetExpertMode] as const
}

export function useUserSingleHopOnly() {
  const dispatch = useAppDispatch()

  const singleHopOnly = useAppSelector((state) => state.user.userSingleHopOnly)

  const setSingleHopOnly = useCallback(
    (newSingleHopOnly: boolean) => {
      dispatch(updateUserSingleHopOnly({ userSingleHopOnly: newSingleHopOnly }))
    },
    [dispatch]
  )

  return [singleHopOnly, setSingleHopOnly] as const
}

export function useUserSlippageTolerance() {
  const dispatch = useAppDispatch()
  const userSlippageTolerance = useAppSelector((state) => {
    return state.user.userSlippageTolerance
  })

  const setUserSlippageTolerance = useCallback(
    (slippage: number) => {
      dispatch(updateUserSlippageTolerance({ userSlippageTolerance: slippage }))
    },
    [dispatch]
  )

  return [userSlippageTolerance, setUserSlippageTolerance] as const
}

export function useUserFarmStakedOnly(isActive: boolean) {
  const dispatch = useAppDispatch()
  const userFarmStakedOnly = useAppSelector((state) => {
    return state.user.userFarmStakedOnly
  })

  const setUserFarmStakedOnly = useCallback(
    (stakedOnly: boolean) => {
      const farmStakedOnly = stakedOnly ? FarmStakedOnly.TRUE : FarmStakedOnly.FALSE
      dispatch(updateUserFarmStakedOnly({ userFarmStakedOnly: farmStakedOnly }))
    },
    [dispatch]
  )

  return [
    userFarmStakedOnly === FarmStakedOnly.ON_FINISHED ? !isActive : userFarmStakedOnly === FarmStakedOnly.TRUE,
    setUserFarmStakedOnly,
  ] as const
}

// export function useUserPoolStakedOnly() {
//   const dispatch = useAppDispatch()
//   const userPoolStakedOnly = useAppSelector((state) => {
//     return state.user.userPoolStakedOnly
//   })

//   const setUserPoolStakedOnly = useCallback(
//     (stakedOnly: boolean) => {
//       dispatch(updateUserPoolStakedOnly({ userPoolStakedOnly: stakedOnly }))
//     },
//     [dispatch],
//   )

//   return [userPoolStakedOnly, setUserPoolStakedOnly] as const
// }

// export function useUserPoolsViewMode() {
//   const dispatch = useAppDispatch()
//   const userPoolsViewMode = useAppSelector<AppState, AppState['user']['userPoolsViewMode']>((state) => {
//     return state.user.userPoolsViewMode
//   })

//   const setUserPoolsViewMode = useCallback(
//     (viewMode: ViewMode) => {
//       dispatch(updateUserPoolsViewMode({ userPoolsViewMode: viewMode }))
//     },
//     [dispatch],
//   )

//   return [userPoolsViewMode, setUserPoolsViewMode] as const
// }

// export function useUserFarmsViewMode() {
//   const dispatch = useAppDispatch()
//   const userFarmsViewMode = useAppSelector<AppState, AppState['user']['userFarmsViewMode']>((state) => {
//     return state.user.userFarmsViewMode
//   })

//   const setUserFarmsViewMode = useCallback(
//     (viewMode: ViewMode) => {
//       dispatch(updateUserFarmsViewMode({ userFarmsViewMode: viewMode }))
//     },
//     [dispatch],
//   )

//   return [userFarmsViewMode, setUserFarmsViewMode] as const
// }

// export function useUserPredictionAcceptedRisk() {
//   const dispatch = useAppDispatch()
//   const userPredictionAcceptedRisk = useAppSelector<AppState, AppState['user']['userPredictionAcceptedRisk']>((state) => {
//     return state.user.userPredictionAcceptedRisk
//   })

//   const setUserPredictionAcceptedRisk = useCallback(
//     (acceptedRisk: boolean) => {
//       dispatch(updateUserPredictionAcceptedRisk({ userAcceptedRisk: acceptedRisk }))
//     },
//     [dispatch],
//   )

//   return [userPredictionAcceptedRisk, setUserPredictionAcceptedRisk] as const
// }

// export function useUserPredictionChartDisclaimerShow() {
//   const dispatch = useAppDispatch()
//   const userPredictionChartDisclaimerShow = useAppSelector((state) => {
//     return state.user.userPredictionChartDisclaimerShow
//   })

//   const setPredictionUserChartDisclaimerShow = useCallback(
//     (showDisclaimer: boolean) => {
//       dispatch(updateUserPredictionChartDisclaimerShow({ userShowDisclaimer: showDisclaimer }))
//     },
//     [dispatch],
//   )

//   return [userPredictionChartDisclaimerShow, setPredictionUserChartDisclaimerShow] as const
// }

export function useUserExpertModeAcknowledgementShow() {
  const dispatch = useAppDispatch()
  const userExpertModeAcknowledgementShow = useAppSelector((state) => {
    return state.user.userExpertModeAcknowledgementShow
  })

  const setUserExpertModeAcknowledgementShow = useCallback(
    (showAcknowledgement: boolean) => {
      dispatch(updateUserExpertModeAcknowledgementShow({ userExpertModeAcknowledgementShow: showAcknowledgement }))
    },
    [dispatch],
  )

  return [userExpertModeAcknowledgementShow, setUserExpertModeAcknowledgementShow] as const
}

// export function useUserUsernameVisibility() {
//   const dispatch = useAppDispatch()
//   const userUsernameVisibility = useAppSelector((state) => {
//     return state.user.userUsernameVisibility
//   })

//   const setUserUsernameVisibility = useCallback(
//     (usernameVisibility: boolean) => {
//       dispatch(updateUserUsernameVisibility({ userUsernameVisibility: usernameVisibility }))
//     },
//     [dispatch],
//   )

//   return [userUsernameVisibility, setUserUsernameVisibility] as const
// }

export function useUserTransactionTTL() {
  const dispatch = useAppDispatch()
  const userDeadline = useAppSelector((state) => {
    return state.user.userDeadline
  })

  const setUserDeadline = useCallback(
    (deadline: number) => {
      dispatch(updateUserDeadline({ userDeadline: deadline }))
    },
    [dispatch]
  )

  return [userDeadline, setUserDeadline] as const
}

export function useAddUserToken(): (token: Token) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (token: Token) => {
      dispatch(addSerializedToken({ serializedToken: serializeToken(token) }))
    },
    [dispatch]
  )
}

export function useRemoveUserAddedToken(): (chainId: number, address: string) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (chainId: number, address: string) => {
      dispatch(removeSerializedToken({ chainId, address }))
    },
    [dispatch]
  )
}

export function useGasPrice() {
  const chainId = process.env.CHAIN_ID
  const userGas = useAppSelector((state) => state.user.gasPrice)
  return chainId === ChainId.MAINNET.toString() ? userGas : GAS_PRICE_GWEI.testnet
}

export function useGasPriceManager() {
  const dispatch = useAppDispatch()
  const userGasPrice = useGasPrice()

  const setGasPrice = useCallback(
    (gasPrice: string) => {
      dispatch(updateGasPrice({ gasPrice }))
    },
    [dispatch]
  )

  return [userGasPrice, setGasPrice] as const
}

function serializePair(pair: Pair): SerializedPair {
  return {
    token0: serializeToken(pair.token0),
    token1: serializeToken(pair.token1),
  }
}

export function usePairAdder() {
  const dispatch = useAppDispatch()

  return useCallback(
    (pair: Pair) => {
      dispatch(addSerializedPair({ serializedPair: serializePair(pair) }))
    },
    [dispatch]
  )
}

/**
 * Given two tokens return the liquidity token that represents its liquidity shares
 * @param tokenA one of the two tokens
 * @param tokenB the other token
 */
export function toV2LiquidityToken([tokenA, tokenB]: [Token, Token]): Token {
  return new Token(tokenA.chainId, Pair.getAddress(tokenA, tokenB), 18, 'Legion-LP', 'Legion LPs')
}

/**
 * Returns all the pairs of tokens that are tracked by the user for the current chain ID.
 */
export function useTrackedTokenPairs(): [Token, Token][] {
  const { chainId } = useActiveWeb3React()
  const tokens = useAllTokens()

  // pinned pairs
  const pinnedPairs = useMemo(() => (chainId ? PINNED_PAIRS[chainId] ?? [] : []), [chainId])

  // pairs for every token against every base
  const generatedPairs: [Token, Token][] = useMemo(
    () =>
      chainId
        ? flatMap(Object.keys(tokens), (tokenAddress) => {
            const token = tokens[tokenAddress]
            // for each token on the current chain,
            return (
              // loop though all bases on the current chain
              (BASES_TO_TRACK_LIQUIDITY_FOR[chainId] ?? [])
                // to construct pairs of the given token with each base
                .map((base) => {
                  if (base.address === token.address) {
                    return null
                  }
                  return [base, token]
                })
                .filter((p): p is [Token, Token] => p !== null)
            )
          })
        : [],
    [tokens, chainId]
  )

  // pairs saved by users
  const savedSerializedPairs = useAppSelector(({ user: { pairs } }) => pairs)

  const userPairs: [Token, Token][] = useMemo(() => {
    if (!chainId || !savedSerializedPairs) return []
    const forChain = savedSerializedPairs[chainId]
    if (!forChain) return []

    return Object.keys(forChain).map((pairId) => {
      return [deserializeToken(forChain[pairId].token0), deserializeToken(forChain[pairId].token1)]
    })
  }, [savedSerializedPairs, chainId])

  const combinedList = useMemo(
    () => userPairs.concat(generatedPairs).concat(pinnedPairs),
    [generatedPairs, pinnedPairs, userPairs]
  )

  return useMemo(() => {
    // dedupes pairs of tokens in the combined list
    const keyed = combinedList.reduce<{ [key: string]: [Token, Token] }>((memo, [tokenA, tokenB]) => {
      const sorted = tokenA.sortsBefore(tokenB)
      const key = sorted ? `${tokenA.address}:${tokenB.address}` : `${tokenB.address}:${tokenA.address}`
      if (memo[key]) return memo
      memo[key] = sorted ? [tokenA, tokenB] : [tokenB, tokenA]
      return memo
    }, {})

    return Object.keys(keyed).map((key) => keyed[key])
  }, [combinedList])
}

export const useWatchlistTokens = () => {
  const dispatch = useAppDispatch()
  const savedTokens = useAppSelector((state) => state.user.watchlistTokens) ?? []
  const updatedSavedTokens = useCallback(
    (address: string) => {
      dispatch(addWatchlistToken({ address }))
    },
    [dispatch]
  )
  return [savedTokens, updatedSavedTokens] as const
}

export const useWatchlistPools = () => {
  const dispatch = useAppDispatch()
  const savedPools = useAppSelector((state) => state.user.watchlistPools) ?? []
  const updateSavedPools = useCallback(
    (address: string) => {
      dispatch(addWatchlistPool({ address }))
    },
    [dispatch]
  )
  return [savedPools, updateSavedPools] as const
}
