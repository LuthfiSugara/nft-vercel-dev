import { InjectedModalProps } from '@app/context'
import { useTranslation } from '@app/context/Localization'
import { useActiveWeb3React } from '@app/hooks'
import { isTransactionRecent, useAllTransactions } from '@app/store/transactions/hooks'
import { clearAllTransactions, TransactionDetails } from '@app/store/transactions/slice'
import { useAppDispatch } from '@app/store/typed'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Text,
  ModalCloseButton,
  Button,
  Flex,
} from '@chakra-ui/react'
import { useCallback, useMemo } from 'react'
import NoSSR from '../Shared/NoSsr'
import Transaction from '../Transaction/Transaction'

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

function renderTransactions(transactions: TransactionDetails[]) {
  return (
    <Flex flexDirection="column">
      {transactions.map((tx) => {
        return <Transaction key={tx.hash + tx.addedTime} tx={tx} />
      })}
    </Flex>
  )
}

export default function ModalTokenHistory({ isOpen, onDismiss }: InjectedModalProps) {
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const allTransactions = useAllTransactions()
  const { t } = useTranslation()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt)
  const confirmed = sortedRecentTransactions.filter((tx) => tx.receipt)

  const clearAllTransactionsCallback = useCallback(() => {
    if (chainId) dispatch(clearAllTransactions({ chainId }))
  }, [dispatch, chainId])
  return (
    <Modal isOpen={isOpen} isCentered onClose={onDismiss}>
      <ModalOverlay />
      <ModalContent width={['90vw', 'sm']}>
        <ModalHeader>{t('Recent Transactions')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody py="6" borderTop="1px" borderTopColor="legion.secondary">
          <NoSSR>
            {account ? (
              !!pending.length || !!confirmed.length ? (
                <>
                  <Flex mb="4" justify="space-between" align="center">
                    <Text color="legion.gray.200">{t('Recent Transactions')}</Text>
                    <Button variant="ghost" colorScheme="primary" size="sm" onClick={clearAllTransactionsCallback}>
                      {t('clear all')}
                    </Button>
                  </Flex>
                  {renderTransactions(pending)}
                  {renderTransactions(confirmed)}
                </>
              ) : (
                <Text>{t('No recent transactions')}</Text>
              )
            ) : (
              <Text fontSize="md" fontWeight="bold" letterSpacing={'wide'} align="center">
                {t('Please connect your wallet to view your recent transactions')}
              </Text>
            )}
          </NoSSR>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
