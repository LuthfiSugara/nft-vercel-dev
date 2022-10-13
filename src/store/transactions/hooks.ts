import { useCallback, useMemo } from 'react'
import useActiveWeb3React from '@app/hooks/useActiveWeb3React'
import { addTransaction, TransactionDetails } from './slice'
import { useAppDispatch, useAppSelector } from '@app/store/typed'
import { TransactionResponse } from '@ethersproject/providers'

/**
 * @typedef {import("./slice").TransactionDetails} TransactionDetails
 */

// helper that can take a ethers library transaction response and add it to the list of transactions
export function useTransactionAdder(): (
  response: TransactionResponse,
  customData?: {
    summary?: string
    approval?: { tokenAddress: string; spender: string }
    claim?: { recipient: string }
  }
) => void {
  const { chainId, account } = useActiveWeb3React()
  const dispatch = useAppDispatch()

  return useCallback(
    (
      response: TransactionResponse,
      {
        summary,
        approval,
        claim,
      }: { summary?: string; claim?: { recipient: string }; approval?: { tokenAddress: string; spender: string } } = {}
    ) => {
      if (!account) return
      if (!chainId) return

      const { hash } = response
      if (!hash) {
        throw Error('No transaction hash found.')
      }
      dispatch(
        addTransaction({
          hash,
          from: account,
          chainId,
          approval,
          summary,
          claim,
        })
      )
    },
    [dispatch, chainId, account]
  )
}

/**
 * @returns all the transactions for the current chain
 */
export function useAllTransactions(): { [txHash: string]: TransactionDetails } {
  const { chainId } = useActiveWeb3React()

  const state = useAppSelector((s) => s.transactions)

  return chainId ? state[chainId] ?? {} : {}
}

export function useIsTransactionPending(transactionHash?: string) {
  const transactions = useAllTransactions()

  if (!transactionHash || !transactions[transactionHash]) return false

  return !transactions[transactionHash].receipt
}

/**
 * @returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 */
export function isTransactionRecent(tx: TransactionDetails) {
  return new Date().getTime() - tx.addedTime < 86_400_000
}

/**
 * @returns whether a token has a pending approval transaction
 */
export function useHasPendingApproval(tokenAddress: string | undefined, spender: string | undefined) {
  const allTransactions = useAllTransactions()
  return useMemo(
    () =>
      typeof tokenAddress === 'string' &&
      typeof spender === 'string' &&
      Object.keys(allTransactions).some((hash) => {
        const tx = allTransactions[hash]
        if (!tx) return false
        if (tx.receipt) {
          return false
        }
        const { approval } = tx
        if (!approval) return false
        return approval.spender === spender && approval.tokenAddress === tokenAddress && isTransactionRecent(tx)
      }),
    [allTransactions, spender, tokenAddress]
  )
}
