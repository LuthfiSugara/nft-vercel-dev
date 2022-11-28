import { CheckCircleIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image as ChakraImage,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import * as React from 'react'
import { BsExclamationTriangle } from 'react-icons/bs'
import { FaRegHeart } from 'react-icons/fa'
import { HiOutlineEye, HiOutlineShare } from 'react-icons/hi'
import BNBIcon from '@public/images/Token/bnb.png'
import Image from 'next/image'
import Balance from '@app/components/Balance'
import WGICTIcon from '@public/images/Token/wgict.png'
import { IoDocumentTextOutline } from 'react-icons/io5'

const NFTDetail: React.FunctionComponent = () => {
  return (
    <Box p={'0.5vw'}>
      <SimpleGrid columns={3} bgColor={'gicv.secondary'} p={'3vw'}>
        <Center></Center>
        <Center>
          <ChakraImage
            borderRadius={'0.7vw'}
            boxSize={'25vw'}
            src={
              'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80'
            }
            alt=""
          />
        </Center>
        <Flex direction={'column'} justifyContent={'space-between'} h={'full'} py={'1.5vw'}>
          <VStack align={'left'} spacing={'0.9vw'}>
            <HStack spacing={'0.7vw'}>
              <Box border={'0.08vw solid'} borderColor={'gicv.gray.500'} borderRadius={'50%'} p={'0.7vw'}>
                <FaRegHeart fontSize={'1.2vw'} />
              </Box>
              <Text fontSize={'1vw'}>22 Favorites</Text>
            </HStack>
            <HStack spacing={'0.7vw'}>
              <Box border={'0.08vw solid'} borderColor={'gicv.gray.500'} borderRadius={'50%'} p={'0.7vw'}>
                <HiOutlineShare fontSize={'1.2vw'} />
              </Box>
              <Text fontSize={'1vw'}>Share</Text>
            </HStack>
            <HStack spacing={'0.7vw'}>
              <Box border={'0.08vw solid'} borderColor={'gicv.gray.500'} borderRadius={'50%'} p={'0.7vw'}>
                <BsExclamationTriangle fontSize={'1.2vw'} />
              </Box>
              <Text fontSize={'1vw'}>Report</Text>
            </HStack>
          </VStack>
          <VStack align={'left'} spacing={'0.7vw'}>
            <Text fontSize={'1vw'}>Creator :</Text>
            <HStack spacing={'0.5vw'}>
              <ChakraImage
                boxSize="2.5vw"
                border={'0.1vw solid'}
                borderColor={'gicv.gray.500'}
                borderRadius="full"
                src={'https://bit.ly/dan-abramov'}
                alt=""
              />
              <Text fontSize={'1.2vw'} color={'gicv.primary'} fontWeight={'semibold'}>
                {'GICVerse'}
                <CheckCircleIcon bgColor={'gicv.white'} borderRadius={'full'} color={'gicv.info'} mx={'0.5vw'} />
              </Text>
            </HStack>
          </VStack>
        </Flex>
      </SimpleGrid>
      <SimpleGrid columns={2} pt={'3vw'} px={'5vw'}>
        <Box py={'2.2vw'}>
          <Box borderRight={'0.12vw solid'} borderColor={'gicv.gray.100'}>
            <Text fontSize={'2.5vw'} fontWeight={'semibold'}>
              GICVerse #123
            </Text>
            <HStack fontSize={'1.45vw'} spacing={'2.5vw'} mt={'0.5vw'}>
              <Flex>
                <Text>Owned by &nbsp;</Text>
                <Text color={'gicv.primary'}>GlobalInv...</Text>
              </Flex>
              <HStack
                borderInline={'0.12vw solid'}
                borderColor={'gicv.gray.100'}
                paddingInline={'2.5vw'}
                spacing={'0.7vw'}
              >
                <Center pos={'relative'} w={['7vw', '7vw', '1.5vw']} h={['7vw', '7vw', '1.5vw']} overflow={'hidden'}>
                  <Image src={BNBIcon} layout="fill" objectFit="contain" alt={''} placeholder={'blur'} />
                </Center>
                <Text>BSC</Text>
              </HStack>
              <HStack spacing={'0.7vw'}>
                <HiOutlineEye fontSize={'2vw'} />
                <Text fontSize={'1vw'}>322 Views </Text>
              </HStack>
            </HStack>
          </Box>
        </Box>
        <Box pl={'3.5vw'}>
          <Text fontSize={'1.45vw'} fontWeight={'semibold'}>
            Current Price
          </Text>
          <HStack spacing={'0.5vw'}>
            <Center pos={'relative'} w={['7vw', '7vw', '2.2vw']} h={['7vw', '7vw', '2.2vw']} overflow={'hidden'}>
              <Image src={WGICTIcon} layout="fill" objectFit="contain" alt={''} placeholder={'blur'} />
            </Center>
            <Balance
              value={100}
              decimals={0}
              textAlign={'center'}
              fontSize={['4vw', '4vw', '2.5vw']}
              fontWeight={'extrabold'}
              mx={['2vw', '2vw', '0.3vw']}
            />
            <Balance
              value={100 * 0.987}
              decimals={1}
              prefix={'= $'}
              fontSize={'1vw'}
              fontWeight={'bold'}
              color={'gicv.gray.600'}
            />
          </HStack>
          <HStack spacing={'2vw'} mt={'1.5vw'}>
            <Button colorScheme={'primary'} fontSize={'1.2vw'} w={'full'} h={'3vw'} borderRadius={'0.4vw'}>
              Buy Now
            </Button>
            <Button
              color={'gicv.gray.900'}
              variant={'outline'}
              fontSize={'1.2vw'}
              w={'full'}
              h={'3vw'}
              border={'0.1vw solid'}
              borderColor={'gicv.gray.500'}
              borderRadius={'0.3vw'}
            >
              Make Offer
            </Button>
          </HStack>
        </Box>
      </SimpleGrid>
      <SimpleGrid columns={2} pt={'3vw'} px={'5vw'} spacing={'5vw'}>
        <Accordion
          defaultIndex={[0]}
          allowMultiple
          border={'0.12vw solid'}
          borderColor={'gicv.gray.100'}
          borderRadius={'1vw'}
          overflow={'hidden'}
        >
          <AccordionItem border={'none'}>
            <AccordionButton fontSize={'2vw'} py={'1.5vw'} px={'3vw'} bgColor={'gicv.gray.300'}>
              <Box flex="1" textAlign="left">
                <HStack spacing={'1vw'}>
                  <IoDocumentTextOutline />
                  <Text fontSize={'1.45vw'}>Description</Text>
                </HStack>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel p={'1.5vw'} fontSize={'1vw'}>
              Ipsum viverra praesent pellentesque laoreet non urna dictum sit porttitor habitasse massa fames ultricies
              semper tellus, tempus, convallis diam, turpis ut at massa aliquam in eros, in cras eu duis tempus,
              adipiscing libero dolor mattis tortor maecenas urna sapien amet euismod enim vel natoque in sollicitudin
              eget at odio ut consectetur quisque vitae amet, ac vitae blandit convallis velit pellentesque aliquet
              pellentesque egestas nulla aliquet et at cursus convallis adipiscing eros, neque, platea nunc varius
              commodo adipiscing ullamcorper ut pretium, in mattis facilisi dignissim nulla in pellentesque morbi
              fermentum facilisis etiam fringilla id lectus nulla ut molestie pellentesque at ornare
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </SimpleGrid>
    </Box>
  )
}

export default NFTDetail
