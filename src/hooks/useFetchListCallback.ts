import { nanoid } from '@reduxjs/toolkit'
import { ChainId } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import useActiveWeb3React from './useActiveWeb3React'
import { fetchTokenList } from '@app/store/lists/actions'
import getTokenList from '@app/utils/getTokenList'
import resolveENSContentHash from '@app/utils/ENS/resolveENSContentHash'
import useWeb3Provider from './useActiveWeb3React'

function useFetchListCallback() {
  const { library } = useWeb3Provider()
  const { chainId } = useActiveWeb3React()
  const dispatch = useDispatch()

  const ensResolver = useCallback(
    (ensName: string) => {
      if (chainId !== ChainId.TESTNET) {
        throw new Error('Could not construct mainnet ENS resolver')
      }
      return resolveENSContentHash(ensName, library)
    },
    [chainId, library]
  )

  // note: prevent dispatch if using for list search or unsupported list
  return useCallback(
    async (listUrl, sendDispatch = true) => {
      const requestId = nanoid()
      if (sendDispatch) {
        dispatch(fetchTokenList.pending({ requestId, url: listUrl }))
      }
      return getTokenList(listUrl, ensResolver)
        .then((tokenList) => {
          if (sendDispatch) {
            dispatch(fetchTokenList.fulfilled({ url: listUrl, tokenList, requestId }))
          }
          return tokenList
        })
        .catch((error) => {
          console.error(`Failed to get list at url ${listUrl}`, error)
          if (sendDispatch) {
            dispatch(
              fetchTokenList.rejected({
                url: listUrl,
                requestId,
                errorMessage: error.message,
              })
            )
          }
          throw error
        })
    },
    [dispatch, ensResolver]
  )
}

export default useFetchListCallback
