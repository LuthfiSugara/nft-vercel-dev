import { Box, Text } from '@chakra-ui/react'
import Image from 'next/image'
import * as React from 'react'
import bgImg from '@public/images/Landing/landing-banner-bg.png'

const Home: React.FunctionComponent = () => {
  return (
    <Box>
      <Box position={'relative'} height={'40vw'}>
        <Box position={'absolute'} w={'full'}>
          <Image src={bgImg} placeholder={'blur'} sizes={'100vw'} alt={''} />
        </Box>
        <Box position={'absolute'}>
          <Text fontSize={'10vw'}>Test</Text>
        </Box>
      </Box>
      <Box position={'relative'}>
        <Text fontSize={'10vw'}>Test</Text>
      </Box>
    </Box>
  )
}

export default Home
