import { Box, Button, Center, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import BgImg from '@public/images/Landing/landing-invitation.png'
import { useRouter } from 'next/router'
import { ArrowForwardIcon } from '@chakra-ui/icons'

const PartnerForm = () => {
  const router = useRouter()
  return (
    <Box pos={'relative'} width={'full'} height={'35vw'}>
      <Box pos={'absolute'} zIndex={0} width={'full'} height={'35vw'}>
        <Image src={BgImg} layout={'fill'} placeholder={'blur'} objectFit={'cover'} alt={''} />
      </Box>
      <Center pos={'absolute'} zIndex={1} width={'full'} height={'35vw'}>
        <VStack spacing={'3.5vw'}>
          <VStack textAlign={'center'} w={'32.5vw'} spacing={'1vw'}>
            <Text fontSize={'3.2vw'} fontWeight={'extrabold'}>
              Be part of us
            </Text>
            <Text fontSize={'1vw'}>
              Enim non justo, aenean fermentum nulla et turpis diam nisi non ornare tristique eget tristique nunc tellus
              egestas a viverra ipsum semper pulvinar vulputate
            </Text>
          </VStack>
          <Center>
            <Button
              colorScheme={'primary'}
              fontSize={['1vw', '1vw', '1.2vw']}
              px={['1vw', '1vw', '2.5vw']}
              h={'3.5vw'}
              borderRadius={'0.5vw'}
              onClick={() => router.push('/partner-form')}
            >
              Get started
              <ArrowForwardIcon ml={'1vw'} />
            </Button>
          </Center>
        </VStack>
      </Center>
    </Box>
  )
}

export default PartnerForm
