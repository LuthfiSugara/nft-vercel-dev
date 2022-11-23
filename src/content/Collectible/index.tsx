import { Box, Center, SimpleGrid, Text } from '@chakra-ui/react'
import Image from 'next/image'
import BgImg from '@public/images/Collectible/collectible-banner-bg.png'
import CollectibleCard from './CollectibleCard'

const GICCollectible: React.FunctionComponent = () => {
  return (
    <Box>
      <Box height={'30vw'}>
        <Box position={'absolute'} w={'full'}>
          <Image src={BgImg} placeholder={'blur'} sizes={'100vw'} alt={''} />
        </Box>
      </Box>
      <Box textAlign={'center'} pt={'2vw'} px={'15vw'}>
        <Text fontSize={'2.7vw'} fontWeight={'bold'}>
          Collectible
        </Text>
        <Text fontSize={'1.1vw'} pt={'1.5vw'}>
          Augue pellentesque a, molestie nisi scelerisque in turpis urna hendrerit purus libero, dictum nisl, eget
          accumsan scelerisque duis massa aliquam elit, leo turpis magnis diam netus ut nunc scelerisque at augue non
          vel, faucibus risus netus ornare vitae viverra nec vestibulum vel diam in sagittis neque, at vulputate turpis
          tempor elit risus tempus quam semper ut sagittis.
        </Text>
      </Box>
      <Box pt={'5vw'} px={'10vw'}>
        <SimpleGrid columns={3} spacing={'3vw'}>
          {[...Array(9)].map((_, idx) => (
            <Center key={idx}>
              <CollectibleCard />
            </Center>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  )
}

export default GICCollectible
