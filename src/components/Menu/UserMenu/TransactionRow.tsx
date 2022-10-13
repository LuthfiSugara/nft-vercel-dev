import React from 'react'
import styled from '@emotion/styled'
import { TransactionDetails } from '@app/store/transactions/slice'
import useActiveWeb3React from '@app/hooks/useActiveWeb3React'
import { getBscScanLink } from '@app/utils'
import { Flex, Link, Spinner } from '@chakra-ui/react'
import { CheckIcon, ExternalLinkIcon, NotAllowedIcon } from '@chakra-ui/icons'

interface TransactionRowProps {
  txn: TransactionDetails
}

const TxnIcon = styled(Flex)`
  align-items: center;
  flex: none;
  width: 24px;
`

const Summary = styled.div`
  flex: 1;
  padding: 0 8px;
  font-weight: 600;
`

const TxnLink = styled(Link)`
  align-items: center;
  display: flex;
  margin-bottom: 16px;
  width: 100%;

  &:hover {
    text-decoration: none;
  }
`

const renderIcon = (txn: TransactionDetails) => {
  if (!txn.receipt) {
    return <Spinner w={5} h={5} />
  }

  return txn.receipt?.status === 1 || typeof txn.receipt?.status === 'undefined' ? (
    <CheckIcon color="legion.success" boxSize={5} />
  ) : (
    <NotAllowedIcon color="legion.error" boxSize={5} />
  )
}

const TransactionRow: React.FC<TransactionRowProps> = ({ txn }) => {
  const { chainId } = useActiveWeb3React()

  if (!txn) {
    return null
  }

  return (
    <TxnLink href={getBscScanLink(txn.hash, 'transaction', chainId)} isExternal>
      <TxnIcon>{renderIcon(txn)}</TxnIcon>
      <Summary>{txn.summary ?? txn.hash}</Summary>
      <TxnIcon>
        <ExternalLinkIcon boxSize={'24px'} color="primary" />
      </TxnIcon>
    </TxnLink>
  )
}

export default TransactionRow
