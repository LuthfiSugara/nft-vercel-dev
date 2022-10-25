import React from 'react'
import Slider from 'react-slick'
import { Box } from '@chakra-ui/react'
import settings from './config/settings'
import { FirstBanner } from './components/BannerItem'

const Banner = () => {
  return (
    <Box pos={'absolute'} width={['85vw', '85vw', '80vw']} top={'7vw'} left={'50vw'} transform={'translateX(-50%)'}>
      <Slider {...settings}>
        <FirstBanner />
        <FirstBanner />
        <FirstBanner />
      </Slider>
    </Box>
  )
}

export default Banner
