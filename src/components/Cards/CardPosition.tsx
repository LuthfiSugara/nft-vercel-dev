import React, { FC, useState } from 'react'
import { JSBI, Pair, Percent } from '@aulyaaryansyah/legionswap-sdk-mainnet'

import styled from '@emotion/styled'
import useActiveWeb3React from '@app/hooks/useActiveWeb3React'
import useTotalSupply from '../../hooks/useTotalSupply'

import { useTokenBalance } from '@app/store/wallet/hooks'
import { unwrappedToken } from '../../utils/wrappedCurrency'

import CurrencyLogo from '../Currency/CurrencyLogo'
import DoubleCurrencyLogo from '../Currency/DoubleCurrencyLogo'
import { BIG_INT_ZERO } from '../../config/constants'
import { Box, BoxProps, Button, Collapse, Flex, Spinner, Text, VStack } from '@chakra-ui/react'
import { AddIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { useTranslation } from '@app/context/Localization'
import { parseCurrencyId } from '@app/utils/currencyId'
import { useRouter } from 'next/router'

const FixedHeightRow = styled(Flex)`
  height: 24px;
  justify-content: space-between;
`

interface PositionCardProps extends BoxProps {
  pair: Pair
  showUnwrapped?: boolean
}

export const MinimalPositionCard: FC<PositionCardProps> = ({ pair, showUnwrapped = false }) => {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  const currency0 = showUnwrapped ? pair.token0 : unwrappedToken(pair.token0)
  const currency1 = showUnwrapped ? pair.token1 : unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const poolTokenPercentage =
    !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  return (
    <>
      {userPoolBalance && JSBI.greaterThan(userPoolBalance.raw, JSBI.BigInt(0)) ? (
        <Box w="full" p="4" bg="legion.dark" rounded="2xl" borderWidth="1px" borderColor="legion.light">
          <VStack spacing="4" align="stretch">
            <FixedHeightRow w="full">
              <Flex>
                <Text color="legion.gray.200" fontWeight="bold">
                  {t('LP tokens in your wallet')}
                </Text>
              </Flex>
            </FixedHeightRow>
            <FixedHeightRow onClick={() => setShowMore(!showMore)}>
              <Flex align="center">
                <DoubleCurrencyLogo currency0={currency0} currency1={currency1} margin size={20} />
                <Text color="legion.secondary">
                  {currency0.symbol}-{currency1.symbol} LP
                </Text>
              </Flex>
              <Flex>
                <Text color="legion.gray.200">{userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}</Text>
              </Flex>
            </FixedHeightRow>
            <VStack spacing="2" align="stretch" w="full">
              <FixedHeightRow>
                <Text color="legion.secondary">{t('Share of Pool')}:</Text>
                <Text color="legion.gray.200">{poolTokenPercentage ? `${poolTokenPercentage.toFixed(6)}%` : '-'}</Text>
              </FixedHeightRow>
              <FixedHeightRow>
                <Text color="legion.secondary">{t('Pooled %asset%', { asset: currency0.symbol })}:</Text>
                {token0Deposited ? (
                  <Flex>
                    <Text color="legion.gray.200">{token0Deposited?.toSignificant(6)}</Text>
                  </Flex>
                ) : (
                  '-'
                )}
              </FixedHeightRow>
              <FixedHeightRow>
                <Text color="legion.secondary">{`Pooled ${currency1.symbol}`}:</Text>
                {token1Deposited ? (
                  <Flex>
                    <Text color="legion.gray.200">{token1Deposited?.toSignificant(6)}</Text>
                  </Flex>
                ) : (
                  '-'
                )}
              </FixedHeightRow>
            </VStack>
          </VStack>
        </Box>
      ) : (
        <Box p="4" bg="legion.dark" rounded="2xl">
          <Text fontSize="14px" style={{ textAlign: 'center' }}>
            <span role="img" aria-label="pancake-icon">
              🥞
            </span>{' '}
            {t(
              "By adding liquidity you'll earn 0.17% of all trades on this pair proportional to your share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity."
            )}
          </Text>
        </Box>
      )}
    </>
  )
}

export default function FullPositionCard({ pair, ...props }: PositionCardProps) {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  const currency0 = unwrappedToken(pair.token0)
  const currency1 = unwrappedToken(pair.token1)
  const router = useRouter()
  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const poolTokenPercentage =
    !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  return (
    <Box rounded="3xl" {...props} bg="legion.dark" boxShadow="2xl">
      <Flex justifyContent="space-between" role="button" onClick={() => setShowMore(!showMore)} p="16px" align="center">
        <Flex flexDirection="column">
          <Flex alignItems="center" mb="2">
            <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={20} />
            <Text ml="8px">{!currency0 || !currency1 ? <Spinner /> : `${currency0.symbol}/${currency1.symbol}`}</Text>
          </Flex>
          <Text fontSize="14px" color="legion.gray.200">
            {userPoolBalance?.toSignificant(4)}
          </Text>
        </Flex>
        {showMore ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </Flex>

      <Collapse in={showMore}>
        <VStack spacing="4" p="4" align="stretch">
          <FixedHeightRow justify="space-between">
            <Flex align="center">
              <CurrencyLogo size={20} currency={currency0} />
              <Text color="legion.gray.200" ml="4px">
                Pooled {currency0.symbol}
              </Text>
            </Flex>
            {token0Deposited ? (
              <Flex>
                <Text ml="6px">{token0Deposited?.toSignificant(6)}</Text>
              </Flex>
            ) : (
              '-'
            )}
          </FixedHeightRow>

          <FixedHeightRow justify="space-between">
            <Flex align="center">
              <CurrencyLogo size={20} currency={currency1} />
              <Text color="legion.gray.200" ml="4px">
                Pooled {currency1.symbol}
              </Text>
            </Flex>
            {token1Deposited ? (
              <Flex>
                <Text ml="6px">{token1Deposited?.toSignificant(6)}</Text>
              </Flex>
            ) : (
              '-'
            )}
          </FixedHeightRow>

          <FixedHeightRow justify="space-between">
            <Text color="legion.gray.200">{t('Share of pool')}</Text>
            <Text>
              {poolTokenPercentage
                ? `${poolTokenPercentage.toFixed(2) === '0.00' ? '<0.01' : poolTokenPercentage.toFixed(2)}%`
                : '-'}
            </Text>
          </FixedHeightRow>

          {userPoolBalance && JSBI.greaterThan(userPoolBalance.raw, BIG_INT_ZERO) && (
            <Flex flexDirection="column">
              <Button
                onClick={() =>
                  router.push(`/remove/${parseCurrencyId(currency0)}/${parseCurrencyId(currency1)}`, undefined)
                }
                colorScheme="primary"
                width="full"
                mb="8px"
                color="white"
              >
                {t('Remove')}
              </Button>
              <Button
                onClick={() =>
                  router.push(
                    `/add?currencyIdA=${parseCurrencyId(currency0)}&currencyIdB=${parseCurrencyId(currency1)}`,
                    undefined
                  )
                }
                colorScheme="primary"
                variant="ghost"
                leftIcon={<AddIcon color="primary" />}
                width="full"
              >
                {t('Add liquidity instead')}
              </Button>
            </Flex>
          )}
        </VStack>
      </Collapse>
    </Box>
  )
}
