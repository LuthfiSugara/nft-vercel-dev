import { Box } from '@chakra-ui/react'
import * as React from 'react'
import Banner from './Banner'
import FeaturedCollections from './FeaturedCollections'
import TopCollections from './TopCollections'
import LiveAuctions from './LiveAuctions'
import TopBuyers from './TopBuyers'
import TopSellers from './TopSellers'
import PartnerForm from './PartnerForm'
import Image from 'next/image'
import LandingHome from '@public/images/Landing/landing-banner-bg.png'

const Home: React.FunctionComponent = () => {
  return (
    <Box>
      <Box height={'50vw'}>
        <Box position={'absolute'} w={'full'}>
          <Image src={LandingHome} layout="responsive" objectFit="cover" sizes={'100vw'} alt={''} />
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
