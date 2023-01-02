import * as React from 'react'
import { Box, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import Balance from '@app/components/Balance'
import { useRouter } from 'next/router'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ICollectibleCardProps {}

const CollectibleCard: React.FunctionComponent<ICollectibleCardProps> = () => {
  const router = useRouter()
  return (
    <Grid
      templateRows="repeat(10, 1fr)"
      width={'30vw'}
      height={'15vw'}
      overflow={'hidden'}
      borderRadius={'1.5vw'}
      boxShadow={'lg'}
      onClick={() => router.push('/profile-user')}
      sx={{ cursor: 'pointer' }}
    >
      <GridItem
        rowSpan={6}
        bgImage={
          'url(https://images.unsplash.com/photo-1666625628272-a1071f6f7173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80)'
        }
        backgroundSize={'cover'}
        backgroundRepeat={'no-repeat'}
        backgroundPosition={'center center'}
        width={'full'}
      ></GridItem>
      <GridItem rowSpan={4} bgColor={'white'}>
        <Flex px={'1vw'}>
          <Box position={'relative'} w={'6.5vw'} mr={'1vw'}>
            <Image
              position={'absolute'}
              top={'-1.2vw'}
              borderRadius="full"
              boxSize="6.5vw"
              border={'0.5vw solid white'}
              src="https://bit.ly/dan-abramov"
              alt=""
            />
          </Box>
          <Box pt={'0.7vw'}>
            <Text fontSize={'1.3vw'} fontWeight={'extrabold'}>
              John Sturgis <CheckCircleIcon bgColor={'gicv.white'} borderRadius={'full'} color={'gicv.info'} />
            </Text>
            <Balance
              value={1922.33}
              decimals={2}
              prefix={'$'}
              fontSize={'1.3vw'}
              fontWeight={'extrabold'}
              color={'gray.500'}
            />
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default CollectibleCard
