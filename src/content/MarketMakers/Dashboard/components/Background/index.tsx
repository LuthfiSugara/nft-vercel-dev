import { Box } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import DeskBG from '@public/images/MarketMaker/Dashboard/desk_bg.png'
import TabBG from '@public/images/MarketMaker/Dashboard/tab_bg.png'
import MobBG from '@public/images/MarketMaker/Dashboard/tab_bg.png'

const Background = ({ children }) => {
  return (
    <Box pos={'relative'} w={'100%'}>
      <Box pos={'absolute'} inset={0} display={['none', 'none', 'none', 'unset']}>
        <Box pos={'relative'} w={'100%'} pt={['50vw', '50vw', 0]}>
          <Image src={DeskBG} layout={'responsive'} sizes={'100vw'} alt={''} placeholder={'blur'} />
        </Box>
      </Box>
      <Box pos={'absolute'} inset={0} display={['none', 'none', 'unset', 'none']}>
        <Box pos={'relative'} w={'100%'} pt={['50vw', '50vw', 0]}>
          <Image src={TabBG} layout={'responsive'} sizes={'100vw'} alt={''} placeholder={'blur'} />
        </Box>
      </Box>
      <Box pos={'absolute'} inset={0} display={['unset', 'unset', 'none']}>
        <Box pos={'relative'} w={'100%'} pt={['50vw', '50vw', 0]}>
          <Image src={MobBG} layout={'responsive'} sizes={'100vw'} alt={''} placeholder={'blur'} />
        </Box>
      </Box>
      {children}
    </Box>
  )
}

export default Background
