import { Box, Center, SimpleGrid, Skeleton, Text } from '@chakra-ui/react'
import Balance from '@app/components/Balance'
import Image from 'next/image'
import WGICTIcon from '@public/images/MarketMaker/BuyNFT/wgict_icon.png'
import ConnectWalletButton from '@app/components/Buttons/ConnectWalletButton'

const ClaimRewardSpecialCardsSkeleton = ({ account }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return (
    <SimpleGrid columns={[2, 2, 6]} spacing={['3vw', '3vw', '1vw']}>
      {[...Array(12)].map((_, i) => {
        return (
          <Box
            key={i}
            bg={'legion.white'}
            color={'legion.black'}
            borderRadius={['2vw', '2vw', '0.5vw']}
            p={['3vw', '3vw', '0.5vw']}
          >
            <Center>
              <Text fontSize={['5vw', '5vw', '1.5vw']} fontWeight={'bold'} textTransform={'capitalize'}>
                {months[i]}
              </Text>
            </Center>
            <Center
              alignItems={'center'}
              fontSize={['3.5vw', '3.5vw', '1vw']}
              fontWeight={'bold'}
              mt={['3vw', '3vw', '1vw']}
            >
              <Center pos={'relative'} w={['7vw', '7vw', '2vw']} h={['7vw', '7vw', '2vw']} overflow={'hidden'}>
                <Image src={WGICTIcon} layout="fill" objectFit="contain" alt={''} placeholder={'blur'} />
              </Center>
              <Balance
                value={0}
                decimals={0}
                textAlign={'center'}
                ml={['1.5vw', '1.5vw', '0.5vw']}
                mr={['1vw', '1vw', '0.3vw']}
              />
              <Text>WGICT</Text>
            </Center>
            <Center mt={['3vw', '3vw', '1vw']}>
              {account ? (
                <Skeleton width="100%" height={['10vw', '10vw', '3vw']} />
              ) : (
                <ConnectWalletButton
                  fontSize={['3.5vw', '3.5vw', '1vw']}
                  fontWeight={'bold'}
                  maxH={['3vw', '3vw', '1vw']}
                  w={'100%'}
                  py={['5vw', '5vw', '1.5vw']}
                  textTransform={'capitalize'}
                  borderRadius={['2vw', '2vw', '0.5vw']}
                />
              )}
            </Center>
          </Box>
        )
      })}
    </SimpleGrid>
  )
}

export default ClaimRewardSpecialCardsSkeleton
