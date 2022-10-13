import React from 'react'
import { useAllTransactions } from '@app/store/transactions/hooks'
import { useTranslation } from '@app/context'
import useActiveWeb3React from '@app/hooks/useActiveWeb3React'
import { clearAllTransactions } from '@app/store/transactions/slice'
import { orderBy } from 'lodash'
import { useAppDispatch } from '@app/store/typed'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import TransactionRow from './TransactionRow'

const WalletTransactions: React.FC = () => {
  const { chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const allTransactions = useAllTransactions()
  const sortedTransactions = orderBy(allTransactions, 'addedTime', 'desc')

  const handleClearAll = () => {
    if (chainId) {
      dispatch(clearAllTransactions({ chainId }))
    }
  }
  return (
    <Box minHeight="120px">
      <Flex alignItems="center" justifyContent="space-between" mb="24px">
        <Text color="legion.secondary" fontSize="12px" textTransform="uppercase" fontWeight="bold">
          {t('Recent Transactions')}
        </Text>
        {sortedTransactions.length > 0 && (
          <Button scale="sm" onClick={handleClearAll} colorScheme="primary" variant="ghost">
            {t('Clear all')}
          </Button>
        )}
      </Flex>
      {sortedTransactions.length > 0 ? (
        sortedTransactions.map((txn) => <TransactionRow key={txn.hash} txn={txn} />)
      ) : (
        <Text textAlign="center">{t('No recent transactions')}</Text>
      )}
    </Box>
  )
}

export default WalletTransactions
