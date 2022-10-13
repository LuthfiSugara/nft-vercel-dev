import { Box } from '@chakra-ui/react'
// import LiveSwitch from '@app/components/Shared/LiveSwitch'
import { PoolsHero, PoolsCardContainer } from './components'
import { useFetchLegionVault, useFetchPublicPoolsData, useFetchUserPools, usePools } from '@app/store/pools/hooks'
import { useWeb3React } from '@web3-react/core'
import { usePollFarmsPublicData } from '@app/store/farms/hooks'
import { useMemo } from 'react'
import Background from './components/Background'
// import { DeserializedPool } from '@app/store/typed'
// import { getAprData } from './helpers'
// import Loading from '@app/components/Loading'
// import { useMemo } from 'react'

// const NUMBER_OF_POOLS_VISIBLE = 12

const PoolsPageContent: React.FC = () => {
  const { pools: poolsWithoutAutoVault, userDataLoaded } = usePools()
  // const [numberOfPoolsVisible, setNumberOfPoolsVisible] = useState(NUMBER_OF_POOLS_VISIBLE)
  const { account } = useWeb3React()

  usePollFarmsPublicData()
  useFetchLegionVault()
  useFetchPublicPoolsData()
  useFetchUserPools(account)

  // This function is used to build with auto vault

  const pools = useMemo(() => {
    // const legionPool = poolsWithoutAutoVault.find((pool) => pool.sousId === 0)
    // const legionAutoVault = { ...legionPool, isAutoVault: true }
    return [...poolsWithoutAutoVault]
  }, [poolsWithoutAutoVault])
  
  // console.log('pools:', pools)
  // console.log('account:', account)
  // console.log('userDataLoaded:', userDataLoaded)

  return (
    <Background>
      <Box pos={'relative'} py={['17vw', '17vw', '5vw']} px={['3vw', '3vw', '3vw']}>
        <PoolsHero />
        {/* <Grid gridGap={8} gridTemplateColumns={['repeat(3, 1fr)', 'repeat(2, 1fr)']}>
          <LegionBountyCard />

          <GridItem>
            <Button
              display={['block', 'none']}
              bgColor="legion.light"
              rounded="2xl"
              fontSize={['xs', 'md']}
              px="8"
              py="6"
              width="full"
              height="full"
            >
              Help
            </Button>
          </GridItem>

          <GridItem colSpan={[3, 2]}>
            <HStack justifyContent="center" spacing={4} alignItems="center">
              <LiveSwitch />
              <Button display={['none', 'flex']} bgColor="legion.light" rounded="2xl" px="8" py="6">
                <Text>Help</Text>
              </Button>
            </HStack>
          </GridItem>
        </Grid> */}
        <PoolsCardContainer pools={pools} account={account} userDataLoaded={userDataLoaded} />
      </Box>
    </Background>
  )
}

export default PoolsPageContent