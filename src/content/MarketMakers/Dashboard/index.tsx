import { Box, Center, SimpleGrid, Text } from '@chakra-ui/react'
// import BannerItems from './components/BannerItems'
// import MarketMakerDashboardHero from './components/MarketMakerDashboardHero'
import NFTMinted from '@public/images/MarketMaker/Dashboard/nft_minted.png'
import TotalProfit from '@public/images/MarketMaker/Dashboard/total_profit.png'
import TotalMarketMaker from '@public/images/MarketMaker/Dashboard/total_market_maker.png'
import { useTranslation } from '@app/context'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useFetchDashboardQuery } from '@app/store/dashboard/dashboard-slice'
import DashboardCard from './components/DashboardCard'
import Background from './components/Background'
import LgnGic from '@public/images/MarketMaker/Dashboard/lgn_gic.png'
import Image from 'next/image'

const DashboardPageContent: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const {
    data: dashboardAll = { data: { nft_minted: 0, total_profit: 0, total_marketmaker: 0 } },
    isFetching: isDashboardFetching,
  } = useFetchDashboardQuery()

  const nftMinted = dashboardAll.data?.nft_minted ? dashboardAll.data.nft_minted : 0
  const totalProfit = dashboardAll.data?.total_profit ? dashboardAll.data.total_profit : 0
  const totalMarketMaker = dashboardAll.data?.total_marketmaker ? dashboardAll.data.total_marketmaker : 0

  return (
    <Box pos={'relative'} bg={'brand.bg.11'} minHeight={'100vh'}>
      <Background>
        <Box pos={'relative'} pt={['20vw', '20vw', '7vw']} pb={['15vw', '15vw', '3vw']} px={['3vw', '3vw', '4vw']}>
          {/* <MarketMakerDashboardHero /> */}
          <Box px={['0', '0', '6vw']}>
            {/* <Flex justifyContent={'center'} pt={['5vw', '5vw', '4vw']}>
              <BannerItems />
            </Flex> */}
            <Center>
              <Box pos={'relative'} w={['80vw', '80vw', '30vw']} pt={['12vw', '12vw', '4vw']}>
                <Image src={LgnGic} layout={'responsive'} sizes={'100%'} alt={''} placeholder={'blur'} />
              </Box>
            </Center>
            <Center mt={['11vw', '11vw', '4vw']}>
              <Center
                onClick={() => router.push('/buy-nft')}
                bg={'legion.light'}
                color={'legion.white'}
                fontSize={['4vw', '4vw', '1vw']}
                fontWeight={'bold'}
                maxH={['20vw', '20vw', '1vw']}
                px={['7vw', '7vw', '2vw']}
                py={['3.5vw', '3.5vw', '1.5vw']}
                textTransform={'capitalize'}
                borderRadius={['2vw', '2vw', '0.3vw']}
                cursor={'pointer'}
                // boxShadow={['1vw 1.5vw 2vw #888888', '1vw 1.5vw 2vw #888888', '0.1vw 0.3vw 0.5vw #888888']}
                _hover={{ bg: 'legion.dark' }}
              >
                {t('Buy NFT GICV Now')}
              </Center>
            </Center>
            <Center mt={['8vw', '8vw', '1.5vw']}>
              <Link href={'/buy-nft'} passHref>
                <Text
                  color={'legion.white'}
                  fontSize={['4vw', '4vw', '1vw']}
                  fontWeight={'bold'}
                  textTransform={'capitalize'}
                  cursor={'pointer'}
                  textDecoration={'underline'}
                  _hover={{ color: 'legion.gray.100' }}
                >
                  {t('Read About NFT Market Maker')}
                </Text>
              </Link>
            </Center>
            <SimpleGrid
              columns={[1, 1, 3]}
              gap={['6vw', '6vw', '2vw']}
              pos={'relative'}
              color={'legion.dark'}
              transition="200ms ease-in-out"
              px={['6vw', '6vw', '5vw']}
              mt={['110vw', '110vw', '4vw']}
            >
              <DashboardCard imageSrc={NFTMinted} title={'NFT Minted'} value={isDashboardFetching ? 0 : nftMinted} />
              <DashboardCard
                imageSrc={TotalProfit}
                title={'Total Profit'}
                value={isDashboardFetching ? 0 : totalProfit}
                prefix={'$'}
              />
              <DashboardCard
                imageSrc={TotalMarketMaker}
                title={'Total Market Maker'}
                value={isDashboardFetching ? 0 : totalMarketMaker}
              />
            </SimpleGrid>
          </Box>
        </Box>
      </Background>
    </Box>
  )
}

export default DashboardPageContent
