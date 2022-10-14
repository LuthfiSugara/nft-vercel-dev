import { configureStore } from '@reduxjs/toolkit'
import user from './user/slice'
import multicall from './multicall/slice'
import mint from './mint/slice'
import lists from './lists/slice'
import transactions from './transactions/slice'
import block from './block/slice'
import burn from './burn/slice'
import info from './info'
import { load, save } from 'redux-localstorage-simple'
import updateVersion from './global/actions'

const PERSISTED_KEYS = ['user', 'transactions', 'lists']

const store = configureStore({
  reducer: {
    block,
    burn,
    info,
    lists,
    mint,
    multicall,
    transactions,
    user,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save({ states: PERSISTED_KEYS })),
  preloadedState: load({ states: PERSISTED_KEYS, disableWarnings: true }),
})

if (typeof window !== 'undefined') {
  store.dispatch(updateVersion())
}

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
