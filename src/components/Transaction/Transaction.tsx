import styled from '@emotion/styled'
import useActiveWeb3React from '@app/hooks/useActiveWeb3React'
import { getBscScanLink } from '@app/utils'
import { TransactionDetails } from '@app/store/transactions/slice'
import { Box, Button, Link } from '@chakra-ui/react'
import { CheckIcon, ExternalLinkIcon, SpinnerIcon, WarningIcon } from '@chakra-ui/icons'

const TransactionState = styled.div<{ pending: boolean; success?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none !important;
  border-radius: 0.5rem;
  padding: 0.25rem 0rem;
  font-weight: 500;
  font-size: 0.825rem;
`

export default function Transaction({ tx }: { tx: TransactionDetails }) {
  const { chainId } = useActiveWeb3React()

  const summary = tx?.summary
  const pending = !tx?.receipt
  const success = !pending && tx && (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined')

  if (!chainId) return null
  return (
    <TransactionState pending={pending} success={success}>
      <Button
        as={Link}
        colorScheme="primary"
        variant="link"
        isExternal
        rightIcon={<ExternalLinkIcon />}
        href={getBscScanLink(tx.hash, 'transaction', chainId)}
      >
        {summary ?? tx.hash}
      </Button>
      <Box color={pending ? 'gicv.main.200' : success ? 'gicv.success' : 'gicv.error'}>
        {pending ? <SpinnerIcon /> : success ? <CheckIcon color="gicv.success" /> : <WarningIcon color="gicv.error" />}
      </Box>
    </TransactionState>
  )
}
