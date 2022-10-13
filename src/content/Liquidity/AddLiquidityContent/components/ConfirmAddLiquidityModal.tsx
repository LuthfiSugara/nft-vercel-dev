import CurrencyLogo from '@app/components/Currency/CurrencyLogo'
import { InjectedModalProps } from '@app/context'
import { CURRENCY_FIELD } from '@app/store/mint/slice'
import { Currency, CurrencyAmount, Percent, Price, TokenAmount } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import {
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useCallback } from 'react'

interface ConfirmAdLiquidityModalProps extends InjectedModalProps {
  title?: string
  currencyA: Currency
  currencyB: Currency
  noLiquidity?: boolean
  liquidityMinted: TokenAmount
  allowedSlippage: number
  parsedAmounts: {
    CURRENCY_A: CurrencyAmount
    CURRENCY_B: CurrencyAmount
  }
  price: Price
  customOnDismiss?: () => void
  poolTokenPercentage: Percent
  onAdd: () => void | Promise<void>
}

const ConfirmAddLiquidityModal = ({
  isOpen,
  onDismiss,
  title,
  currencyA,
  currencyB,
  noLiquidity,
  liquidityMinted,
  allowedSlippage,
  parsedAmounts,
  customOnDismiss,
  price,
  poolTokenPercentage,
  onAdd,
}: ConfirmAdLiquidityModalProps) => {
  const handleDismiss = useCallback(() => {
    if (customOnDismiss) {
      customOnDismiss()
    }
    onDismiss()
  }, [customOnDismiss, onDismiss])
  return (
    <Modal isOpen={isOpen} onClose={handleDismiss}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Divider />
          <VStack align="stretch" spacing={2}>
            <Flex align="center" gridGap={2}>
              {noLiquidity ? (
                <Heading>{`${currencyA?.symbol}/${currencyB?.symbol}`}</Heading>
              ) : (
                <Heading fontSize="5xl" fontWeight={500}>
                  {liquidityMinted?.toSignificant(6)}
                </Heading>
              )}
              <Flex align="center" gridGap={2}>
                <CurrencyLogo size={40} currency={currencyA} />
                <CurrencyLogo size={40} currency={currencyB} />
              </Flex>
            </Flex>
            <Flex>
              <Text fontSize="xl">{`${currencyA?.symbol}/${currencyB?.symbol} Pool Tokens`}</Text>
            </Flex>
            {!noLiquidity && (
              <Text fontSize="sm" color="primary.200">{`Output is estimated. If the price changes by more than ${
                allowedSlippage / 100
              } your transaction will revert.`}</Text>
            )}
            <Flex justify="space-between">
              <Text>{`${currencyA?.symbol} Deposited`}</Text>
              <HStack>
                <CurrencyLogo currency={currencyA} />
                <Text>{parsedAmounts[CURRENCY_FIELD.CURRENCY_A]?.toSignificant(6)}</Text>
              </HStack>
            </Flex>
            <Flex justify="space-between">
              <Text>{`${currencyB?.symbol} Deposited`}</Text>
              <HStack>
                <CurrencyLogo currency={currencyB} />
                <Text>{parsedAmounts[CURRENCY_FIELD.CURRENCY_B]?.toSignificant(6)}</Text>
              </HStack>
            </Flex>
            <Flex justify="space-between">
              <Text>Rates</Text>
              <Text>{`1 ${currencyA?.symbol} = ${price?.toSignificant(4)} ${currencyB?.symbol}`}</Text>
            </Flex>
            <Flex justify="flex-end">
              <Text>{`1 ${currencyB?.symbol} = ${price?.invert().toSignificant(4)} ${currencyA?.symbol}`}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>{`Share of Pool`}</Text>
              <Text>{noLiquidity ? '100' : poolTokenPercentage?.toSignificant(4)}%</Text>
            </Flex>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="primary" color="white" mr="auto" size="md" rounded="xl" onClick={onAdd}>
            {noLiquidity ? 'Create Pool & Supply' : 'Confirm Supply'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmAddLiquidityModal
