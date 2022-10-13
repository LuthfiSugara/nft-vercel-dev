import React from 'react'
import Slider from 'react-slick'
import { Box } from '@chakra-ui/react'
import { homeBlogsItems } from '@app/mocks'
import settings from './settings'
import BannersItem from './BannersItem'

const BannerItems = () => {
  return (
    <Box width={['100%', '100%', '45vw']}>
      <Slider {...settings}>
        {homeBlogsItems.map((blog, idx) => (
          <BannersItem blog={blog} key={`blogs_item__${blog.label}__${idx}`}></BannersItem>
        ))}
      </Slider>
    </Box>
  )
}

export default BannerItems
