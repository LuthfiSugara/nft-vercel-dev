import * as React from 'react'
import { Center, Flex, Grid, GridItem, HStack, Image as ImageChakra, Text } from '@chakra-ui/react'
import Balance from '@app/components/Balance'
import WGICTIcon from '@public/images/Token/wgict.png'
import Image from 'next/image'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IBuyProps {}

const Buy: React.FunctionComponent<IBuyProps> = () => {
  return (
    <Grid templateRows="repeat(11, 1fr)" height={'20vw'} overflow={'hidden'} borderRadius={'0.7vw'} boxShadow={'lg'}>
      <GridItem
        position={'relative'}
        rowSpan={6}
        bgImage={
          'url(https://images.unsplash.com/photo-1666625628272-a1071f6f7173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80)'
        }
        backgroundSize={'cover'}
        backgroundRepeat={'no-repeat'}
        backgroundPosition={'center center'}
        width={'full'}
      ></GridItem>
      <GridItem rowSpan={5} bgColor={'white'} p={'.7vw'}>
        <Text fontSize={'1vw'} fontWeight={'bold'}>
          GICVerse #01
        </Text>
        <HStack mt={'0.3vw'}>
          <ImageChakra borderRadius="full" boxSize="1.7vw" src="https://bit.ly/dan-abramov" alt="" />
          <Text fontSize={'1vw'} fontWeight={'medium'} color={'gicv.primary'}>
            John Sturgis
          </Text>
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
  )
}

export default Buy
