import { Box, Center, Collapse, Flex, Heading, HStack, Image, SimpleGrid, Spacer, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import router from 'next/router';
import React, { useState } from 'react'

const Index = () => {
    const [showDesc, setShowDesc] = useState(false);
    const [showPhilosophy, setShowPhilosophy] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);

    const toggleDesc = () => {
        showDesc ? setShowDesc(false) : setShowDesc(true);
    }

    const togglePhilosophy = () => {
        showPhilosophy ? setShowPhilosophy(false) : setShowPhilosophy(true);
    }

    return (
        <Box>
            <Box 
                backgroundImage="url('/images/GICStore/gic-store-user-hero-banner.png')"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="100%"
                objectFit='cover'
                width={'100%'}
                mb={'-2%'}
            >
                <Box>
                    <Center pt={'100'}>
                        <Image 
                            src='https://res.cloudinary.com/practicaldev/image/fetch/s--i96Gcbyf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/50592/f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg'
                            alt='Profile'
                            boxSize='250px'
                            objectFit='cover'
                            borderRadius="full"
                        />
                    </Center>
                    <Center>
                        <Flex gridGap={3} style={{backgroundColor: '#00000080'}} py={'2'} px={'6'} borderRadius={'full'}>
                            <Image
                                src='/icons/logo-gic.svg'
                                alt=""
                            />
                            <Text color={'white'} as={'b'}>GLobalInvestaCapital</Text>
                            <Image
                                src='/icons/check-circle.svg'
                                alt=""
                            />
                            <Image
                                src='/icons/goto.svg'
                                alt=""
                            />
                        </Flex>
                    </Center>
                    <Center my={'5'} pb={'10'}>
                        <Flex alignItems={'center'} gridGap={3}>
                            <Text fontSize='4xl' as='b' color={'white'}>GIC Verse</Text>
                            <Image
                                src='/icons/check-circle.svg'
                                boxSize={'35px'}
                                alt=""
                            />
                        </Flex>
                    </Center>
                </Box>
            </Box>
            <Center>
                <Box 
                    w='50%'
                    rounded='md'
                    boxShadow='md'
                    py={'14px'}
                    bg={'white'}
                >
                    <SimpleGrid columns={[2, 4]} spacing={5}>
                        <Center>
                            <Stack>
                                <Text fontSize='3xl' as='b'>120</Text>
                                <Text fontSize='md' color={'gray.500'}>Items</Text>
                            </Stack>
                        </Center>
                        <Center>
                            <Stack>
                                <Text fontSize='3xl' as='b'>120</Text>
                                <Text fontSize='md' color={'gray.500'}>Listed</Text>
                            </Stack>
                        </Center>
                        <Center>
                            <Stack>
                                <HStack>
                                    <Image src='/icons/wgict.svg' alt="" />
                                    <Text fontSize='3xl' as='b'>999</Text>
                                </HStack>
                                <Text fontSize='md' color={'gray.500'}>Total Volume</Text>
                            </Stack>
                        </Center>
                        <Center>
                            <Stack>
                                <HStack>
                                    <Image src='/icons/wgict.svg' alt="" />
                                <Text fontSize='3xl' as='b'>1</Text>
                                </HStack>
                                <Text fontSize='md' color={'gray.500'}>FLoor Price</Text>
                            </Stack>
                        </Center>
                    </SimpleGrid>
                </Box>
            </Center>

            <Center>
                <Box 
                    w='50%'
                    my={'35px'}
                >
                    <Flex>
                        <HStack>
                            <Text>Created</Text>
                            <Text as='b'>Sep 2022</Text>
                        </HStack>
                        <Spacer />
                        <HStack gridGap={10}>
                            <HStack gridGap={3}>
                                <Image src='/icons/globe.svg' alt='globe' />
                                <Image src='/icons/discord.svg' alt='discord' />
                                <Image src='/icons/twitter.svg' alt='twitter' />
                            </HStack>
                            <HStack gridGap={3}>
                                <Image src='/icons/share.png' alt='share' />
                                <Image src='/icons/warning.svg' alt='warning' />
                            </HStack>
                        </HStack>
                    </Flex>
                </Box>
            </Center>

            <Center>
                <Box 
                    w='50%'
                    my={'35px'}
                >
                    <Collapse startingHeight={40} in={showDesc}>
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                        labore wes anderson cred nesciunt sapiente ea proident.
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                        labore wes anderson cred nesciunt sapiente ea proident.
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                        labore wes anderson cred nesciunt sapiente ea proident.
                    </Collapse>
                    <HStack onClick={() => toggleDesc()} justify={'center'}>
                        <Text align={'center'} color={'orange.500'}>{showDesc ? "See Less" : "See More" }</Text>
                        {showDesc ? <Image src='/icons/chevron-up.svg' alt='chevron' />
                        : <Image src='/icons/chevron-down.svg' alt='chevron' /> }
                        
                    </HStack>
                </Box>
            </Center>
            <Center>
                <Box 
                    w='75%'
                    mt={'35px'}
                    mb={'25px'}
                >
                    <Center>
                        <Box borderBottom={'1px'} borderColor={'gray.200'} w='50%'>
                            <HStack justify='center'>
                                <Text align={'center'} fontSize='xl' as='b' pb={3}>Season 2022</Text>
                            </HStack>
                        </Box>
                    </Center>
                    <HStack justify='center'>
                        <Tabs variant='unstyled' w='100%' pb={5} onChange={(index) => setTabIndex(index)} mt={5}>
                            <TabList justifyContent='center'>
                                <Tab _selected={{ color: '#FF6600', borderBottom:'2px', borderColor: '#FF6600' }}>
                                    <Text as={tabIndex == 0 ? 'b' : 'abbr' }>September</Text>
                                </Tab>
                                <Tab _selected={{ color: '#FF6600', borderBottom:'1px', borderColor: '#FF6600' }}>
                                    <Text as={tabIndex == 1 ? 'b' : 'abbr' }>Oktober</Text>
                                </Tab>
                                <Tab _selected={{ color: '#FF6600', borderBottom:'2px', borderColor: '#FF6600' }}>
                                    <Text as={tabIndex == 2 ? 'b' : 'abbr' }>November</Text>
                                </Tab>
                                <Tab _selected={{ color: '#FF6600', borderBottom:'1px', borderColor: '#FF6600' }}>
                                    <Text as={tabIndex == 3 ? 'b' : 'abbr' }>Desember</Text>
                                </Tab>
                            </TabList>
                            <TabPanels  border='1px' borderColor='gray.200' borderRadius='xl' mt={20}>
                                <TabPanel p={10}>
                                    <Box borderBottom='1px' borderColor='gray.200' pb={10} mb={10}>
                                        <HStack onClick={() => togglePhilosophy()}>
                                            <Text fontSize='2xl' as='b'>Philosophi</Text>
                                            <Spacer/>
                                            {showPhilosophy ? <Image src='/icons/chevron-up-default.svg' alt='chevron' />
                                            : <Image src='/icons/chevron-down-default.svg' alt='chevron' /> }
                                            
                                        </HStack>
                                        <Collapse startingHeight={40} in={showPhilosophy}>
                                            <Box >
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                                terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                                                labore wes anderson cred nesciunt sapiente ea proident.
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                                terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                                                labore wes anderson cred nesciunt sapiente ea proident.
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                                terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                                                labore wes anderson cred nesciunt sapiente ea proident.
                                            </Box>
                                        </Collapse>
                                    </Box>
                                    <Box>
                                    <Stack direction={'row'} spacing='40px'>
                                        <Box w='55%'>
                                            <Heading as='h4' size='sm' mb={5}>Have a chance to get 3 NFT Market Maker Special</Heading>
                                            <Box mb={5}>
                                                <Heading as='h6' color='#FF6600' size='xs'>Rare</Heading>
                                                <Text fontSize='sm'>RareRare : This Rare type is the one that will give you a reward of 20% of the difference in % profit sharing market makers so as to generate 20%</Text>
                                            </Box>
                                            <Box mb={5}>
                                                <Heading as='h6' color='#FF6600' size='xs'>Epic</Heading>
                                                <Text fontSize='sm'>RareRare : This Rare type is the one that will give you a reward of 20% of the difference in % profit sharing market makers so as to generate 20%</Text>
                                            </Box>
                                            <Box mb={5}>
                                                <Heading as='h6' color='#FF6600' size='xs'>Legendary</Heading>
                                                <Text fontSize='sm'>RareRare : This Rare type is the one that will give you a reward of 20% of the difference in % profit sharing market makers so as to generate 20%</Text>
                                            </Box>
                                        </Box>
                                        <Box w='45%'>
                                            <Heading textAlign={'center'} as='h4' size='md' mb={5}>Sang Garuda</Heading>
                                            <SimpleGrid columns={3} spacing={10}>
                                                <Box>
                                                    <Image src='/images/nft/garuda.png' alt='garuda' />
                                                    <Stack>
                                                        <Center>
                                                            <Image src='/icons/rare.svg' alt='garuda' w='50%' />
                                                        </Center>
                                                        <Text as='b' align={'center'}>Rare</Text>
                                                    </Stack>
                                                </Box>
                                                <Box>
                                                    <Image src='/images/nft/garuda.png' alt='garuda' />
                                                    <Stack>
                                                        <Center>
                                                            <Image src='/icons/epic.svg' alt='garuda' w='50%' />
                                                        </Center>
                                                        <Text as='b' align={'center'}>Rare</Text>
                                                    </Stack>
                                                </Box>
                                                <Box>
                                                    <Image src='/images/nft/garuda.png' alt='garuda' />
                                                    <Stack>
                                                        <Center>
                                                            <Image src='/icons/legendary.svg' alt='garuda' w='50%' />
                                                        </Center>
                                                        <Text as='b' align={'center'}>Rare</Text>
                                                    </Stack>
                                                </Box>
                                            </SimpleGrid>
                                        </Box>
                                    </Stack>
                                    </Box>
                                </TabPanel>
                                <TabPanel>
                                    <HStack onClick={() => togglePhilosophy()}>
                                        <Text fontSize='2xl' as='b'>Philosophi</Text>
                                        <Spacer/>
                                        {showPhilosophy ? <Image src='/icons/chevron-up-default.svg' alt='chevron' />
                                        : <Image src='/icons/chevron-down-default.svg' alt='chevron' /> }
                                        
                                    </HStack>
                                    <Collapse startingHeight={40} in={showPhilosophy}>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                                        labore wes anderson cred nesciunt sapiente ea proident.
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                                        labore wes anderson cred nesciunt sapiente ea proident.
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                                        labore wes anderson cred nesciunt sapiente ea proident.
                                    </Collapse>
                                </TabPanel>
                                <TabPanel>
                                    <HStack onClick={() => togglePhilosophy()}>
                                        <Text fontSize='2xl' as='b'>Philosophi</Text>
                                        <Spacer/>
                                        {showPhilosophy ? <Image src='/icons/chevron-up-default.svg' alt='chevron' />
                                        : <Image src='/icons/chevron-down-default.svg' alt='chevron' /> }
                                        
                                    </HStack>
                                    <Collapse startingHeight={40} in={showPhilosophy}>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                                        labore wes anderson cred nesciunt sapiente ea proident.
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                                        labore wes anderson cred nesciunt sapiente ea proident.
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                                        labore wes anderson cred nesciunt sapiente ea proident.
                                    </Collapse>
                                </TabPanel>
                                <TabPanel>
                                    <HStack onClick={() => togglePhilosophy()}>
                                        <Text fontSize='2xl' as='b'>Philosophi</Text>
                                        <Spacer/>
                                        {showPhilosophy ? <Image src='/icons/chevron-up-default.svg' alt='chevron' />
                                        : <Image src='/icons/chevron-down-default.svg' alt='chevron' /> }
                                        
                                    </HStack>
                                    <Collapse startingHeight={40} in={showPhilosophy}>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                                        labore wes anderson cred nesciunt sapiente ea proident.
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                                        labore wes anderson cred nesciunt sapiente ea proident.
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                                        labore wes anderson cred nesciunt sapiente ea proident.
                                    </Collapse>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </HStack>
                </Box>
            </Center>

            <Center>
                <Box 
                    w='75%'
                    my={'35px'}
                >
                    <SimpleGrid columns={4} spacing={10}>
                        <Box 
                            boxShadow={'base'} borderRadius={'xl'} 
                            onClick={() => router.push('/detail-nft')}
                            cursor={'pointer'}
                        >
                            <Image src='/images/nft/typeNft.png' alt='nft' w={'100%'} borderTopRadius='xl' />
                            <Stack p={4} spacing='8px'>
                                <Text fontSize='xs' as='b'>Bronze</Text>
                                <HStack>
                                    <Image src='/icons/gic-verse.svg' alt='' borderRadius={'2xl'} />
                                    <Text fontSize='xs' as='b' color={'#FF6600'}>GIC Verse</Text>
                                </HStack>
                                <HStack>
                                    <Text fontSize='xs' as='b'>Share Interest</Text>
                                    <Text fontSize='xs' as='b'>1%</Text>
                                </HStack>
                                <HStack>
                                    <Text fontSize='xs' as='b'>Equity</Text>
                                    <HStack>
                                        <Image src='/icons/wgict.svg' alt='' w='20px' />
                                        <Text fontSize='xs' as='b'>1000</Text>
                                    </HStack>
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
                        <Box 
                            boxShadow={'base'} borderRadius={'xl'} 
                            onClick={() => router.push('/detail-nft')}
                            cursor={'pointer'}
                        >
                            <Image src='/images/nft/typeNft.png' alt='nft' w={'100%'} borderTopRadius='xl' />
                            <Stack p={4} spacing='8px'>
                                <Text fontSize='xs' as='b'>Bronze</Text>
                                <HStack>
                                    <Image src='/icons/gic-verse.svg' alt='' borderRadius={'2xl'} />
                                    <Text fontSize='xs' as='b' color={'#FF6600'}>GIC Verse</Text>
                                </HStack>
                                <HStack>
                                    <Text fontSize='xs' as='b'>Share Interest</Text>
                                    <Text fontSize='xs' as='b'>1%</Text>
                                </HStack>
                                <HStack>
                                    <Text fontSize='xs' as='b'>Equity</Text>
                                    <HStack>
                                        <Image src='/icons/wgict.svg' alt='' w='20px' />
                                        <Text fontSize='xs' as='b'>1000</Text>
                                    </HStack>
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
                        <Box 
                            boxShadow={'base'} borderRadius={'xl'} 
                            onClick={() => router.push('/detail-nft')}
                            cursor={'pointer'}
                        >
                            <Image src='/images/nft/typeNft.png' alt='nft' w={'100%'} borderTopRadius='xl' />
                            <Stack p={4} spacing='8px'>
                                <Text fontSize='xs' as='b'>Bronze</Text>
                                <HStack>
                                    <Image src='/icons/gic-verse.svg' alt='' borderRadius={'2xl'} />
                                    <Text fontSize='xs' as='b' color={'#FF6600'}>GIC Verse</Text>
                                </HStack>
                                <HStack>
                                    <Text fontSize='xs' as='b'>Share Interest</Text>
                                    <Text fontSize='xs' as='b'>1%</Text>
                                </HStack>
                                <HStack>
                                    <Text fontSize='xs' as='b'>Equity</Text>
                                    <HStack>
                                        <Image src='/icons/wgict.svg' alt='' w='20px' />
                                        <Text fontSize='xs' as='b'>1000</Text>
                                    </HStack>
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
                        <Box 
                            boxShadow={'base'} borderRadius={'xl'} 
                            onClick={() => router.push('/detail-nft')}
                            cursor={'pointer'}
                        >
                            <Image src='/images/nft/typeNft.png' alt='nft' w={'100%'} borderTopRadius='xl' />
                            <Stack p={4} spacing='8px'>
                                <Text fontSize='xs' as='b'>Bronze</Text>
                                <HStack>
                                    <Image src='/icons/gic-verse.svg' alt='' borderRadius={'2xl'} />
                                    <Text fontSize='xs' as='b' color={'#FF6600'}>GIC Verse</Text>
                                </HStack>
                                <HStack>
                                    <Text fontSize='xs' as='b'>Share Interest</Text>
                                    <Text fontSize='xs' as='b'>1%</Text>
                                </HStack>
                                <HStack>
                                    <Text fontSize='xs' as='b'>Equity</Text>
                                    <HStack>
                                        <Image src='/icons/wgict.svg' alt='' w='20px' />
                                        <Text fontSize='xs' as='b'>1000</Text>
                                    </HStack>
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
                    </SimpleGrid>
                </Box>
            </Center>
        </Box>
    )
}

export default Index