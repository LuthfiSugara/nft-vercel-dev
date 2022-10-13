/* eslint-disable */
import React, { useEffect, useMemo } from 'react'
import { Text, Flex } from '@chakra-ui/react'
import useActiveWeb3React from '@app/hooks/useActiveWeb3React'
import { getBscScanLink } from '@app/utils'
import { checkedTransaction, finalizeTransaction } from './slice'
import { useAppDispatch, useAppSelector } from '@app/store/typed'
import { useBlock } from '../block/hooks'
import LinkExternal from '@app/components/Link/LinkExternal'
import { useTranslation } from '@app/context'
import useToastApp from '@app/hooks/useToastApp'

export function shouldCheck(
  lastBlockNumber: number,
  tx: { addedTime: number; receipt?: any; lastCheckedBlockNumber?: number }
) {
  if (tx.receipt) return false
  if (!tx.lastCheckedBlockNumber) return true
  const blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber
  if (blocksSinceCheck < 1) return false
  const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9
  }
  if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2
  }
  // otherwise every block
  return true
}

export default function Updater() {
  const { library, chainId } = useActiveWeb3React()

  const { currentBlock } = useBlock()

  const dispatch = useAppDispatch()
  const state = useAppSelector((s) => s.transactions)

  const transactions = useMemo(() => (chainId ? state[chainId] ?? {} : {}), [chainId, state])
  const { t } = useTranslation()
  const { toastError, toastSuccess } = useToastApp()

  useEffect(() => {
    if (!chainId || !library || !currentBlock) return

    Object.keys(transactions)
      .filter((hash) => shouldCheck(currentBlock, transactions[hash]))
      .forEach((hash) => {
        library
          .getTransactionReceipt(hash)
          .then((receipt) => {
            if (receipt) {
              dispatch(
                finalizeTransaction({
                  chainId,
                  hash,
                  receipt: {
                    blockHash: receipt.blockHash,
                    blockNumber: receipt.blockNumber,
                    contractAddress: receipt.contractAddress,
                    from: receipt.from,
                    status: receipt.status,
                    to: receipt.to,
                    transactionHash: receipt.transactionHash,
                    transactionIndex: receipt.transactionIndex,
                  },
                })
              )

              const toast = receipt.status === 1 ? toastSuccess : toastError
              toast(
                t('Transaction receipt'),
                <Flex flexDirection="column">
                  <Text>{transactions[hash]?.summary ?? `Hash: ${hash.slice(0, 8)}...${hash.slice(58, 65)}`}</Text>
                  {chainId && (
                    <LinkExternal href={getBscScanLink(hash, 'transaction', chainId)}>
                      {t('View on BscScan')}
                    </LinkExternal>
                  )}
                </Flex>
              )
            } else {
              dispatch(checkedTransaction({ chainId, hash, blockNumber: currentBlock }))
            }
          })
          .catch((error) => {
            console.error(`failed to check transaction hash: ${hash}`, error)
          })
      })
  }, [chainId, library, transactions, currentBlock, dispatch])

  return null
}
