import { ChainId } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const now = () => new Date().getTime()

export interface SerializableTransactionReceipt {
  to: string
  from: string
  contractAddress: string
  transactionIndex: number
  blockHash: string
  transactionHash: string
  blockNumber: number
  status?: number
}

export interface TransactionDetails {
  hash: string
  approval?: { tokenAddress: string; spender: string }
  summary?: string
  claim?: { recipient: string }
  receipt?: SerializableTransactionReceipt
  lastCheckedBlockNumber?: number
  addedTime: number
  confirmedTime?: number
  from: string
}

export interface TransactionState {
  [chainId: number]: {
    [txHash: string]: TransactionDetails
  }
}

const initialState: TransactionState = {}

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, { payload: { chainId, from, hash, approval, summary, claim } }: AddTransactionPayload) => {
      if (state[chainId]?.[hash]) {
        throw Error('Attempted to add existing transaction.')
      }
      const txs = state[chainId] ?? {}
      txs[hash] = { hash, approval, summary, claim, from, addedTime: now() }
      state[chainId] = txs
    },
    clearAllTransactions: (state, { payload: { chainId } }: PayloadAction<{ chainId: ChainId }>) => {
      if (!state[chainId]) return
      state[chainId] = {}
    },
    checkedTransaction: (state, { payload: { chainId, hash, blockNumber } }: CheckedTransactionPayload) => {
      const tx = state[chainId]?.[hash]
      if (!tx) {
        return
      }
      if (!tx.lastCheckedBlockNumber) {
        tx.lastCheckedBlockNumber = blockNumber
      } else {
        tx.lastCheckedBlockNumber = Math.max(blockNumber, tx.lastCheckedBlockNumber)
      }
    },
    finalizeTransaction: (state, { payload: { hash, chainId, receipt } }: FinalizeTransactionPayload) => {
      const tx = state[chainId]?.[hash]
      if (!tx) {
        return
      }
      tx.receipt = receipt
      tx.confirmedTime = now()
    },
  },
})

export const { addTransaction, checkedTransaction, clearAllTransactions, finalizeTransaction } =
  transactionSlice.actions

export default transactionSlice.reducer

type AddTransactionPayload = PayloadAction<{
  chainId: ChainId
  hash: string
  from: string
  approval?: { tokenAddress: string; spender: string }
  claim?: { recipient: string }
  summary?: string
}>

type CheckedTransactionPayload = PayloadAction<{
  chainId: ChainId
  hash: string
  blockNumber: number
}>

type FinalizeTransactionPayload = PayloadAction<{
  chainId: ChainId
  hash: string
  receipt: SerializableTransactionReceipt
}>
