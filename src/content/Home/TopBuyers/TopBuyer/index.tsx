import * as React from 'react'
import { Box, HStack, Image, Text } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import Balance from '@app/components/Balance'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ITopBuyerProps {}

const TopBuyer: React.FunctionComponent<ITopBuyerProps> = () => {
  return (
    <HStack w={'19vw'}>
      <Box position={'relative'} w={'3vw'} h={'3vw'} mr={'1vw'}>
        <Image
          position={'absolute'}
          border={'0.05vw solid black'}
          borderRadius="full"
          boxSize="3vw"
          src="https://bit.ly/dan-abramov"
          alt=""
        />
      </Box>
      <Box>
        <Text fontSize={'1vw'} fontWeight={'extrabold'}>
          John Sturgis <CheckCircleIcon bgColor={'gicv.white'} borderRadius={'full'} color={'gicv.info'} />
        </Text>
        <Balance
          value={1922.33}
          decimals={2}
          prefix={'$'}
          fontSize={'1vw'}
          fontWeight={'extrabold'}
          color={'gray.500'}
        />
      </Box>
    </HStack>
  )
}

export default TopBuyer
