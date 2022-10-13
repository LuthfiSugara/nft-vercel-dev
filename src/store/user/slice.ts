import { DEFAULT_DEADLINE_FROM_NOW, INITIAL_ALLOWED_SLIPPAGE } from '@app/config/constants'
import { SerializedToken } from '@app/config/constants/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FarmStakedOnly, SerializedPair, ViewMode } from './actions'
import { GAS_PRICE_GWEI } from './hooks/helpers'

const currentTimestamp = () => new Date().getTime()
export interface UserState {
  // the timestamp of the last updateVersion action
  lastUpdateVersionTimestamp?: number

  userExpertMode: boolean

  // only allow swaps on direct pairs
  userSingleHopOnly: boolean

  // user defined slippage tolerance in bips, used in all txns
  userSlippageTolerance: number

  // deadline set by user in minutes, used in all txns
  userDeadline: number

  tokens: {
    [chainId: number]: {
      [address: string]: SerializedToken
    }
  }

  pairs: {
    [chainId: number]: {
      // keyed by token0Address:token1Address
      [key: string]: SerializedPair
    }
  }

  timestamp: number
  audioPlay: boolean
  isDark: boolean
  userFarmStakedOnly: FarmStakedOnly
  userPoolStakedOnly: boolean
  userPoolsViewMode: ViewMode
  userFarmsViewMode: ViewMode
  userPredictionAcceptedRisk: boolean
  userPredictionChartDisclaimerShow: boolean
  userExpertModeAcknowledgementShow: boolean
  userUsernameVisibility: boolean
  gasPrice: string
  watchlistTokens: string[]
  watchlistPools: string[]
}

function pairKey(token0Address: string, token1Address: string) {
  return `${token0Address};${token1Address}`
}

export const initialState: UserState = {
  userExpertMode: false,
  userSingleHopOnly: false,
  userSlippageTolerance: INITIAL_ALLOWED_SLIPPAGE,
  userDeadline: DEFAULT_DEADLINE_FROM_NOW,
  tokens: {},
  pairs: {},
  timestamp: currentTimestamp(),
  audioPlay: true,
  isDark: false,
  userFarmStakedOnly: FarmStakedOnly.ON_FINISHED,
  userPoolStakedOnly: false,
  userPoolsViewMode: ViewMode.TABLE,
  userFarmsViewMode: ViewMode.TABLE,
  userPredictionAcceptedRisk: false,
  userPredictionChartDisclaimerShow: true,
  userExpertModeAcknowledgementShow: true,
  userUsernameVisibility: false,
  gasPrice: GAS_PRICE_GWEI.default,
  watchlistTokens: [],
  watchlistPools: [],
}

const user = createSlice({
  initialState,
  name: 'user',
  reducers: {
    updateVersion: (state) => {
      // slippage isnt being tracked in local storage, reset to default
      // noinspection SuspiciousTypeOfGuard
      if (typeof state.userSlippageTolerance !== 'number') {
        state.userSlippageTolerance = INITIAL_ALLOWED_SLIPPAGE
      }

      // deadline isnt being tracked in local storage, reset to default
      // noinspection SuspiciousTypeOfGuard
      if (typeof state.userDeadline !== 'number') {
        state.userDeadline = DEFAULT_DEADLINE_FROM_NOW
      }

      state.lastUpdateVersionTimestamp = currentTimestamp()
    },
    updateUserExpertMode: (state, { payload }: PayloadAction<{ userExpertMode: boolean }>) => {
      state.userExpertMode = payload.userExpertMode
      state.timestamp = currentTimestamp()
    },
    updateUserSlippageTolerance: (state, { payload }: PayloadAction<{ userSlippageTolerance: number }>) => {
      state.userSlippageTolerance = payload.userSlippageTolerance
      state.timestamp = currentTimestamp()
    },
    updateUserDeadline: (state, { payload }: PayloadAction<{ userDeadline: number }>) => {
      state.userDeadline = payload.userDeadline
      state.timestamp = currentTimestamp()
    },
    updateUserSingleHopOnly: (state, { payload }: PayloadAction<{ userSingleHopOnly: boolean }>) => {
      state.userSingleHopOnly = payload.userSingleHopOnly
    },
    addSerializedToken: (
      state,
      { payload: { serializedToken } }: PayloadAction<{ serializedToken: SerializedToken }>
    ) => {
      if (!state.tokens) {
        state.tokens = {}
      }
      state.tokens[serializedToken.chainId] = state.tokens[serializedToken.chainId] || {}
      state.tokens[serializedToken.chainId][serializedToken.address] = serializedToken
      state.timestamp = currentTimestamp()
    },
    removeSerializedToken: (
      state,
      { payload: { address, chainId } }: PayloadAction<{ address: string; chainId: number }>
    ) => {
      if (!state.tokens) {
        state.tokens = {}
      }
      state.tokens[chainId] = state.tokens[chainId] || {}
      delete state.tokens[chainId][address]
      state.timestamp = currentTimestamp()
    },
    addSerializedPair: (state, { payload: { serializedPair } }: PayloadAction<{ serializedPair: SerializedPair }>) => {
      if (
        serializedPair.token0.chainId === serializedPair.token1.chainId &&
        serializedPair.token0.address !== serializedPair.token1.address
      ) {
        const { chainId } = serializedPair.token0
        state.pairs[chainId] = state.pairs[chainId] || {}
        state.pairs[chainId][pairKey(serializedPair.token0.address, serializedPair.token1.address)] = serializedPair
      }
      state.timestamp = currentTimestamp()
    },
    removeSerializedPair: (
      state,
      {
        payload: { chainId, tokenAAddress, tokenBAddress },
      }: PayloadAction<{ chainId: number; tokenAAddress: string; tokenBAddress: string }>
    ) => {
      if (state.pairs[chainId]) {
        // just delete both keys if either exists
        delete state.pairs[chainId][pairKey(tokenAAddress, tokenBAddress)]
        delete state.pairs[chainId][pairKey(tokenBAddress, tokenAAddress)]
      }
      state.timestamp = currentTimestamp()
    },
    muteAudio: (state) => {
      state.audioPlay = false
    },
    unmuteAudio: (state) => {
      state.audioPlay = true
    },
    updateUserFarmStakedOnly: (
      state,
      { payload: { userFarmStakedOnly } }: PayloadAction<{ userFarmStakedOnly: FarmStakedOnly }>
    ) => {
      state.userFarmStakedOnly = userFarmStakedOnly
    },
    updateUserExpertModeAcknowledgementShow: (state, { 
        payload: { userExpertModeAcknowledgementShow } 
      }: PayloadAction<{ userExpertModeAcknowledgementShow: boolean }>) => {
      state.userExpertModeAcknowledgementShow = userExpertModeAcknowledgementShow
    },
    updateGasPrice: (state, { payload: { gasPrice } }: PayloadAction<{ gasPrice: string }>) => {
      state.gasPrice = gasPrice
    },
    addWatchlistToken: (state, { payload: { address } }: PayloadAction<{ address: string }>) => {
      // state.watchlistTokens can be undefined for pre-loaded localstorage user state
      const tokenWatchlist = state.watchlistTokens ?? []
      if (!tokenWatchlist.includes(address)) {
        state.watchlistTokens = [...tokenWatchlist, address]
      } else {
        // Remove token from watchlist
        const newTokens = state.watchlistTokens.filter((x) => x !== address)
        state.watchlistTokens = newTokens
      }
    },
    addWatchlistPool: (state, { payload: { address } }: PayloadAction<{ address: string }>) => {
      // state.watchlistPools can be undefined for pre-loaded localstorage user state
      const poolsWatchlist = state.watchlistPools ?? []
      if (!poolsWatchlist.includes(address)) {
        state.watchlistPools = [...poolsWatchlist, address]
      } else {
        // Remove pool from watchlist
        const newPools = state.watchlistPools.filter((x) => x !== address)
        state.watchlistPools = newPools
      }
    },
  },
})

export const getUserState = (state) => state.user

export const {
  addSerializedToken,
  addSerializedPair,
  muteAudio,
  addWatchlistPool,
  addWatchlistToken,
  unmuteAudio,
  updateUserExpertModeAcknowledgementShow,
  updateGasPrice,
  removeSerializedPair,
  removeSerializedToken,
  updateUserDeadline,
  updateUserExpertMode,
  updateUserFarmStakedOnly,
  updateUserSingleHopOnly,
  updateUserSlippageTolerance,
  updateVersion,
} = user.actions

export default user.reducer
