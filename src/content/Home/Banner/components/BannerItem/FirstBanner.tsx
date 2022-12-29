import { Box, Button, Center, HStack, Text } from '@chakra-ui/react'
import NFTBundle from '@public/images/Landing/nft-bundle.png'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { Image } from '@chakra-ui/react'

const Firstbanner: React.FC = () => {
  const router = useRouter()
  return (
    <HStack bg={'transparent'} spacing={'8%'} px={'2%'}>
      <Center w={'42%'}>
        <Box>
          <Text fontSize={['1vw', '1vw', '3.2vw']} fontWeight={'extrabold'} lineHeight={'shorter'}>
            Welcome to,
            <br />
            GICVerse
          </Text>
          <Text fontSize={['1vw', '1vw', '1.2vw']} mt={'2vw'}>
            Facilisis diam ut habitant in aliquet eleifend id purus mauris euismod phasellus cras habitasse tincidunt
            nisl, mauris sed risus elementum lorem pellentesque eu tincidunt dapibus habitasse etiam auctor ornare vel
            felis, sagittis, sem nunc enim sem quisque.
          </Text>
          <Button
            colorScheme={'primary'}
            fontSize={['1vw', '1vw', '1.2vw']}
            px={['1vw', '1vw', '2.5vw']}
            h={'3.5vw'}
            borderRadius={'0.5vw'}
            mt={'2vw'}
            onClick={() => router.push('/gic-store')}
          >
            See GIC Store
            <ArrowForwardIcon ml={'1vw'} />
          </Button>
        </Box>
      </Center>
      <Center w={'48%'}>
        <Image
          src='/images/Landing/nft-bundle.png'
          alt='Banner'
          objectFit='cover'
          boxSize={'full'}
        />
      </Center>
    </HStack>
  )
}

export default Firstbanner
