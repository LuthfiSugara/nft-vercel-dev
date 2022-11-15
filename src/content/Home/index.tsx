import { Box, Text } from '@chakra-ui/react'
import Image from 'next/image'
import * as React from 'react'
import bgImg from '@public/images/Landing/landing-banner-bg.png'
import Banner from './Banner'
import FeaturedCollections from './FeaturedCollections'
import TopCollections from './TopCollections'
import LiveAuctions from './LiveAuctions'
import TopBuyers from './TopBuyers'
import TopSellers from './TopSellers'
import PartnerForm from './PartnerForm'

const Home: React.FunctionComponent = () => {
  return (
    <Box>
      <Box height={'50vw'}>
        <Box position={'absolute'} w={'full'}>
          <Image src={bgImg} placeholder={'blur'} sizes={'100vw'} alt={''} />
        </Box>
        <Banner />
      </Box>
      <Box px={'15vw'}>
        <FeaturedCollections />
        <TopCollections />
        <LiveAuctions />
        <TopBuyers />
        <TopSellers />
      </Box>
      <Box py={'5vw'}>
        <PartnerForm />
      </Box>
    </Box>
  )
}

export default Home
