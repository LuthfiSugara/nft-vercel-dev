import { createAction } from '@reduxjs/toolkit'
import { TokenList } from '@uniswap/token-lists'

export const fetchTokenList = {
  pending: createAction<{ url: string; requestId: string }>('lists/fetchTokenList/pending'),
  fulfilled: createAction<{ url: string; tokenList: TokenList; requestId: string }>('lists/fetchTokenList/fulfilled'),
  rejected: createAction<{ url: string; errorMessage: string; requestId: string }>('lists/fetchTokenList/rejected'),
}
