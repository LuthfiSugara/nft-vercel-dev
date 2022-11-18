import { Box, Center, Flex, Image as ImageChakra, Text } from '@chakra-ui/react'
import * as React from 'react'
import WGICTIcon from '@public/images/Token/wgict.png'
import Image from 'next/image'
import Balance from '../Balance'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ITopBuyersCardProps {}

const TopBuyersCard: React.FunctionComponent<ITopBuyersCardProps> = () => {
  return (
    <Box
      borderRadius={'1vw'}
      overflow={'hidden'}
      bgColor={'gicv.white'}
      color={'gicv.black'}
      minW={'11vw'}
      h={'18.2vw'}
      p={'0.5vw'}
    >
      <Center>
        <ImageChakra
          borderRadius={'0.7vw'}
          boxSize={'10vw'}
          src={
            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80'
          }
          alt=""
        />
      </Center>
      <Box p={'0.5vw'}>
        <Text fontSize={'1vw'} fontWeight={'extrabold'}>
          Nature #001
        </Text>
        <Text fontSize={'1vw'} color={'gray.500'} fontWeight={'bold'} mt={'1.5vw'}>
          Last Sold
        </Text>
        <Flex alignItems={'center'} mt={'0.3vw'}>
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
      </Box>
    </Box>
  )
}

export default TopBuyersCard
