import * as React from 'react'
import { Box, Center, Flex, Grid, GridItem, HStack, Image as ImageChakra, Text } from '@chakra-ui/react'
import Balance from '@app/components/Balance'
import WGICTIcon from '@public/images/Token/wgict.png'
import Image from 'next/image'
// import { Image } from '@chakra-ui/react'

const CardownerItems = () => {
  return (
    <Box>
      <Grid templateRows="repeat(11, 1fr)" height={'21vw'} overflow={'hidden'} borderRadius={'0.7vw'} boxShadow={'lg'}>
        <GridItem
          position={'relative'}
          rowSpan={6}
          bgImage={'url(/images/Collectible/astronot.png)'}
          backgroundSize={'cover'}
          backgroundRepeat={'no-repeat'}
          backgroundPosition={'center center'}
          width={'full'}
        ></GridItem>
        <GridItem rowSpan={5} bgColor={'white'} p={'.7vw'}>
          <Text fontSize={'1vw'} fontWeight={'bold'}>
            Space Appe #123
          </Text>
          <HStack mt={'0.3vw'}>
            <ImageChakra borderRadius="full" boxSize="1.9vw" src="/images/Collectible/user-profile.png" alt="" />
            <Text fontSize={'1vw'} fontWeight={'medium'} color={'gicv.primary'}>
              Astrologizer P..
            </Text>
            <ImageChakra borderRadius="full" boxSize="15px" src="/images/Collectible/check1.png" alt="" />
          </HStack>
          <Text fontSize={'0.8vw'} fontWeight={'bold'} color={'gray.500'} mt={'1.5vw'}>
            Buy Now
          </Text>
          <Flex alignItems={'center'}>
            <Center pos={'relative'} w={['7vw', '7vw', '1.5vw']} h={['7vw', '7vw', '1.5vw']} overflow={'hidden'}>
              <Image src={WGICTIcon} layout="fill" objectFit="contain" alt={''} placeholder={'blur'} />
            </Center>
            <Balance
              value={100}
              decimals={0}
              textAlign={'center'}
              fontSize={['4vw', '4vw', '1vw']}
              fontWeight={'extrabold'}
              mx={['2vw', '2vw', '0.3vw']}
            />
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default CardownerItems
