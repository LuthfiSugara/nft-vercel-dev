import QuestionHelper from '@app/components/Shared/QuestionHelper'
import { useTranslation } from '@app/context'
import { SWAP_FIELD } from '@app/store/swap/actions'
import { useUserSlippageTolerance } from '@app/store/user/hooks'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown } from '@app/utils/prices'
import { Trade, TradeType } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { Flex, Text, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import FormattedPriceImpact from './FormattedPriceImpact'
import SwapRoute from './SwapRoute'

export interface AdvancedSwapDetailsProps {
  trade?: Trade
}

export const AdvancedSwapDetails: FC<AdvancedSwapDetailsProps> = ({ trade }) => {
  const [allowedSlippage] = useUserSlippageTolerance()
  const { t } = useTranslation()
  const showRoute = Boolean(trade && trade.route.path.length > 2)
  return (
    <VStack mt={2}>
      {trade && (
        <>
          {showRoute && (
            <>
              <Flex color={'legion.light'} fontWeight={'bold'} gridColumnGap={2} align="center" justify="space-between" p={3}>
                <SwapRoute trade={trade} />
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <QuestionHelper label={t('Routing through these tokens resulted in the best price for your trade.')}>
                    <Text fontSize="14px" color="textSubtle">
                      {t('Route')}
                    </Text>
                  </QuestionHelper>
                </span>
              </Flex>
            </>
          )}
          <TradeSummary trade={trade} allowedSlippage={allowedSlippage} />
        </>
      )}
    </VStack>
  )
}

function TradeSummary({ trade, allowedSlippage }: { trade: Trade; allowedSlippage: number }) {
  const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
  const { t } = useTranslation()
  const isExactIn = trade.tradeType === TradeType.EXACT_INPUT
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage)

  return (
    <VStack align="stretch" w="full" p="4" bg="legion.light" rounded="2xl">
      <Flex justify="space-between">
        <Flex gridColumnGap={2} align="center">
          <Text fontSize="14px" color="textSubtle">
            {isExactIn ? t('Minimum received') : t('Maximum sold')}
          </Text>
          <QuestionHelper
            label={t(
              'Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.'
            )}
          />
        </Flex>
        <Flex>
          <Text fontSize="14px">
            {isExactIn
              ? `${slippageAdjustedAmounts[SWAP_FIELD.OUTPUT]?.toSignificant(4)} ${
                  trade.outputAmount.currency.symbol
                }` ?? '-'
              : `${slippageAdjustedAmounts[SWAP_FIELD.INPUT]?.toSignificant(4)} ${trade.inputAmount.currency.symbol}` ??
                '-'}
          </Text>
        </Flex>
      </Flex>
      <Flex justify="space-between">
        <Flex gridColumnGap={2} align="center">
          <Text fontSize="14px" color="textSubtle">
            {t('Price Impact')}
          </Text>
          <QuestionHelper label={t('The difference between the market price and estimated price due to trade size.')} />
        </Flex>
        <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
      </Flex>

      <Flex justify="space-between">
        <Flex gridColumnGap={2} align="center">
          <Text fontSize="14px" color="textSubtle">
            {t('Liquidity Provider Fee')}
          </Text>
          <QuestionHelper
            label={
              <>
                <Text mb="4">{'For each trade a 0.25% fee is paid'}</Text>
                <Text>- {'0.17% to LP token holders'}</Text>
                <Text>- {'0.03% to the Treasury'}</Text>
                <Text>- {'0.05% towards LEGION buyback and burn'}</Text>
              </>
            }
          />
        </Flex>
        <Text fontSize="14px">
          {realizedLPFee ? `${realizedLPFee.toSignificant(4)} ${trade.inputAmount.currency.symbol}` : '-'}
        </Text>
      </Flex>
    </VStack>
  )
}
