import { configureStore } from '@reduxjs/toolkit'
import user from './user/slice'
import multicall from './multicall/slice'
import swap from './swap/slice'
import mint from './mint/slice'
import lists from './lists/slice'
import transactions from './transactions/slice'
import block from './block/slice'
import burn from './burn/slice'
import farms from './farms'
import pools from './pools'
import marketMakers from './marketMakers'
import info from './info'
import { dashboardSlice } from './dashboard/dashboard-slice'
import { buyNFTSlice, rarityImageSlice } from './buyNft/buy-nft-slice'
import { myNFTSlice } from './myNft/my-nft-slice'
import { mmDetailsSlice, myNFTClaimSlice } from './myNftDetail/my-nft-detail-slice'
import { load, save } from 'redux-localstorage-simple'
import updateVersion from './global/actions'

const PERSISTED_KEYS = ['user', 'transactions', 'lists']

const store = configureStore({
  reducer: {
    block,
    burn,
    farms,
    info,
    lists,
    mint,
    multicall,
    pools,
    marketMakers,
    swap,
    transactions,
    user,
    [dashboardSlice.reducerPath]: dashboardSlice.reducer,
    [buyNFTSlice.reducerPath]: buyNFTSlice.reducer,
    [myNFTSlice.reducerPath]: myNFTSlice.reducer,
    [myNFTClaimSlice.reducerPath]: myNFTClaimSlice.reducer,
    [mmDetailsSlice.reducerPath]: mmDetailsSlice.reducer,
    [rarityImageSlice.reducerPath]: rarityImageSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      save({ states: PERSISTED_KEYS }),
      dashboardSlice.middleware,
      buyNFTSlice.middleware,
      myNFTSlice.middleware,
      myNFTClaimSlice.middleware,
      mmDetailsSlice.middleware,
      rarityImageSlice.middleware
    ),
  preloadedState: load({ states: PERSISTED_KEYS, disableWarnings: true }),
})

if (typeof window !== 'undefined') {
  store.dispatch(updateVersion())
}

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
