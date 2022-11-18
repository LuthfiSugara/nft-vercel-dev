import * as React from 'react'
import { Box, Center, Grid, GridItem, Image, Text } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import FeaturedCollectionsCard from '@app/components/FeaturedCollectionsCard'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IFeaturedCollectionProps {}

const FeaturedCollection: React.FunctionComponent<IFeaturedCollectionProps> = () => {
  return (
    <Box
      bgImage={
        'url(https://images.unsplash.com/photo-1666625628272-a1071f6f7173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80)'
      }
      backgroundSize={'cover'}
      backgroundRepeat={'no-repeat'}
      backgroundPosition={'center center'}
      width={'full'}
      height={'23.2vw'}
      borderRadius={'1.5vw'}
      overflow={'hidden'}
    >
      <Grid
        backdropFilter={'blur(0.2vw)'}
        bgColor={'brand.bg.11'}
        color={'gicv.white'}
        h="100%"
        templateColumns="repeat(13, 1fr)"
        gap={'2vw'}
        py={'2.5vw'}
        px={'3.5vw'}
      >
        <GridItem colSpan={5} py={'1.2vw'}>
          <Image
            boxSize="8vw"
            border={'0.5vw solid white'}
            borderRadius="full"
            src="https://bit.ly/dan-abramov"
            alt=""
          />
          <Text fontSize={'1vw'} mt={'0.7vw'}>
            James Althery <CheckCircleIcon bgColor={'gicv.white'} borderRadius={'full'} color={'gicv.info'} />
          </Text>
          <Text fontSize={'1.5vw'} fontWeight={'extrabold'} mt={'1vw'}>
            Nature Collections
          </Text>
          <Text fontSize={'1.2vw'} fontWeight={'extrabold'} mt={'0.3vw'}>
            100 NFTS
          </Text>
        </GridItem>
        <GridItem colSpan={8}>
          <Grid h="100%" templateColumns="repeat(3, 1fr)" gap={'2vw'}>
            <GridItem colSpan={1}>
              <Center>
                <FeaturedCollectionsCard />
              </Center>
            </GridItem>
            <GridItem colSpan={1}>
              <Center>
                <FeaturedCollectionsCard />
              </Center>
            </GridItem>
            <GridItem colSpan={1}>
              <Center>
                <FeaturedCollectionsCard />
              </Center>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default FeaturedCollection
