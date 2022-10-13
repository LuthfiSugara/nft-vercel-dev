import React, { useMemo } from 'react'
import { Trade, TradeType } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { SWAP_FIELD } from '@app/store/swap/actions'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown, warningSeverity } from '@app/utils/prices'
import CurrencyLogo from '@app/components/Currency/CurrencyLogo'
import truncateHash from '@app/utils/truncateHash'
import { Button, Flex, Text, VStack } from '@chakra-ui/react'
import { ArrowDownIcon, WarningIcon } from '@chakra-ui/icons'
import { useTranslation } from '@app/context'

export default function SwapModalHeader({
  trade,
  allowedSlippage,
  recipient,
  showAcceptChanges,
  onAcceptChanges,
}: {
  trade: Trade
  allowedSlippage: number
  recipient: string | null
  showAcceptChanges: boolean
  onAcceptChanges: () => void
}) {
  const slippageAdjustedAmounts = useMemo(
    () => computeSlippageAdjustedAmounts(trade, allowedSlippage),
    [trade, allowedSlippage]
  )
  const { t } = useTranslation()
  const { priceImpactWithoutFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  const amount =
    trade.tradeType === TradeType.EXACT_INPUT
      ? slippageAdjustedAmounts[SWAP_FIELD.OUTPUT]?.toSignificant(6)
      : slippageAdjustedAmounts[SWAP_FIELD.INPUT]?.toSignificant(6)
  const symbol =
    trade.tradeType === TradeType.EXACT_INPUT ? trade.outputAmount.currency.symbol : trade.inputAmount.currency.symbol

  const tradeInfoText =
    trade.tradeType === TradeType.EXACT_INPUT
      ? t('Output is estimated. You will receive at least %amount% %symbol% or the transaction will revert.', {
          amount,
          symbol,
        })
      : t('Input is estimated. You will sell at most %amount% %symbol% or the transaction will revert.', {
          amount,
          symbol,
        })

  const [estimatedText, transactionRevertText] = tradeInfoText.split(`${amount} ${symbol}`)

  const truncatedRecipient = recipient ? truncateHash(recipient) : ''

  const recipientInfoText = t('Output will be sent to %recipient%', {
    recipient: truncatedRecipient,
  })

  const [recipientSentToText, postSentToText] = recipientInfoText.split(truncatedRecipient)

  return (
    <VStack spacing="4" align="stretch" py="4">
      <Flex justify="space-between" align="flex-end">
        <Flex gridColumnGap={2} align="center">
          <CurrencyLogo currency={trade.inputAmount.currency} size={24} />
          <Text
            fontSize="24px"
            color={showAcceptChanges && trade.tradeType === TradeType.EXACT_OUTPUT ? 'primary' : 'text'}
          >
            {trade.inputAmount.toSignificant(6)}
          </Text>
        </Flex>
        <Flex>
          <Text fontSize="2xl" ml="10px">
            {trade.inputAmount.currency.symbol}
          </Text>
        </Flex>
      </Flex>
      <Flex>
        <ArrowDownIcon width="16px" ml="4px" />
      </Flex>
      <Flex justify="space-between" align="flex-end">
        <Flex gridColumnGap={2} align="center">
          <CurrencyLogo currency={trade.outputAmount.currency} />
          <Text
            fontSize="24px"
            color={
              priceImpactSeverity > 2
                ? 'failure'
                : showAcceptChanges && trade.tradeType === TradeType.EXACT_INPUT
                ? 'primary'
                : 'text'
            }
          >
            {trade.outputAmount.toSignificant(6)}
          </Text>
        </Flex>
        <Flex>
          <Text fontSize="24px" ml="10px">
            {trade.outputAmount.currency.symbol}
          </Text>
        </Flex>
      </Flex>
      {showAcceptChanges ? (
        <Flex justify="flex-start">
          <Flex>
            <Flex>
              <WarningIcon mr="8px" />
              <Text>{t('Price Updated')}</Text>
            </Flex>
            <Button onClick={onAcceptChanges}>{t('Accept')}</Button>
          </Flex>
        </Flex>
      ) : null}
      <Flex justify="flex-start" gap="sm" style={{ padding: '24px 0 0 0px' }}>
        <div>
          <Text color="legion.gray.200" display="inline" fontSize="sm">
            {estimatedText}
          </Text>
          <Text color="primary.200" display="inline" fontSize="sm">
            {amount} {symbol}
          </Text>
          <Text color="legion.gray.200" display="inline" fontSize="sm">
            {transactionRevertText}
          </Text>
        </div>
      </Flex>
      {recipient !== null ? (
        <Flex justify="flex-start" gap="sm" style={{ padding: '12px 0 0 0px' }}>
          <Text color="textSubtle">
            {recipientSentToText}
            <b title={recipient}>{truncatedRecipient}</b>
            {postSentToText}
          </Text>
        </Flex>
      ) : null}
    </VStack>
  )
}
