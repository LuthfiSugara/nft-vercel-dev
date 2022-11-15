import { Box, Center, HStack, Input, Text, Textarea, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import BgImg from '@public/images/PartnerForm/bg-partner-form.jpg'

const PartnerForm = () => {
  return (
    <Box px={'5vw'}>
      <Box py={'3vw'} px={'20vw'}>
        <Box pos={'relative'} width={'full'} height={'14vw'}>
          <Box pos={'absolute'} zIndex={0} width={'full'} height={'full'} borderRadius={'1vw'} overflow={'hidden'}>
            <Image src={BgImg} layout={'fill'} placeholder={'blur'} objectFit={'cover'} alt={''} />
          </Box>
          <Center pos={'absolute'} zIndex={1} width={'full'} height={'full'} color={'gicv.white'}>
            <VStack>
              <Text fontSize={'2vw'} fontWeight={'extrabold'}>
                Collectible
              </Text>
              <Text fontSize={'3.5vw'} fontWeight={'extrabold'}>
                GICVerse Partner
              </Text>
            </VStack>
          </Center>
        </Box>
        <Box pt={'2.5vw'} px={'3.3vw'}>
          <Text fontSize={'1vw'}>NFT collectible as GICVerse Partners enjoys benefits like:</Text>
          <ul style={{ paddingLeft: '1vw' }}>
            <li>Verified Mark</li>
            <li>Dedicated NFT Collection Page</li>
            <li>Attribute Filter & Rarity Ranking</li>
          </ul>
          <Text fontSize={'1vw'} mt={'2vw'}>
            For projects that meets our conditions, we offer further advanced integration including:
          </Text>
          <ul style={{ paddingLeft: '1vw' }}>
            <li>Royalty distribution at real-time</li>
          </ul>
          <Text fontSize={'1vw'} mt={'2vw'}>
            For NFTs with non-standard metadata, we also provide manual support for converting them into displayable
            format.
          </Text>
          <Text fontSize={'1vw'} mt={'2vw'}>
            Fill in the form below and we will contact you later.
          </Text>
          <Text fontSize={'1vw'} mt={'2vw'}>
            For other business inquiry: contact@tofunft.com
          </Text>
        </Box>
      </Box>
      <Box borderTop={'0.15vw solid'} borderColor={'rgba(0,0,0,0.1)'} py={'3vw'} px={'23.3vw'}>
        <Text align={'center'} fontSize={'1vw'} fontWeight={'extrabold'} mb={'4vw'}>
          About Your Project
        </Text>
        <HStack fontSize={'1vw'}>
          <Text>Project&apos;s name</Text>
          <Text color={'gicv.red.300'}>*</Text>
        </HStack>
        <Input
          type="text"
          bgColor={'gicv.secondary'}
          borderRadius={'0.4vw'}
          borderColor={'lightgray'}
          fontSize={'0.8vw'}
          h={'3vw'}
          mt={'0.7vw'}
        />
        <HStack fontSize={'1vw'} mt={'2vw'}>
          <Text>Contract address of its NFT (only 721 token)</Text>
        </HStack>
        <Input
          type="text"
          bgColor={'gicv.secondary'}
          borderRadius={'0.4vw'}
          borderColor={'lightgray'}
          fontSize={'0.8vw'}
          h={'3vw'}
          mt={'0.7vw'}
        />
        <HStack fontSize={'1vw'} mt={'2vw'}>
          <Text>Which Blockchain is Your Project on?</Text>
        </HStack>
        <Input
          type="text"
          bgColor={'gicv.secondary'}
          borderRadius={'0.4vw'}
          borderColor={'lightgray'}
          fontSize={'0.8vw'}
          h={'3vw'}
          mt={'0.7vw'}
        />{' '}
        <HStack fontSize={'1vw'} mt={'2vw'}>
          <Text>What is current status of project</Text>
        </HStack>
        <Input
          type="text"
          bgColor={'gicv.secondary'}
          borderRadius={'0.4vw'}
          borderColor={'lightgray'}
          fontSize={'0.8vw'}
          h={'3vw'}
          mt={'0.7vw'}
        />{' '}
        <HStack fontSize={'1vw'} mt={'2vw'}>
          <Text>Tell us more about your project</Text>
        </HStack>
        <Textarea
          type="text"
          bgColor={'gicv.secondary'}
          borderRadius={'0.4vw'}
          borderColor={'lightgray'}
          fontSize={'0.8vw'}
          h={'6vw'}
          mt={'0.7vw'}
        />
      </Box>
      <Box borderTop={'0.15vw solid'} borderColor={'rgba(0,0,0,0.1)'} py={'3vw'} px={'23.3vw'}>
        <Text align={'center'} fontSize={'1vw'} fontWeight={'extrabold'} mb={'4vw'}>
          Links and description to display on your Collection page
        </Text>
        <HStack fontSize={'1vw'}>
          <Text>Project&apos;s name</Text>
          <Text color={'gicv.red.300'}>*</Text>
        </HStack>
        <Input
          type="text"
          bgColor={'gicv.secondary'}
          borderRadius={'0.4vw'}
          borderColor={'lightgray'}
          fontSize={'0.8vw'}
          h={'3vw'}
          mt={'0.7vw'}
        />
        <HStack fontSize={'1vw'} mt={'2vw'}>
          <Text>Twitter link</Text>
        </HStack>
        <Input
          type="text"
          bgColor={'gicv.secondary'}
          borderRadius={'0.4vw'}
          borderColor={'lightgray'}
          fontSize={'0.8vw'}
          h={'3vw'}
          mt={'0.7vw'}
        />
        <HStack fontSize={'1vw'} mt={'2vw'}>
          <Text>Twitter followers (e.g. 14K)</Text>
        </HStack>
        <Input
          type="text"
          bgColor={'gicv.secondary'}
          borderRadius={'0.4vw'}
          borderColor={'lightgray'}
          fontSize={'0.8vw'}
          h={'3vw'}
          mt={'0.7vw'}
        />
        <HStack fontSize={'1vw'} mt={'2vw'}>
          <Text>Telegram group link</Text>
        </HStack>
        <Input
          type="text"
          bgColor={'gicv.secondary'}
          borderRadius={'0.4vw'}
          borderColor={'lightgray'}
          fontSize={'0.8vw'}
          h={'3vw'}
          mt={'0.7vw'}
        />{' '}
        <HStack fontSize={'1vw'} mt={'2vw'}>
          <Text>Telegram members (e.g. 15.5K)</Text>
        </HStack>
        <Input
          type="text"
          bgColor={'gicv.secondary'}
          borderRadius={'0.4vw'}
          borderColor={'lightgray'}
          fontSize={'0.8vw'}
          h={'3vw'}
          mt={'0.7vw'}
        />{' '}
        <HStack fontSize={'1vw'} mt={'2vw'}>
          <Text>Discord server link</Text>
        </HStack>
        <Input
          type="text"
          bgColor={'gicv.secondary'}
          borderRadius={'0.4vw'}
          borderColor={'lightgray'}
          fontSize={'0.8vw'}
          h={'3vw'}
          mt={'0.7vw'}
        />{' '}
        <HStack fontSize={'1vw'} mt={'2vw'}>
          <Text>Discord members (e.g. 2.1K)</Text>
        </HStack>
        <Input
          type="text"
          bgColor={'gicv.secondary'}
          borderRadius={'0.4vw'}
          borderColor={'lightgray'}
          fontSize={'0.8vw'}
          h={'3vw'}
          mt={'0.7vw'}
        />{' '}
        <HStack fontSize={'1vw'} mt={'2vw'}>
          <Text>Medium link</Text>
        </HStack>
        <Input
          type="text"
          bgColor={'gicv.secondary'}
          borderRadius={'0.4vw'}
          borderColor={'lightgray'}
          fontSize={'0.8vw'}
          h={'3vw'}
          mt={'0.7vw'}
        />{' '}
        <HStack fontSize={'1vw'} mt={'2vw'}>
          <Text>Facebook link</Text>
        </HStack>
        <Input
          type="text"
          bgColor={'gicv.secondary'}
          borderRadius={'0.4vw'}
          borderColor={'lightgray'}
          fontSize={'0.8vw'}
          h={'3vw'}
          mt={'0.7vw'}
        />{' '}
        <HStack fontSize={'1vw'} mt={'2vw'}>
          <Text>Instagram link</Text>
        </HStack>
        <Input
          type="text"
          bgColor={'gicv.secondary'}
          borderRadius={'0.4vw'}
          borderColor={'lightgray'}
          fontSize={'0.8vw'}
          h={'3vw'}
          mt={'0.7vw'}
        />
        <HStack fontSize={'1vw'} mt={'2vw'}>
          <Text>Project description</Text>
        </HStack>
        <Textarea
          type="text"
          bgColor={'gicv.secondary'}
          borderRadius={'0.4vw'}
          borderColor={'lightgray'}
          fontSize={'0.8vw'}
          h={'6vw'}
          mt={'0.7vw'}
        />
      </Box>
    </Box>
  )
}

export default PartnerForm
