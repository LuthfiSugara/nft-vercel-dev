import { Box, Heading, Text, Button } from '@chakra-ui/react'
import Link from 'next/link'

const HomeHero: React.FC = () => {
  return (
    <Box
      pos={'relative'}
      color="white"
      w={['100%', '100%', '66vw']}
      h={['185vw', '185vw', '47.5vw']}
      px={['8vw', '8vw', '6vw']}
      pt={['40vw', '40vw', '18vw']}
    >
      <Heading fontSize={['9vw', '9vw', '3vw']} textTransform={'uppercase'} fontWeight={'semibold'}>
        <Text>Grow your crypto assets</Text>
        <Box display={'flex'} alignItems={'center'}>
          <Text>with&nbsp;</Text>
          <Text fontSize={['12vw', '12vw', '4vw']} fontWeight={'extrabold'}>
            legion.
          </Text>
        </Box>
      </Heading>
      <Heading fontSize={['5vw', '5vw', '1.7vw']} fontWeight={'medium'} mt={['3vw', '3vw', '1vw']}>
        <Text>
          Trade and earn benefits on profitable decentralized platform, with the balance of Binance Smart Chain.
        </Text>
      </Heading>
      <Box display={'flex'} justifyContent={['center', 'center', 'left', 'left']} mt={['6vw', '6vw', '2vw']}>
        <Link href="/swap">
          <a>
            <Button
              boxShadow={'0.5vw 0.5vw 1vw rgba(0, 0, 0, 0.5)'}
              minW={['84vw', '84vw', 0]}
              px={[0, 0, '3vw']}
              py={['7vw', '7vw', '2vw']}
              variant="solid"
              backgroundColor={'legion.red.100'}
              fontSize={['5vw', '5vw', '1.5vw']}
              fontWeight={'bold'}
              _hover={{
                backgroundColor: 'legion.red.100',
              }}
              _active={{
                backgroundColor: 'legion.red.100',
              }}
            >
              Trade Now
            </Button>
          </a>
        </Link>
      </Box>
    </Box>
  )
}

export default HomeHero
