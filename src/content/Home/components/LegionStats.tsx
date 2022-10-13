// import { legionStats } from '@app/mocks'
import { GridItem, Text, Box, VStack, Flex, Heading, Skeleton } from '@chakra-ui/react'
import { usePriceLegionBusd } from '@app/store/farms/hooks'
import { useBurnedBalance, useTotalMinted, useTotalSupply } from '@app/hooks/useTokenBalance'
import { formatLocalisedCompactNumber, getBalanceNumber } from '@app/utils/formatBalance'
import tokens from '@app/config/constants/tokens'
import { useTranslation } from '@app/context/Localization'
import { useEffect } from 'react'
import { useAppDispatch } from '@app/store/typed'
import { fetchFarmsPublicDataAsync, nonArchivedFarms } from '@app/store/farms'
import Balance from '@app/components/Balance'


const LegionStats = () => {
  const dispatch = useAppDispatch()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(tokens.legion.address))
  const totalMinted = useTotalMinted()
  const legionSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0
  const legionPriceBusd = usePriceLegionBusd()
  const mcap = legionPriceBusd.times(legionSupply)
  const mcapString = formatLocalisedCompactNumber(mcap.toNumber())
  const { t } = useTranslation()

  useEffect(() => {
    const fetchFarmData = async () => {
      const activeFarms = nonArchivedFarms.filter((farm) => farm.pid !== 0)
      try {
        await dispatch(fetchFarmsPublicDataAsync(activeFarms.map((farm) => farm.pid)))
      } catch (e) {
        console.error(e)
      }
    }

    if (nonArchivedFarms) {
      fetchFarmData()
    }
  }, [dispatch])

  return (
    <GridItem rowSpan={2}>
      <Box position={'relative'} bg="legion.dark" px="8" py="8" rounded="3xl">
        <Heading fontSize={['36px', '40px']} lineHeight={['54px', '60px']}>
          LEGION Stats
        </Heading>
        <VStack mt="4">
          {/* {legionStats.map((stat, idx) => (
            <Flex key={idx} width="full" align="center" justify="space-between" fontSize="sm" fontWeight="bold">
              <Text color="legion.secondary">{stat.label}</Text>
              <Text>{stat.value}</Text>
            </Flex>
          ))} */}
          <Flex width="full" align="center" justify="space-between" fontWeight="bold">
            <Text color="legion.secondary" fontWeight="bold" letterSpacing="wide">
              {t('Market Cap')}
            </Text>
            {mcap?.gt(0) && mcapString ? (
              <Text textTransform="uppercase" fontWeight="bold" letterSpacing="wide">
                {t('$%marketCap%', { marketCap: mcapString })}
              </Text>
            ) : (
              <Skeleton height={7} width={150} />
            )}
          </Flex>
          <Flex width="full" align="center" justify="space-between" fontWeight="bold">
            <Text color="legion.secondary" fontWeight="bold" letterSpacing="wide">
              {t('Total Supply')}
            </Text>
            {legionSupply ? (
              <Balance decimals={0} lineHeight="1.1" value={legionSupply} />
            ) : (
              <Skeleton height={7} width={150} />
            )}
          </Flex>
          <Flex width="full" align="center" justify="space-between" fontWeight="bold">
            <Text color="legion.secondary" fontWeight="bold" letterSpacing="wide">
              {t('Total Burned')}
            </Text>
            {burnedBalance ? (
              <Balance decimals={0} lineHeight="1.1" value={burnedBalance} />
            ) : (
              <Balance decimals={0} lineHeight="1.1" value={0} />
            )}
          </Flex>
          <Flex width="full" align="center" justify="space-between" fontWeight="bold">
            <Text color="legion.secondary" fontWeight="bold" letterSpacing="wide">
              {t('Current Emission')}
            </Text>
            {totalMinted ? (
              <>
                <Balance decimals={0} lineHeight="1.1" value={Number(totalMinted)} unit={"/BLOCK"} />
              </>
            ) : (
              <Balance decimals={0} lineHeight="1.1" value={0} />
            )}
          </Flex>
        </VStack>
      </Box>
    </GridItem>
  )
}

export default LegionStats
