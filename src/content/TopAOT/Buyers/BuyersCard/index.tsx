import Balance from '@app/components/Balance'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { Box, Center, Flex, Grid, GridItem, HStack, Image, Text } from '@chakra-ui/react'
import React, { FC } from 'react'

interface IBuyersCard {
  rank: string
  img: string
  name: string
  nftsBought: number
  totalPurchase: number
}

const BuyersCard: FC<IBuyersCard> = ({ rank, img, name, nftsBought, totalPurchase }) => {
  return (
    <Grid
      templateColumns={'repeat(12,1fr)'}
      boxShadow={'md'}
      border={'0.1vw solid'}
      borderColor={'gicv.gray.300'}
      borderRadius={'0.3vw'}
      fontWeight={'medium'}
      py={'0.5vw'}
      pr={'2vw'}
      mt={'1vw'}
    >
      <GridItem colSpan={1}>
        <Center h={'full'}>{rank}</Center>
      </GridItem>
      <GridItem colSpan={5}>
        <HStack spacing={'1vw'}>
          <Image
            boxSize="3vw"
            border={'0.1vw solid'}
            borderColor={'gicv.gray.500'}
            borderRadius="full"
            src={img}
            alt=""
          />
          <Text>
            {name} <CheckCircleIcon bgColor={'gicv.white'} borderRadius={'full'} color={'gicv.info'} mx={'0.5vw'} />
          </Text>
        </HStack>
      </GridItem>
      <GridItem colSpan={3}>
        <Flex h={'full'} alignItems={'center'}>
          <Balance value={nftsBought} decimals={0} />
        </Flex>
      </GridItem>
      <GridItem colSpan={3}>
        <Box textAlign={'right'} h={'full'} alignItems={'center'}>
          <Balance value={totalPurchase} decimals={0} unit={' WGICT'} />
          <Balance
            value={totalPurchase * 0.95}
            decimals={0}
            prefix={'$'}
            fontSize={'0.85vw'}
            fontWeight={'bold'}
            color={'gicv.gray.600'}
          />
        </Box>
      </GridItem>
    </Grid>
  )
}

export default BuyersCard
