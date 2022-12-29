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
  Collapse,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image as ChakraImage,
  Image,
  SimpleGrid,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsExclamationTriangle } from 'react-icons/bs'
import { FaRegHeart } from 'react-icons/fa'
import { HiOutlineEye, HiOutlineShare } from 'react-icons/hi'
import Balance from '@app/components/Balance'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { withCustomScrollBar } from '@app/config/theme/withCustomScrollbar'

const NFTDetail: React.FunctionComponent = () => {
  const [showDetail, setShowDetail] = useState(true);

  const toggleDetail = () => {
    showDetail ? setShowDetail(false) : setShowDetail(true);
  }

  return (
    <Box p={'0.5vw'}>
      <SimpleGrid columns={3} bgColor={'gicv.secondary'} p={'3vw'}>
        <Center></Center>
        <Center>
          <ChakraImage
            borderRadius={'0.7vw'}
            boxSize={'25vw'}
            src={
              '/images/nft/nft-gold.png'
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
                // border={'0.1vw solid'}
                // borderColor={'gicv.gray.500'}
                borderRadius="full"
                src={'/icons/gic-verse.svg'}
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
              Gold
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
                  <Image src='/icons/bnb.svg' layout="fill" objectFit="contain" alt={''} placeholder={'blur'} />
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
              <Image src='/icons/wgict.svg' layout="fill" objectFit="contain" alt={''} placeholder={'blur'} />
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
            {/* <Button
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
            </Button> */}
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
        <Box
          w={'100%'}
          border={'0.12vw solid'}
          borderColor={'gicv.gray.100'}
          borderRadius='xl'
        >
          <Tabs variant='unstyled'>
            <Flex py={'1.5vw'} px={'3vw'} bg={'gicv.gray.300'} >
              <HStack>
                <TabList>
                  <Tab _selected={{ color: '#FF6600', borderBottom:'2px', borderColor: '#FF6600' }}>Details</Tab>
                  <Tab _selected={{ color: '#FF6600', borderBottom:'2px', borderColor: '#FF6600' }}>Properties</Tab>
                </TabList>
              </HStack>
              <Spacer/>
              <HStack onClick={toggleDetail}>
                {showDetail ? 
                  <Image src='/icons/chevron-up-default.svg' alt="chevron" />
                : <Image src='/icons/chevron-down-default.svg' alt="chevron" /> }
              </HStack>
            </Flex>
            <Collapse in={showDetail} animateOpacity>
              <Box
                mt='4'
                // rounded='xl'
              >
                <TabPanels>
                  <TabPanel>
                    <Stack spacing='14px'>
                      <Flex>
                        <Text>Contract Address</Text>
                        <Spacer/>
                        <Text color={'gicv.primary'}>GlobalInv...</Text>
                      </Flex>
                      <Flex>
                        <Text>Token ID</Text>
                        <Spacer/>
                        <Text color={'gicv.primary'}>1992</Text>
                      </Flex>
                      <Flex>
                        <Text>Token Standart</Text>
                        <Spacer/>
                        <Text>ERC-721</Text>
                      </Flex>
                      <Flex>
                        <Text>Blockchain</Text>
                        <Spacer/>
                        <Text>BSC</Text>
                      </Flex>
                      <Flex>
                        <Text>Metadata</Text>
                        <Spacer/>
                        <Text color={'gicv.primary'}>Frozen</Text>
                      </Flex>
                      <Flex>
                        <Text>Creator Royalty</Text>
                        <Spacer/>
                        <Text>10%</Text>
                      </Flex>
                    </Stack>
                  </TabPanel>
                  <TabPanel>
                    <p>two!</p>
                  </TabPanel>
                </TabPanels>
              </Box>
            </Collapse>
          </Tabs>
        </Box>
      </SimpleGrid>
      
      <Box pt={'3vw'} px={'5vw'}>
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
                    <Image src='/icons/activity.svg' />
                    <Text fontSize={'1.45vw'}>Activity History</Text>
                  </HStack>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel p={'1.5vw'} fontSize={'1vw'}>
              <Box justifyContent="center" py={4} px={20}>
                <Grid templateColumns="repeat(7, 1fr)" gap={6}>
                  <GridItem
                    w="100%"
                    py={2}
                    fontFamily="Montserrat"
                    fontStyle="normal"
                    fontWeight="700"
                    fontSize="14px"
                    color="#6C757D"
                  >
                    Type
                  </GridItem>
                  <GridItem
                    w="100%"
                    py={2}
                    fontFamily="Montserrat"
                    fontStyle="normal"
                    fontWeight="700"
                    fontSize="14px"
                    color="#6C757D"
                  >
                    Item
                  </GridItem>
                  <GridItem w="20%"></GridItem>
                  <GridItem
                    w="100%"
                    py={2}
                    fontFamily="Montserrat"
                    fontStyle="normal"
                    fontWeight="700"
                    fontSize="14px"
                    color="#6C757D"
                  >
                    Price
                  </GridItem>
                  <GridItem
                    w="100%"
                    py={2}
                    fontFamily="Montserrat"
                    fontStyle="normal"
                    fontWeight="700"
                    fontSize="14px"
                    color="#6C757D"
                  >
                    From
                  </GridItem>
                  <GridItem
                    w="100%"
                    py={2}
                    fontFamily="Montserrat"
                    fontStyle="normal"
                    fontWeight="700"
                    fontSize="14px"
                    color="#6C757D"
                  >
                    To
                  </GridItem>
                  <GridItem
                    w="100%"
                    py={2}
                    fontFamily="Montserrat"
                    fontStyle="normal"
                    fontWeight="700"
                    fontSize="14px"
                    color="#6C757D"
                  >
                    Date
                  </GridItem>
                </Grid>
                <br />
                <Grid templateColumns="repeat(7, 1fr)" gap="20px">
                  <GridItem w="100%" py={2}>
                    <Text fontSize="12px" fontWeight="bold">
                      Transfer
                    </Text>
                  </GridItem>
                  <GridItem w="150%">
                    <HStack>
                      <Box width="50px" h="50px">
                        <Image src="/images/Profile-user-activities/cartoon.png" alt="" w="100%" />
                      </Box>
                      <Box>
                        <HStack>
                          <Text fontSize="12px" color="orange.400" fontWeight="bold">
                            GICVerse
                          </Text>
                          <Image borderRadius="full" boxSize="10px" src="/images/Collectible/check1.png" alt="Dan Abramov" />
                        </HStack>
                        <Text fontSize="12px" fontWeight="bold">
                          GICVerse #123
                        </Text>
                      </Box>
                      <br />
                    </HStack>
                  </GridItem>
                  <GridItem></GridItem>
                  <GridItem w="100%" py={2}>
                    <Text fontSize="12px" fontWeight="bold">
                      100 WGICT
                    </Text>
                    <Text fontSize="12px" fontWeight="bold" color="#6C757D">
                      $98.7
                    </Text>
                  </GridItem>
                  <GridItem w="100%" py={4}>
                    <Text fontSize="12px" fontWeight="bold">
                      0xsadb234bs3...
                    </Text>
                  </GridItem>
                  <GridItem w="100%" py={4}>
                    <Text fontSize="12px" fontWeight="bold">
                      0xhjfdjh12e42n...
                    </Text>
                  </GridItem>
                  <GridItem w="100%" py={4}>
                    <Text fontSize="12px" fontWeight="bold">
                      2 days ago
                    </Text>
                  </GridItem>
                </Grid>
                <br />
                <hr />
                <br />
                <Grid templateColumns="repeat(7, 1fr)" gap="20px">
                  <GridItem w="100%" py={2}>
                    <Text fontSize="12px" fontWeight="bold">
                      Listing
                    </Text>
                    <Text fontSize="12px" fontWeight="bold" color="#6C757D">
                      As Fixed Price
                    </Text>
                  </GridItem>
                  <GridItem w="150%">
                    <HStack>
                      <Box width="50px" h="50px">
                        <Image src="/images/Profile-user-activities/cartoon.png" alt="" w="100%" />
                      </Box>
                      <Box>
                        <HStack>
                          <Text fontSize="12px" color="orange.400" fontWeight="bold">
                            GICVerse
                          </Text>
                          <Image borderRadius="full" boxSize="10px" src="/images/Collectible/check1.png" alt="Dan Abramov" />
                        </HStack>
                        <Text fontSize="12px" fontWeight="bold">
                          GICVerse #123
                        </Text>
                      </Box>
                      <br />
                    </HStack>
                  </GridItem>
                  <GridItem></GridItem>
                  <GridItem w="100%" py={2}>
                    <Text fontSize="12px" fontWeight="bold">
                      100 WGICT
                    </Text>
                    <Text fontSize="12px" fontWeight="bold" color="#6C757D">
                      $98.7
                    </Text>
                  </GridItem>
                  <GridItem w="100%" py={4}>
                    <Text fontSize="12px" fontWeight="bold">
                      0xsadb234bs3...
                    </Text>
                  </GridItem>
                  <GridItem w="100%" py={4}>
                    <Text fontSize="12px" fontWeight="bold">
                      -
                    </Text>
                  </GridItem>
                  <GridItem w="100%" py={4}>
                    <Text fontSize="12px" fontWeight="bold">
                      3 days ago
                    </Text>
                  </GridItem>
                </Grid>
              </Box>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
      </Box>
      <Box pt={'3vw'} px={'5vw'}>
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
                  <Image src='/icons/dashboard.svg' />
                  <Text fontSize={'1.45vw'}>More from this collection</Text>
                </HStack>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel p={'1.5vw'} fontSize={'1vw'}>
            <HStack spacing={'1.2vw'} overflowX={'scroll'} mt={'2vw'} pb={'3vw'} sx={withCustomScrollBar()}>
              {[...Array(15)].map((_, idx) => (
                <Box 
                  boxShadow={'base'} 
                  borderRadius={'xl'} 
                >
                  <Box w='100%'>
                    <Image src='/images/nft/nftBull.png' alt='nft' w={'100%'} borderTopRadius='xl' />
                  </Box>
                  <Stack p={4} spacing='8px' w={'200px'}>
                      <Text fontSize='xs' as='b'>GiCVerse #58</Text>
                      <HStack>
                          <Image src='/icons/gic-verse.svg' alt='' borderRadius={'2xl'} />
                          <Text fontSize='xs' as='b' color={'#FF6600'}>GIC Verse</Text>
                      </HStack>
                      
                      <Stack>
                          <Text fontSize='xs' as='b' mt={5}>Buy Now</Text>
                          <HStack>
                              <Image src='/icons/wgict.svg' alt='' w='20px' />
                              <Text fontSize='xs' as='b'>1000</Text>
                          </HStack>
                      </Stack>
                  </Stack>
                </Box>
              ))}
            </HStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <HStack justify={'center'} my={5}>
          <Button colorScheme='black' variant='outline'>View Collection</Button>
        </HStack>
      </Box>
    </Box>
  )
}

export default NFTDetail
