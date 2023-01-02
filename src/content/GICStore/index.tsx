import { Box, Center, SimpleGrid, Text } from '@chakra-ui/react'
import Image from 'next/image'
import BannerGicStore from '@public/images/GICStore/gic-store-banner-bg.png'

import StoreCard from './StoreCard'

const GICStore: React.FunctionComponent = () => {
  return (
    <Box>
      <Box height={'30vw'}>
        <Box position={'relative'} w={'100%'}>
          <Image src={BannerGicStore} alt='' layout="responsive" objectFit="cover" />
        </Box>
      </Box>
      <Box textAlign={'center'} pt={'2vw'} px={'15vw'}>
        <Text fontSize={'2.7vw'} fontWeight={'bold'}>
          Find out GICStore
        </Text>
        <Text fontSize={'1.1vw'} pt={'1.5vw'}>
          Augue pellentesque a, molestie nisi scelerisque in turpis urna hendrerit purus libero, dictum nisl, eget
          accumsan scelerisque duis massa aliquam elit, leo turpis magnis diam netus ut nunc scelerisque at augue non
          vel, faucibus risus netus ornare vitae viverra nec vestibulum vel diam in sagittis neque, at vulputate turpis
          tempor elit risus tempus quam semper ut sagittis.
        </Text>
      </Box>
      <Box pt={'5vw'} px={'15vw'}>
        <SimpleGrid columns={2} spacing={'3vw'}>
          {[...Array(4)].map((_, idx) => (
            <Center key={idx}>
              <StoreCard />
            </Center>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  )
}

export default GICStore
