import * as React from 'react'
import { Box, Center, Flex, Grid, GridItem, HStack, Image, SimpleGrid, Text } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import TopSellersCard from '@app/components/TopSellersCard'
import Balance from '@app/components/Balance'
import { withCustomScrollBar } from '@app/config/theme/withCustomScrollbar'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ITopSellerProps {
  listNumber: number
}

const TopSeller: React.FunctionComponent<ITopSellerProps> = ({ listNumber }) => {
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
        templateColumns="repeat(20, 1fr)"
        gap={'2vw'}
        px={'3.5vw'}
      >
        <GridItem colSpan={1} py={'3.5vw'}>
          <Center fontSize={'3vw'} color={'gicv.white'}>
            {listNumber}
          </Center>
        </GridItem>
        <GridItem colSpan={7} py={'3.7vw'}>
          <Image
            boxSize="6vw"
            border={'0.5vw solid white'}
            borderRadius="full"
            src="https://bit.ly/dan-abramov"
            alt=""
          />
          <Text fontSize={'1.3vw'} fontWeight={'bold'} mt={'0.7vw'}>
            James Althery <CheckCircleIcon bgColor={'gicv.white'} borderRadius={'full'} color={'gicv.info'} />
          </Text>
          <Flex
            direction={'column'}
            justifyContent={'space-between'}
            w={'22vw'}
            h={'4vw'}
            fontSize={'1.1vw'}
            fontWeight={'medium'}
            mt={'2vw'}
          >
            <SimpleGrid columns={2}>
              <Text>Total Sales</Text>
              <Balance value={1922.33} decimals={2} prefix={': $'} fontSize={'1vw'} fontWeight={'extrabold'} />
            </SimpleGrid>
            <SimpleGrid columns={2}>
              <Text>NFTs Sold</Text>
              <Balance value={12} decimals={0} prefix={': '} unit={' NFTs'} fontSize={'1vw'} fontWeight={'extrabold'} />
            </SimpleGrid>
          </Flex>
        </GridItem>
        <GridItem colSpan={12} py={'1.3vw'}>
          <HStack
            spacing={'1.9vw'}
            overflowX={'scroll'}
            py={'1vw'}
            sx={withCustomScrollBar('5px', 'gicv.primary', 'gicv.white')}
          >
            {[...Array(12)].map((_, idx) => (
              <TopSellersCard key={`top_sellers_card_item__${idx}`} />
            ))}
          </HStack>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default TopSeller
