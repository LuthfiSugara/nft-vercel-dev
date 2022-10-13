import { Box, Center, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from '@app/context'
import Image from 'next/image'
import { useFetchDisplayRarityNFTQuery } from '@app/store/buyNft/buy-nft-slice'

const LuckyCard = ({ batchid }) => {
  const { t } = useTranslation()
  const {
    data: rarityNFT = {
      data: {
        id: 0,
        name: 'Special NFT',
        philosophy: '',
        batch_detail_images: [],
      },
    },
    isFetching: isFetchingRarityNFT,
  } = useFetchDisplayRarityNFTQuery(batchid)
  return (
    <Box
      bgColor={'legion.red.200'}
      py={['5vw', '5vw', '1vw']}
      px={['3vw', '3vw', '1vw']}
      borderRadius={['3vw', '3vw', '1vw']}
      my={['5vw', '5vw', '2vw']}
    >
      <Grid
        templateRows={'repeat(1, 1fr)'}
        templateColumns={['repeat(3, 1fr)', 'repeat(3, 1fr)', 'repeat(8, 1fr)']}
        columnGap={['0.5vw', '0.5vw', '1.7vw']}
      >
        <GridItem display={'flex'} alignItems={'center'} rowSpan={1} colSpan={[3, 3, 5]} fontWeight={'bold'}>
          <Box width={'100%'}>
            <Text align={['center', 'center', 'start']} fontSize={['4vw', '4vw', '1.3vw']}>
              {t('Have a chance to get 3 NFT Market Maker Special')}
            </Text>
            <Text fontSize={['3vw', '3vw', '0.8vw']} color={'legion.primary'} mt={['3vw', '3vw', '1vw']}>
              {t('Rare')}
            </Text>
            <Flex fontSize={['3vw', '3vw', '0.8vw']}>
              <Text align={'justify'}>
                {t(
                  'Rare : This Rare type is the one that will give you a reward of 20% of the difference in % profit sharing market makers so as to generate 20%.'
                )}
              </Text>
            </Flex>
            <Text fontSize={['3vw', '3vw', '0.8vw']} color={'legion.primary'} mt={['3vw', '3vw', '0.5vw']}>
              {t('Epic')}
            </Text>
            <Flex fontSize={['3vw', '3vw', '0.8vw']}>
              <Text align={'justify'}>
                {t(
                  "For the Epic type, you will get a reward of 35% of the difference in % of the Market Maker's profit sharing."
                )}
              </Text>
            </Flex>
            <Flex fontSize={['3vw', '3vw', '0.8vw']} mt={['3vw', '3vw', '0.5vw']}>
              <Text color={'legion.primary'}>{t('Legendary :')}</Text>
              <Text mx={'0.2vw'}>{t('No Charge (slip page)')}</Text>
            </Flex>
            <Flex fontSize={['3vw', '3vw', '0.8vw']}>
              <Text align={'justify'}>
                {t(
                  "Being the most superior type of NFT from GIC Verse. The advantage is that you will get a reward of 45% of the difference in % of the Market Maker's profit sharing."
                )}
              </Text>
            </Flex>
          </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={3} display={'flex'} alignItems={'center'} pt={['5vw', '5vw', 0]}>
          <Box w={'100%'}>
            <Text align={'center'} fontSize={['5vw', '5vw', '1.7vw']} fontWeight={'semibold'}>
              {rarityNFT.data.name}
            </Text>
            <Grid
              templateRows={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)']}
              templateColumns={['repeat(3, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']}
              mt={['3vw', '3vw', '1.3vw']}
            >
              {!isFetchingRarityNFT && rarityNFT.data.batch_detail_images.length > 0
                ? rarityNFT.data.batch_detail_images.map((_, idx) => (
                    <GridItem
                      key={`rarityNFT__data__${idx}`}
                      display={'flex'}
                      alignItems={'center'}
                      rowSpan={1}
                      colSpan={1}
                      fontSize={['3.5vw', '3.5vw', '0.9vw']}
                      fontWeight={'bold'}
                    >
                      <Box w={'100%'}>
                        <Center>
                          <Center
                            pos={'relative'}
                            bgColor={'legion.light'}
                            border={'0.1vw solid rgba(255, 255, 255, 0.9)'}
                            w={['25vw', '25vw', '7.5vw']}
                            h={['25vw', '25vw', '7.5vw']}
                            borderRadius={'0.5vw'}
                            overflow={'hidden'}
                          >
                            <Image src={_.image} layout="fill" objectFit="contain" alt={''} />
                          </Center>
                        </Center>
                        <Center mt={['2vw', '2vw', '0.8vw']}>
                          <Center
                            pos={'relative'}
                            w={['7vw', '7vw', '2vw']}
                            h={['7vw', '7vw', '2vw']}
                            overflow={'hidden'}
                            mr={['1vw', '1vw', '0.2vw']}
                          >
                            <Image src={_.market_rarity.image} layout="fill" objectFit="contain" alt={''} />
                          </Center>
                          <Text align={'center'} fontSize={['3vw', '3vw', '0.9vw']}>
                            {_.market_rarity.name}
                          </Text>
                        </Center>
                      </Box>
                    </GridItem>
                  ))
                : [...Array(3)].map((_, idx) => (
                    <GridItem
                      key={`array__data__${idx}`}
                      display={'flex'}
                      alignItems={'center'}
                      rowSpan={1}
                      colSpan={1}
                      fontSize={['3.5vw', '3.5vw', '0.9vw']}
                      fontWeight={'bold'}
                    >
                      <Box w={'100%'}>
                        <Center>
                          <Center
                            pos={'relative'}
                            bgColor={'legion.light'}
                            border={'0.1vw solid rgba(255, 255, 255, 0.9)'}
                            w={['25vw', '25vw', '7.5vw']}
                            h={['25vw', '25vw', '7.5vw']}
                            borderRadius={'0.5vw'}
                            overflow={'hidden'}
                          ></Center>
                        </Center>
                        <Center mt={['2vw', '2vw', '0.8vw']}>
                          <Center
                            pos={'relative'}
                            w={['7vw', '7vw', '2vw']}
                            h={['7vw', '7vw', '2vw']}
                            overflow={'hidden'}
                            mr={['1vw', '1vw', '0.2vw']}
                          ></Center>
                        </Center>
                      </Box>
                    </GridItem>
                  ))}
            </Grid>
          </Box>
        </GridItem>

        {/* {!isFetchingRarityImage && rarityImage.data.length > 0 ? (
          rarityImage.data.map((_, idx) => (
            <GridItem
              key={`rarityImage__data__${idx}`}
              display={'flex'}
              alignItems={'center'}
              rowSpan={1}
              colSpan={1}
              fontSize={['3.5vw', '3.5vw', '0.9vw']}
              fontWeight={'bold'}
              px={['1vw', '0.5vw', '0.5vw']}
            >
              <Box w={'100%'}>
                <Text align={'center'}>
                  {_.name} #{_.id}
                </Text>
                <Center
                  pos={'relative'}
                  bgColor={'legion.light'}
                  border={'0.1vw solid rgba(255, 255, 255, 0.9)'}
                  w={'100%'}
                  h={['30vw', '7.7vw', '7.7vw']}
                  borderRadius={'0.5vw'}
                  overflow={'hidden'}
                  mt={['1vw', '1vw', '0.5vw']}
                >
                  <Image src={_.image} layout="fill" objectFit="contain" alt={''} />
                </Center>
              </Box>
            </GridItem>
          ))
        ) : (
          <></>
        )} */}
      </Grid>
    </Box>
  )
}

export default LuckyCard
