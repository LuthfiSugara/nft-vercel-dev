import React, { useMemo, useState } from 'react'
import { Trade, TradeType } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { SWAP_FIELD } from '@app/store/swap/actions'
import {
  computeSlippageAdjustedAmounts,
  computeTradePriceBreakdown,
  formatExecutionPrice,
  warningSeverity,
} from '@app/utils/prices'
import FormattedPriceImpact from './FormattedPriceImpact'
import { Button, Flex, IconButton, Text, VStack } from '@chakra-ui/react'
import { ArrowUpDownIcon } from '@chakra-ui/icons'
import QuestionHelper from '@app/components/Shared/QuestionHelper'
import { useTranslation } from '@app/context'

export default function SwapModalFooter({
  trade,
  onConfirm,
  allowedSlippage,
  swapErrorMessage,
  disabledConfirm,
}: {
  trade: Trade
  allowedSlippage: number
  onConfirm: () => void
  swapErrorMessage: string | undefined
  disabledConfirm: boolean
}) {
  const [showInverted, setShowInverted] = useState<boolean>(false)
  const slippageAdjustedAmounts = useMemo(
    () => computeSlippageAdjustedAmounts(trade, allowedSlippage),
    [allowedSlippage, trade]
  )
  const { t } = useTranslation()
  const { priceImpactWithoutFee, realizedLPFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const severity = warningSeverity(priceImpactWithoutFee)
  swapErrorMessage && alert(swapErrorMessage)
  return (
    <>
      <VStack align="stretch" bg="legion.light" p="3" rounded="2xl" boxShadow="inner">
        <Flex justify="space-between" align="center">
          <Text fontSize="14px">{t('Price')}</Text>
          <Text
            fontSize="14px"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              textAlign: 'right',
              paddingLeft: '10px',
            }}
          >
            {formatExecutionPrice(trade, showInverted)}
            <IconButton
              aria-label="Invert"
              variant="link"
              minWidth="6"
              colorScheme="primary"
              onClick={() => setShowInverted(!showInverted)}
              icon={<ArrowUpDownIcon width="14px" />}
            />
          </Text>
        </Flex>

        <Flex justify="space-between">
          <Flex align="center" gridGap={2}>
            <Text fontSize="14px">
              {trade.tradeType === TradeType.EXACT_INPUT ? t('Minimum received') : t('Maximum sold')}
            </Text>
            <QuestionHelper
              label={t(
                'Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.'
              )}
              ml="4px"
            />
          </Flex>
          <Flex>
            <Text fontSize="14px">
              {trade.tradeType === TradeType.EXACT_INPUT
                ? slippageAdjustedAmounts[SWAP_FIELD.OUTPUT]?.toSignificant(4) ?? '-'
                : slippageAdjustedAmounts[SWAP_FIELD.INPUT]?.toSignificant(4) ?? '-'}
            </Text>
            <Text fontSize="14px" marginLeft="4px">
              {trade.tradeType === TradeType.EXACT_INPUT
                ? trade.outputAmount.currency.symbol
                : trade.inputAmount.currency.symbol}
            </Text>
          </Flex>
        </Flex>
        <Flex justify="space-between">
          <Flex align="center" gridGap={2}>
            <Text fontSize="14px">{t('Price Impact')}</Text>
            <QuestionHelper
              label={t('The difference between the market price and your price due to trade size.')}
              ml="4px"
            />
          </Flex>
          <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
        </Flex>
        <Flex justify="space-between">
          <Flex align="center" gridGap={2}>
            <Text fontSize="14px">{t('Liquidity Provider Fee')}</Text>
            <QuestionHelper
              label={
                <>
                  <Text mb="12px">{t('For each trade a %amount% fee is paid', { amount: '0.25%' })}</Text>
                  <Text>- {t('%amount% to LP token holders', { amount: '0.17%' })}</Text>
                  <Text>- {t('%amount% to the Treasury', { amount: '0.03%' })}</Text>
                  <Text>- {t('%amount% towards LEGION buyback and burn', { amount: '0.05%' })}</Text>
                </>
              }
              ml="4px"
            />
          </Flex>
          <Text fontSize="14px">
            {realizedLPFee ? `${realizedLPFee?.toSignificant(6)} ${trade.inputAmount.currency.symbol}` : '-'}
          </Text>
        </Flex>
      </VStack>

      <Flex py="2">
        <Button
          colorScheme={severity > 2 ? 'legion.red' : 'primary'}
          color="white"
          rounded="2xl"
          onClick={onConfirm}
          disabled={disabledConfirm}
          mt="2"
          id="confirm-swap-or-send"
          width="full"
        >
          {severity > 2 ? t('Swap Anyway') : t('Confirm Swap')}
        </Button>

        {/* {swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null} */}
      </Flex>
    </>
  )
}
