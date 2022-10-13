import { Box } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import BgHero1 from '@public/images/Home/Background/bg_hero_1.png'
import BgHero2 from '@public/images/Home/Background/bg_hero_2.png'
import BgHero3 from '@public/images/Home/Background/bg_hero_3.png'
import BgHeroMobile1 from '@public/images/Home/Background/bg_hero_mobile_1.png'
import BgHeroMobile2 from '@public/images/Home/Background/bg_hero_mobile_2.png'
import BgHeroMobile3 from '@public/images/Home/Background/bg_hero_mobile_3.png'

const Background = ({children}) => {
  return (
    <Box bg={'legion.bg'} pos={'relative'} w={'100%'} h={'fit-content'} overflow={'hidden'}>
        <Box pos={'absolute'} inset={0} display={['none', 'none', 'unset']}>
            <Image src={BgHero1} layout={'responsive'} sizes={'100vw'} alt={''} placeholder={'blur'}/>
            <Image src={BgHero2} layout={'responsive'} sizes={'100vw'} alt={''} placeholder={'blur'}/>
            <Image src={BgHero3} layout={'responsive'} sizes={'100vw'} alt={''} placeholder={'blur'}/>
        </Box>
        <Box pos={'absolute'} inset={0} display={['unset', 'unset', 'none']}>
            <Image src={BgHeroMobile1} layout={'responsive'} sizes={'100vw'} alt={''} placeholder={'blur'}/>
            <Image src={BgHeroMobile2} layout={'responsive'} sizes={'100vw'} alt={''} placeholder={'blur'}/>
            <Image src={BgHeroMobile3} layout={'responsive'} sizes={'100vw'} alt={''} placeholder={'blur'}/>
        </Box>
        {children}
    </Box>
  )
}

export default Background