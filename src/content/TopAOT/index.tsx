import { useTranslation } from '@app/context'
import { Box, Button, Center, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import CollectionsCard from './Collections/CollectionsCard'
import { buyers, collections, sellers } from '@app/mocks/AOTMocks'
import CollectionsHeader from './Collections/CollectionsHeader'
import BuyersHeader from './Buyers/BuyersHeader'
import BuyersCard from './Buyers/BuyersCard'
import SellersHeader from './Sellers/SellersHeader'
import SellersCard from './Sellers/SellersCard'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ITopAOTProps {}

const TopAOT: React.FunctionComponent<ITopAOTProps> = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { tab } = router.query
  const tabMenu = ['collections', 'buyers', 'sellers']
  return (
    <Box px={'15vw'} pt={'2.7vw'}>
      {tabMenu.includes(tab?.toString()) ? (
        <>
          <HStack spacing={'1vw'} justifyContent={'center'}>
            <Text align={'center'} fontSize={'2.8vw'} fontWeight={'extrabold'}>
              {t(`Top ${tab.toString().charAt(0).toUpperCase() + tab.toString().slice(1)}`)}
            </Text>
            <Text align={'center'} fontSize={'1.5vw'} fontWeight={'bold'} pt={'1.5vw'}>
              {t('All of time')}
            </Text>
          </HStack>
          <Tabs defaultIndex={tabMenu.indexOf(tab?.toString())} mt={'2vw'}>
            <TabList borderBottom={'none'} justifyContent={'center'} px={'2vw'}>
              {tabMenu.map((_, idx) => (
                <Tab
                  key={`tab__menu__item__${idx}`}
                  onClick={() => router.push(`/top-aot?tab=${_}`)}
                  pb={['1.5vw', '1.5vw', '0.8vw']}
                  fontSize={['3vw', '3vw', '1vw']}
                  fontWeight={'bold'}
                  _focus={{}}
                  _selected={{
                    color: 'gicv.primary',
                    borderBottom: '0.2vw solid',
                    borderColor: 'gicv.primary',
                  }}
                  py={'0.5vw'}
                  px={'2vw'}
                >
                  {t(_.charAt(0).toUpperCase() + _.slice(1))}
                </Tab>
              ))}
            </TabList>
            <TabPanels fontSize={'1vw'} fontWeight={'bold'} mt={'2.5vw'}>
              <TabPanel p={0}>
                <CollectionsHeader />
                {collections.map((_, idx) => (
                  <CollectionsCard
                    key={`mmCardItem__${idx}`}
                    rank={_.rank}
                    img={_.img}
                    name={_.name}
                    owner={_.owner}
                    nftsSold={_.nfts_sold}
                    volume={_.volume}
                    floorPrice={_.floor_price}
                  />
                ))}
                <Center>
                  <Button
                    variant={'outline'}
                    fontSize={['1vw', '1vw', '1vw']}
                    color={'gicv.gray.900'}
                    px={['1vw', '1vw', '2.5vw']}
                    h={'3vw'}
                    border={'0.1vw solid'}
                    borderColor={'gicv.gray.500'}
                    borderRadius={'0.3vw'}
                    mt={'2vw'}
                  >
                    {t('Load More')}
                  </Button>
                </Center>
              </TabPanel>
              <TabPanel p={0}>
                <BuyersHeader />
                {buyers.map((_, idx) => (
                  <BuyersCard
                    key={`mmCardItem__${idx}`}
                    rank={_.rank}
                    img={_.img}
                    name={_.name}
                    nftsBought={_.nfts_bought}
                    totalPurchase={_.total_purchase}
                  />
                ))}
                <Center>
                  <Button
                    variant={'outline'}
                    fontSize={['1vw', '1vw', '1vw']}
                    color={'gicv.gray.900'}
                    px={['1vw', '1vw', '2.5vw']}
                    h={'3vw'}
                    border={'0.1vw solid'}
                    borderColor={'gicv.gray.500'}
                    borderRadius={'0.3vw'}
                    mt={'2vw'}
                  >
                    {t('Load More')}
                  </Button>
                </Center>
              </TabPanel>
              <TabPanel p={0}>
                <SellersHeader />
                {sellers.map((_, idx) => (
                  <SellersCard
                    key={`mmCardItem__${idx}`}
                    rank={_.rank}
                    img={_.img}
                    name={_.name}
                    nftsSold={_.nfts_sold}
                    totalSales={_.total_sales}
                  />
                ))}
                <Center>
                  <Button
                    variant={'outline'}
                    fontSize={['1vw', '1vw', '1vw']}
                    color={'gicv.gray.900'}
                    px={['1vw', '1vw', '2.5vw']}
                    h={'3vw'}
                    border={'0.1vw solid'}
                    borderColor={'gicv.gray.500'}
                    borderRadius={'0.3vw'}
                    mt={'2vw'}
                  >
                    {t('Load More')}
                  </Button>
                </Center>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      ) : (
        <></>
      )}
    </Box>
  )
}

export default TopAOT
