// import LiveSwitch from '@app/components/Shared/LiveSwitch'
// import Apr, { AprProps } from './components/FarmTable/Apr'
// import Farm, { FarmProps } from './components/FarmTable/Farm'
// import Earned, { EarnedProps } from './components/FarmTable/Earned'
// import Details from './components/FarmTable/Details'
// import Liquidity, { LiquidityProps } from './components/FarmTable/Liquidity'
// import { MultiplierProps } from './components/FarmTable/Multiplier'
import BigNumber from 'bignumber.js'
import { ChainId } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { latinise } from '@app/utils/latinise'
import { RowProps } from './components/FarmTable/FarmTableRow'
import { Box } from '@chakra-ui/react'
import { getFarmApr } from '@app/utils/apr'
import { useWeb3React } from '@web3-react/core'
import { getBalanceNumber } from '@app/utils/formatBalance'
import { FarmTable, FarmHero } from './components'
import { FarmWithStakedValue } from './components/FarmCard/FarmCard' 
import { fetchFarmsPublicDataAsync } from '@app/store/farms'
import { useFarms, usePriceLegionBusd } from '@app/store/farms/hooks'
import { useCallback, useEffect, useState } from 'react'
import { DeserializedFarm, useAppDispatch } from '@app/store/typed'
import Background from './components/Background'


const getDisplayApr = (legionRewardsApr?: number, lpRewardsApr?: number) => {
  if (legionRewardsApr && lpRewardsApr) {
    return (legionRewardsApr + lpRewardsApr).toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  if (legionRewardsApr) {
    return legionRewardsApr.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  return null
}

const FarmsPageContent: React.FC = () => {
  const { account } = useWeb3React()
  const { data: farmsLP, userDataLoaded } = useFarms()
  const legionPrice = usePriceLegionBusd()
  const [query] = useState('')
  const userDataReady = !account || (!!account && userDataLoaded)
  const dispatch = useAppDispatch()
  const isActive = true
  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')

  const farmsList = useCallback(
    (farmsToDisplay: DeserializedFarm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteTokenPriceBusd) {
          return farm
        }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteTokenPriceBusd)
        const { legionRewardsApr, lpRewardsApr } = isActive
          ? getFarmApr(new BigNumber(farm.poolWeight), legionPrice, totalLiquidity, farm.lpAddresses[ChainId.MAINNET])
          : { legionRewardsApr: 0, lpRewardsApr: 0 }

        return { ...farm, apr: legionRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR
    },
    [legionPrice, query, isActive],
  )

  const chosenFarms = farmsList(activeFarms)
  
  const rowData = chosenFarms.map((farm) => {
    const { token, quoteToken } = farm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('LEGION', '')
    const row: RowProps = {
      apr: {
        value: getDisplayApr(farm.apr, farm.lpRewardsApr),
        pid: farm.pid,
        multiplier: farm.multiplier,
        lpLabel,
        lpSymbol: farm.lpSymbol,
        tokenAddress,
        quoteTokenAddress,
        legionPrice,
        originalValue: farm.apr,
      },
      farm: {
        label: lpLabel,
        pid: farm.pid,
        token: farm.token,
        quoteToken: farm.quoteToken,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    }

    return row
  })

  useEffect(() => {
    const fetchFarmData = async () => {
      try {
        await dispatch(fetchFarmsPublicDataAsync(farmsLP.map((farm) => farm.pid)))
      } catch (e) {
        console.error(e)
      }
    }

    if (farmsLP) {
      fetchFarmData()
    }
  }, [dispatch])

  // console.log(chosenFarms)

  return (
    <Box maxW="100%" py={100}>
      <Background>
        <Box pos={'relative'} px={5}>
          <FarmHero />
          {/* <Flex mt="16" align="center" gridGap="4" justifyContent="space-between" flexWrap={['wrap', 'nowrap']}>
            <LiveSwitch />
            <SortTable />
          </Flex> */}
          <FarmTable data={rowData} userDataReady={userDataReady} />
        </Box>
      </Background>
    </Box>
  )
}

export default FarmsPageContent