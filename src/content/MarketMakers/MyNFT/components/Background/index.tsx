import { Box } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import BgProducts from '@public/images/Products/Background/bg_products.png'
import BgProductsMobile from '@public/images/Products/Background/bg_products_mobile.png'

const Background = ({children}) => {
  return (
    <Box pos={'relative'} w={'100%'}>
        <Box pos={'absolute'} inset={0} display={['none', 'none', 'unset']}>
            <Box pos={'relative'} w={'100%'} pt={['50vw', '50vw', '12vw']}>
                <Image src={BgProducts} layout={'responsive'} sizes={'100vw'} alt={''} placeholder={'blur'}/>
            </Box>
        </Box>
        <Box pos={'absolute'} inset={0} display={['unset', 'unset', 'none']}>
            <Box pos={'relative'} w={'100%'} pt={['50vw', '50vw', '12vw']}>
                <Image src={BgProductsMobile} layout={'responsive'} sizes={'100vw'} alt={''} placeholder={'blur'}/>
            </Box>
        </Box>
        {children}
    </Box>
  )
}

export default Background