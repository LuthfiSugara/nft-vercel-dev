import OpenHistoryButton from '@app/components/Buttons/OpenHistoryButton'
import OpenSettingsButton from '@app/components/Buttons/OpenSettingsButton'
import FullPositionCard from '@app/components/Cards/CardPosition'
import { useTranslation } from '@app/context/Localization'
import { useActiveWeb3React, usePairs } from '@app/hooks'
import { toV2LiquidityToken, useTrackedTokenPairs } from '@app/store/user/hooks'
import { useTokenBalancesWithLoadingIndicator } from '@app/store/wallet/hooks'
import { Pair } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Text, VStack, Flex, ButtonGroup } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { memo, useMemo } from 'react'

const DefaultLiquidityContent = () => {
  const { account } = useActiveWeb3React()
  const router = useRouter()
  const { t } = useTranslation()
  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens]
  )
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const renderBody = () => {
    if (!account) {
      return (
        <Text color="textSubtle" textAlign="center">
          {t('Connect to a wallet to view your liquidity.')}
        </Text>
      )
    }
    if (v2IsLoading) {
      return (
        <Text color="textSubtle" textAlign="center">
          {t('Loading')}
        </Text>
      )
    }
    if (allV2PairsWithLiquidity?.length > 0) {
      return allV2PairsWithLiquidity.map((v2Pair, index) => (
        <FullPositionCard
          key={v2Pair.liquidityToken.address}
          pair={v2Pair}
          mb={index < allV2PairsWithLiquidity.length - 1 ? '16px' : 0}
        />
      ))
    }
    return (
      <Text color="textSubtle" textAlign="center">
        {t('No liquidity found.')}
      </Text>
    )
  }
  return (
    <VStack align="flex-start" spacing="6" flex="1 0 100%" backgroundColor="legion.dark" p="4" rounded="3xl">
      <Flex justify="space-between" align="center" w="full">
        <VStack align="stretch" spacing={[2]}>
          <Text fontSize={['lg', 'xl']} fontWeight="bold" letterSpacing="wide">
            {t('Your Liquidity')}
          </Text>
          <Text color="legion.gray.200" fontSize={['sm', 'md']}>
            {t('Remove liquidity to receive tokens back')}
          </Text>
        </VStack>
        <ButtonGroup variant="ghost">
          <OpenSettingsButton />
          <OpenHistoryButton />
        </ButtonGroup>
      </Flex>
      <Box bg="blackAlpha.400" w="full" p="6">
        {renderBody()}
        {account && !v2IsLoading && (
          <Flex flexDirection="column" alignItems="center" mt="24px">
            <Text color="textSubtle" mb="8px">
              {t("Don't see a pool you joined?")}
            </Text>
            <Button
              onClick={() => router.push(`/find`, undefined)}
              colorScheme="primary"
              rounded="3xl"
              size="sm"
              variant="outline"
              // as={Link} href="/find"
            >
              {t('Find other LP tokens')}
            </Button>
          </Flex>
        )}
      </Box>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="primary"
        color="white"
        variant="solid"
        onClick={() => router.push('/add')}
        w="full"
        py="6"
        rounded="2xl"
      >
        {t('Add Liquidity')}
      </Button>
    </VStack>
  )
}

export default memo(DefaultLiquidityContent)
