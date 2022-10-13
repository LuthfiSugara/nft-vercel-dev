// import { useEffect, useState } from 'react'
import { Box, Grid, GridItem, Text} from '@chakra-ui/react'
// import { usePriceLegionBusd } from '@app/store/farms/hooks'
// import { useBurnedBalance, useTotalSupply } from '@app/hooks/useTokenBalance'
// import { formatLocalisedCompactNumber, getBalanceNumber } from '@app/utils/formatBalance'
// import tokens from '@app/config/constants/tokens'
import { useTranslation } from '@app/context/Localization'
// import { useAppDispatch } from '@app/store/typed'
// import { fetchFarmsPublicDataAsync, nonArchivedFarms } from '@app/store/farms'
import Balance from '@app/components/Balance'
import { RowProps } from '@app/content/Farms/components/FarmTable/FarmTableRow'

interface IStatsProps{
  data?: RowProps[]
}

const Stats: React.FC<IStatsProps> = () => {
  // for total value locked
  // const { data } = props
  // const [tvl, setTvl] = useState(0)
  
  // for market cap and total supply details
  // const dispatch = useAppDispatch()
  // const totalSupply = useTotalSupply()
  // const burnedBalance = getBalanceNumber(useBurnedBalance(tokens.legion.address))
  // const legionSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0
  // const legionPriceBusd = usePriceLegionBusd()
  // const mcap = legionPriceBusd.times(legionSupply)
  // const mcapString = formatLocalisedCompactNumber(mcap.toNumber())
  const { t } = useTranslation()

  // for total value locked
  // const calcTotalValueLocked = () => {
  //   let totalValueLocked = 0
  //   data.map(data => {
  //     const liquidity = data.liquidity.liquidity
  //     liquidity !=undefined ? (totalValueLocked += Number(liquidity)
  //     ) : (
  //       totalValueLocked += 0
  //     )
  //   })
  //   setTvl(totalValueLocked)
  // }

  // useEffect(() => {
  //   calcTotalValueLocked()
  // }, [data])

  // for market cap and total supply details
  // useEffect(() => {
  //   const fetchFarmData = async () => {
  //     const activeFarms = nonArchivedFarms.filter((farm) => farm.pid !== 0)
  //     try {
  //       await dispatch(fetchFarmsPublicDataAsync(activeFarms.map((farm) => farm.pid)))
  //     } catch (e) {
  //       console.error(e)
  //     }
  //   }
  //   if (nonArchivedFarms) {
  //     fetchFarmData()
  //   }
  // }, [dispatch])
  
  return (
    <Box pos={'relative'} display={'flex'} justifyContent={'center'} transition="200ms ease-in-out" px={['4vw', '4vw', '6vw']}>
      <Box pos={'relative'} w={'100%'} bg={'linear-gradient(289.94deg, #FFB55A 33.14%, #9D0208 71.94%);'} borderRadius={['5vw', '5vw', '1vw']} p={['1.5vw', '1.5vw', '0.6vw']}>
        <Box pos={'relative'} w={'100%'} h={'100%'} bg={'legion.dark'} borderRadius={['5vw', '5vw', '1vw']} px={['8vw', '8vw', 0]} py={['2vw', '2vw', '1.5vw']}>
          <Grid
            templateRows={['repeat(3, 1fr)', 'repeat(3, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)']}
            templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']}
          >
            <GridItem rowSpan={1} colSpan={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Box w={'100%'} py={['9vw', '9vw', '0.1vw']}>
                <Text textAlign={'center'} fontSize={['5vw', '5vw', '1.3vw']} fontWeight={'medium'}>
                  {t('Total Value Locked')}
                </Text>
                <Balance value={0} prefix={'$'} decimals={0} textAlign={'center'} fontSize={['7vw' , '7vw', '1.5vw']} fontWeight={'extrabold'} mt={['2vw', '2vw', '0.5vw']}/>
                {/* {tvl > 0 ? (
                  <Balance value={tvl} prefix={'$'} decimals={0} textAlign={'center'} fontSize={['7vw' , '7vw', '1.5vw']} fontWeight={'extrabold'} mt={['2vw', '2vw', '0.5vw']}/>
                ) : (
                  <Box display={'flex'} justifyContent={'center'} mt={['2vw', '2vw', '0.5vw']}>
                    <Skeleton height={['10.5vw', '10.5vw', '2.2vw']} width={['50vw', '50vw', '12vw']} />
                  </Box>
                )} */}
              </Box>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Box 
                w={'100%'}
                borderBlock={['0.6vw solid white', '0.6vw solid white', 'none', 'none']} 
                borderInline={['none', 'none', '0.1vw solid white', '0.1vw solid white']}
                py={['9vw', '9vw', '0.1vw']} 
              >
                <Text textAlign={'center'} fontSize={['5vw', '5vw', '1.3vw']} fontWeight={'medium'}>
                  {t('Market Cap')}
                </Text>
                <Balance value={0} prefix={'$'} decimals={0} textAlign={'center'} fontSize={['7vw' , '7vw', '1.5vw']} fontWeight={'extrabold'} mt={['2vw', '2vw', '0.5vw']}/>
                {/* {mcap?.gt(0) && mcapString ? (
                  <Text textAlign={'center'} textTransform={'uppercase'} fontSize={['7vw' , '7vw', '1.5vw']} fontWeight={'extrabold'} mt={['2vw', '2vw', '0.5vw']}>
                    {t('$%marketCap%', { marketCap: mcapString })}
                  </Text>
                ) : (
                  <Box display={'flex'} justifyContent={'center'} mt={['2vw', '2vw', '0.5vw']}>
                    <Skeleton height={['10.5vw', '10.5vw', '2.2vw']} width={['50vw', '50vw', '12vw']} />
                  </Box>
                )} */}
              </Box>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Box w={'100%'} py={['9vw', '9vw', '0.1vw']}>
                <Text textAlign={'center'} fontSize={['5vw', '5vw', '1.3vw']} fontWeight={'medium'}>{t('Total Supply')}</Text>
                <Balance value={0} decimals={0} textAlign={'center'} fontSize={['7vw' , '7vw', '1.5vw']} fontWeight={'extrabold'} mt={['2vw', '2vw', '0.5vw']} />
                {/* {legionSupply ? (
                  <Balance value={legionSupply} decimals={0} textAlign={'center'} fontSize={['7vw' , '7vw', '1.5vw']} fontWeight={'extrabold'} mt={['2vw', '2vw', '0.5vw']} />
                ) : (
                  <Box display={'flex'} justifyContent={'center'} mt={['2vw', '2vw', '0.5vw']}>
                    <Skeleton height={['10.5vw', '10.5vw', '2.2vw']} width={['50vw', '50vw', '12vw']} />
                  </Box>
                )} */}
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default Stats
