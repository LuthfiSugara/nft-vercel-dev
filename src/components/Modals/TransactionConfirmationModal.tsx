import React, { useCallback } from 'react'
import { ChainId, Currency, Token } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import styled from '@emotion/styled'
import { registerToken } from '@app/utils/wallet'
import useActiveWeb3React from '@app/hooks/useActiveWeb3React'
import { wrappedCurrency } from '@app/utils/wrappedCurrency'
import { getBscScanLink } from '../../utils'
import {
  Box,
  Button,
  Divider,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ArrowUpIcon, WarningIcon } from '@chakra-ui/icons'
import { InjectedModalProps, useTranslation } from '@app/context'
import { MetamaskIcon } from '../Icons/Wallets'

const Wrapper = styled(Box)`
  width: 100%;
`
const Section = styled(Flex)`
  padding: 24px;
`

const ConfirmedIcon = styled(Flex)`
  padding: 24px 0;
`

function ConfirmationPendingContent({ pendingText }: { pendingText: string }) {
  const { t } = useTranslation()
  return (
    <Wrapper p="4">
      <ConfirmedIcon justify="center" align="center">
        <Spinner size="xl" color="legion.main.200" thickness="4px" speed="2s" emptyColor="brand.bg.1" />
      </ConfirmedIcon>
      <VStack spacing="2" justify="center">
        <Text fontSize="20px">{t('Waiting For Confirmation')}</Text>
        <Flex gap="12px" justify="center">
          <Text textAlign="center" fontWeight="bold" color="legion.main.200">
            {pendingText}
          </Text>
        </Flex>
        <Text color="textSubtle" textAlign="center">
          {t('Confirm this transaction in your wallet')}
        </Text>
      </VStack>
    </Wrapper>
  )
}

function TransactionSubmittedContent({
  onDismiss,
  chainId,
  hash,
  currencyToAdd,
}: {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
  currencyToAdd?: Currency | undefined
}) {
  const { library } = useActiveWeb3React()
  const { t } = useTranslation()
  const token: Token | undefined = wrappedCurrency(currencyToAdd, chainId)

  return (
    <Wrapper>
      <Section direction="column" justify="center">
        <ConfirmedIcon justify="center" align="center">
          <ArrowUpIcon strokeWidth={0.5} width="90px" color="legion.main.300" w={20} h={20} />
        </ConfirmedIcon>
        <VStack spacing="4" justify="center">
          <Text fontSize="20px" color="legion.gray.200">
            {t('Transaction Submitted')}
          </Text>
          {chainId && hash && (
            <Button
              as={Link}
              isExternal
              variant="link"
              href={getBscScanLink(hash, 'transaction', chainId)}
              colorScheme="primary"
            >
              {t('View on BscScan')}
            </Button>
          )}
          {currencyToAdd && library?.provider?.isMetaMask && (
            <Button
              variant="tertiary"
              mt="12px"
              width="fit-content"
              onClick={() => registerToken(token.address, token.symbol, token.decimals)}
            >
              <Flex>
                {t('Add %asset% to Metamask', { asset: currencyToAdd.symbol })}
                <MetamaskIcon />
              </Flex>
            </Button>
          )}
          <Button onClick={onDismiss} mt="20px" colorScheme="primary" color="white" shadow="2xl">
            {t('Close')}
          </Button>
        </VStack>
      </Section>
    </Wrapper>
  )
}

export function ConfirmationModalContent({
  bottomContent,
  topContent,
}: {
  topContent: () => React.ReactNode
  bottomContent: () => React.ReactNode
}) {
  return (
    <Wrapper>
      <Box>{topContent()}</Box>
      <Box>{bottomContent()}</Box>
    </Wrapper>
  )
}

export function TransactionErrorContent({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  const { t } = useTranslation()
  return (
    <Wrapper py="4">
      <VStack justify="center">
        <WarningIcon color="legion.red.600" w={12} h={12} />
        <Text color="legion.red.900">{message}</Text>
      </VStack>

      <Flex justifyContent="center" pt="4">
        <Button rounded="2xl" onClick={onDismiss} colorScheme="primary" color="white">
          {t('Dismiss')}
        </Button>
      </Flex>
    </Wrapper>
  )
}

interface ConfirmationModalProps {
  title: string
  customOnDismiss?: () => void
  hash: string | undefined
  content: () => React.ReactNode
  attemptingTxn: boolean
  pendingText: string
  currencyToAdd?: Currency | undefined
}

const TransactionConfirmationModal: React.FC<InjectedModalProps & ConfirmationModalProps> = ({
  title,
  onDismiss,
  customOnDismiss,
  attemptingTxn,
  hash,
  pendingText,
  content,
  isOpen,
  currencyToAdd,
}) => {
  const { chainId } = useActiveWeb3React()
  const handleDismiss = useCallback(() => {
    if (customOnDismiss) {
      customOnDismiss()
    }
    onDismiss()
  }, [customOnDismiss, onDismiss])

  if (!chainId) return null

  return (
    <Modal isOpen={isOpen} onClose={handleDismiss} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>{title}</ModalHeader>
        <Divider />
        <ModalBody>
          {attemptingTxn ? (
            <ConfirmationPendingContent pendingText={pendingText} />
          ) : hash ? (
            <TransactionSubmittedContent
              chainId={chainId}
              hash={hash}
              onDismiss={onDismiss}
              currencyToAdd={currencyToAdd}
            />
          ) : (
            content()
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default TransactionConfirmationModal
