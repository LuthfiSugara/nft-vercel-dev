import { Box, Divider, Flex, Skeleton, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import BuyNFTHero from './components/BuyNFTHero'
import { useTranslation } from '@app/context'
import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useFetchUserMarketMakers, useMarketMakers } from '@app/store/marketMakers/hooks'
import LuckyCard from './components/LuckyCard'
import BuyCardsContainer from './components/BuyCardsContainer'
import BuyCardsSkeleton from './components/BuyCards/Skeleton'
import { useFetchDisplayBuyQuery, useFetchDisplayHeaderBuyQuery } from '@app/store/buyNft/buy-nft-slice'

const BuyNFTPageContent: React.FC = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  useFetchUserMarketMakers(account)
  const { marketMakers, userDataLoaded } = useMarketMakers()
  const { data: displayHeaderBuyAll = { data: [] } } = useFetchDisplayHeaderBuyQuery()
  const [batchid, setBatchid] = useState<number | undefined>()
  const { data: displayBuyAll = { data: [] }, isFetching: isDisplayBuyFetching } = useFetchDisplayBuyQuery(batchid)
  const { data: displayHeaderBuy } = displayHeaderBuyAll
  const { data: displayBuy } = displayBuyAll

  useEffect(() => {
    if (displayHeaderBuyAll.data.length > 0) {
      setBatchid(displayHeaderBuyAll.data[0].batch_id)
    }
  }, [displayHeaderBuyAll.data])

  return (
    <Box
      // display={['none', 'none', 'inherit']}
      bg={'legion.bg'}
      minHeight={'100vh'}
      py={['20vw', '20vw', '7vw']}
      px={['3vw', '3vw', '4vw']}
    >
      <BuyNFTHero />
      <Box pos={'relative'} px={[0, 0, '3vw']} py={['5vw', '5vw', '3vw']}>
        <Tabs>
          <Box bg={'legion.dark'} borderRadius={['3vw', '3vw', '1vw']} py={['3vw', '3vw', '1vw']}>
            <Flex justifyContent={'center'} fontSize={['5vw', '5vw', '1.5vw']} fontWeight={'bold'}>
              <Text>{t('Season')}</Text>
            </Flex>
            <Box px={['3.5vw', '3.5vw', '10vw']} py={['2vw', '2vw', '0.5vw']}>
              <Divider h={'0.1vw'} bg={'white'} />
            </Box>
            <TabList borderBottom={'none'} justifyContent={'center'} px={'2vw'}>
              {displayHeaderBuy.length > 0
                ? displayHeaderBuy.map((_, idx) => (
                    <Tab
                      key={`headerItem__${idx}`}
                      onClick={() => setBatchid(_.batch_id)}
                      pb={['1.5vw', '1.5vw', '0.8vw']}
                      fontSize={['3vw', '3vw', '1vw']}
                      fontWeight={'bold'}
                      _focus={{}}
                      _selected={{
                        color: 'legion.primary',
                        borderBottom: '0.2vw solid',
                        borderColor: 'legion.primary',
                      }}
                      py={'0.5vw'}
                      px={'2vw'}
                      mb={0}
                    >
                      {t(_.batch_name)}
                    </Tab>
                  ))
                : [1, 2, 3].map((_, idx) => (
                    <Skeleton
                      key={`headerItemSkeleton__${idx}`}
                      startColor="legion.dark"
                      endColor="legion.red.200"
                      width={['25vw', '25vw', '10vw']}
                      height={['7vw', '7vw', '3vw']}
                      mx={['1.5vw', '1.5vw', '0.7vw']}
                    />
                  ))}
            </TabList>
          </Box>
          {batchid !== undefined && (
            <>
              <LuckyCard batchid={batchid} />
              <TabPanels color={'legion.dark'}>
                {isDisplayBuyFetching && displayBuy.length === 0 ? (
                  <BuyCardsSkeleton />
                ) : (
                  displayHeaderBuy.map((_, idx) => (
                    <TabPanel key={`mmCardItem__${idx}`} p={0}>
                      <BuyCardsContainer
                        marketMakers={marketMakers}
                        account={account}
                        userDataLoaded={userDataLoaded}
                        displayBuy={displayBuy}
                      />
                    </TabPanel>
                  ))
                )}
              </TabPanels>
            </>
          )}
        </Tabs>
      </Box>
    </Box>
  )
}

export default BuyNFTPageContent
