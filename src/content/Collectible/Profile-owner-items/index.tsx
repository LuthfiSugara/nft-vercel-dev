import React, { useState } from 'react'
import {
  Box,
  Button,
  Center,
  Collapse,
  Flex,
  Heading,
  HStack,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import TabItems from './TabItems'
import TabOnSale from './TabOnSale'
import TabOffers from './TabOffers'
import ProfileUserActivities from '../ProfileUserActivities'

const ProfileOwnerItems: React.FunctionComponent = () => {
  const [showDesc, setShowDesc] = useState(false);  

  const toggleDesc = () => {
        showDesc ? setShowDesc(false) : setShowDesc(true);
    }
  return (
    <Box>
      <Box
        bgImage={'url(/images/Collectible/banner-user.png)'}
        backgroundRepeat="no-repeat"
        backgroundSize="100%"
        objectFit="cover"
        alignItems="center"
        justifyContent="center"
      >
        <Flex px={5} py={5} position="absolute" marginInlineStart="82%">
          <Button h="32px" w="100%" pl={2}>
            <Image src="/images/Collectible/edit-line.png" alt="" px={3} />
            Edit Background
          </Button>
        </Flex>
        <Flex justifyContent="center" alignItems="center" paddingTop="80px">
          <Box pb={20}>
            <Flex justifyContent="center" alignItems="center" paddingBottom={5}>
              <Image borderRadius="full" boxSize="150px" src="/images/Collectible/user-profile.png" alt="Dan Abramov" />
            </Flex>
            <Flex
              justifyContent="center"
              alignItems="center"
              backgroundColor="blackAlpha.500"
              p={2}
              borderRadius="40px"
              w="300px"
              margin="auto"
            >
              <Flex justifyContent="space-evenly" alignItems="center">
                <Flex paddingRight={2}>
                  <Image
                    borderRadius="full"
                    boxSize="30px"
                    src="/images/Collectible/user-profile.png"
                    alt="Dan Abramov"
                  />
                </Flex>
                <Flex>
                  <Text color="white" fontSize="15px">
                    AtmosphereAddict
                  </Text>
                </Flex>
                <Flex paddingLeft={2}>
                  <Image borderRadius="full" boxSize="15px" src="/images/Collectible/check1.png" alt="Dan Abramov" />
                </Flex>
                <Flex paddingLeft={5}>
                  <Image boxSize="15px" src="/images/Collectible/vector.png" alt="Dan Abramov" />
                </Flex>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center" bg="whiteAlpha.100"></Flex>
            </Flex>
            <Flex py={5} justifyContent="center" alignItems="center">
              <Text
                fontFamily="Montserrat"
                fontWeight="extrabold"
                fontStyle="normal"
                fontSize="40px"
                lineHeight="40px"
                color="white"
              >
                Astrologizer Punk
              </Text>
              <Image
                paddingLeft={3}
                boxSize="50px"
                src="/icons/check2.svg"
                alt="Dan Abramov"
                backgroundRepeat="no-repeat"
              />
            </Flex>
          </Box>
        </Flex>
      </Box>

      <Flex
        width="40%"
        height="95px"
        bg="#FFFFFF"
        justifyContent="center"
        display="flex"
        flex-direction="row"
        alignItems="center"
        margin="auto"
        marginTop="-65px"
        borderRadius={10}
        boxShadow="md"
        padding="20px 50px"
      >
        <Box>
          <Heading color="black" size="md" textTransform="uppercase" align="center">
            120
          </Heading>
          <Text color="#6C757D" pt="1" fontSize="sm">
            Items
          </Text>
        </Box>

        <Box pl={12}>
          <Heading color="black" size="md" textTransform="uppercase" align="center">
            120
          </Heading>
          <Text color="#6C757D" pt="1" fontSize="sm">
            Listed
          </Text>
        </Box>

        <Box pl={12}>
          <Heading color="black" size="md" textTransform="uppercase" align="center">
            <HStack>
              <Image borderRadius="full" boxSize="30px" src="/images/Token/wgict.png" alt="Dan Abramov" />
              <Text>999</Text>
            </HStack>
          </Heading>
          <Text color="#6C757D" pt="1" fontSize="sm">
            Total Volume
          </Text>
        </Box>

        <Box pl={12}>
          <Heading color="black" size="md" textTransform="uppercase" align="center">
            <HStack>
              <Image borderRadius="full" boxSize="30px" src="/images/Token/wgict.png" alt="Dan Abramov" />
              <Text>1</Text>
            </HStack>
          </Heading>
          <Text color="#6C757D" pt="1" fontSize="sm">
            Floor Price
          </Text>
        </Box>
      </Flex>

      <Box justifyContent="center" alignItems="center" pt={10}>
        <Flex justifyContent="space-evenly" width="55%" margin="auto">
          <Flex justifyContent="center" width="40%" pt={2}>
            <Text fontSize="13px" color="#6C757D" fontWeight="bold" pr={1}>
              Created
            </Text>
            <Text fontWeight="bold" fontSize="13px">
              Sep 2022
            </Text>
          </Flex>

          <Flex justifyContent="center" width="50%" pr={5}>
            <HStack spacing="24px">
              <Box w="20px">
                <Image src="/images/Collectible/browser.png" alt="" />
              </Box>
              <Box w="20px">
                <Image src="/images/Collectible/discord.png" alt="" />
              </Box>
              <Box w="20px">
                <Image src="/images/Collectible/twitt.png" alt="" />
              </Box>
              <Box w="20px">
                <Image src="/images/Collectible/vrow.png/" alt="" />
              </Box>
              <Box w="20px">
                <Image src="/images/Collectible/share.png" alt="" />
              </Box>
              <Box>
                <Button h="35px" w="160px" px={2}>
                  <Image src="/images/Collectible/edit-line.png" alt="" px={3} />
                  Edit Profile
                </Button>
              </Box>
            </HStack>
          </Flex>
        </Flex>

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
      </Box>
      <Box>
        <Tabs variant='unstyled'>
          <Flex justifyContent="center" alignItems="center" align="center" my={10}>
            <TabList color="#6C757D">
              <Tab fontSize="13px" fontWeight="bold" _selected={{ color: '#000000', borderBottom:'2px', borderColor: '#000000' }}>
                Items
              </Tab>
              <Tab fontSize="13px" fontWeight="bold" px={10} _selected={{ color: '#000000', borderBottom:'2px', borderColor: '#000000' }}>
                On Sale
              </Tab>
              <Tab fontSize="13px" fontWeight="bold" px={10} _selected={{ color: '#000000', borderBottom:'2px', borderColor: '#000000' }}>
                Offers
              </Tab>
              <Tab fontSize="13px" fontWeight="bold" _selected={{ color: '#000000', borderBottom:'2px', borderColor: '#000000' }}>
                Activities
              </Tab>
            </TabList>
          </Flex>
          <hr />
          <TabPanels>
            <TabPanel>
              <TabItems />
            </TabPanel>

            <TabPanel>
              <TabOnSale />
            </TabPanel>

            <TabPanel>
              <TabOffers />
            </TabPanel>

            <TabPanel>
              <ProfileUserActivities />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  )
}

export default ProfileOwnerItems
