import { Box, Center, Flex, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const Index = () => {
    
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
                            boxSize='100px'
                            objectFit='cover'
                            borderRadius="full"
                        />
                    </Center>
                    <Center>
                        <Flex gridGap={3} style={{backgroundColor: '#00000080'}} py={'2'} px={'6'} borderRadius={'full'}>
                            <Image
                                src='/icons/logo-gic.svg'
                            />
                            <Text color={'white'} as={'b'}>GLobalInvestaCapital</Text>
                            <Image
                                src='/icons/check-circle.svg'
                            />
                            <Image
                                src='/icons/share.svg'
                            />
                        </Flex>
                    </Center>
                    <Center my={'2'} pb={'10'}>
                        <Flex alignItems={'center'} gridGap={3}>
                            <Text fontSize='4xl' as='b' color={'white'}>GIC Verse</Text>
                            <Image
                                src='/icons/check-circle.svg'
                                boxSize={'35px'}
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
                                <Text fontSize='md' color={'gray.500'}>Items</Text>
                            </Stack>
                        </Center>
                        <Center>
                            <Stack>
                                <Text fontSize='3xl' as='b'>120</Text>
                                <Text fontSize='md' color={'gray.500'}>Items</Text>
                            </Stack>
                        </Center>
                        <Center>
                            <Stack>
                                <Text fontSize='3xl' as='b'>120</Text>
                                <Text fontSize='md' color={'gray.500'}>Items</Text>
                            </Stack>
                        </Center>
                    </SimpleGrid>
                </Box>
            </Center>
        </Box>
    )
}

export default Index