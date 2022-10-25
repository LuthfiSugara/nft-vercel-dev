import { Box, Text } from '@chakra-ui/react'
import Image from 'next/image'
import * as React from 'react'
import bgImg from '@public/images/Landing/landing-banner-bg.png'
import Banner from './Banner'

const Home: React.FunctionComponent = () => {
  return (
    <Box>
      <Box position={'relative'} height={'43vw'}>
        <Box position={'absolute'} w={'full'}>
          <Image src={bgImg} placeholder={'blur'} sizes={'100vw'} alt={''} />
        </Box>
        <Banner />
      </Box>
      <Box position={'relative'}></Box>
    </Box>
  )
}

export default Home
