import React from 'react'
import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, HStack, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import Marketplace from '@app/content/Marketplace'
import Profile_user_Activities from '@app/content/Collectible/ProfileUserActivities'

export default function profileUserView() {
  return (
    <Layout>
      <SEO />
      <Box
        bgImage={'url(/images/Collectible/banner-user.png)'}
        backgroundRepeat="no-repeat"
        backgroundSize="100%"
        objectFit="cover"
        alignItems="center"
        justifyContent="center"
      >
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
          <Heading color="black" size="md" textTransform="uppercase" textAlign="center">
            120
          </Heading>
          <Text color="#6C757D" pt="1" fontSize="sm">
            Items
          </Text>
        </Box>

        <Box pl={12}>
          <Heading color="black" size="md" textTransform="uppercase" textAlign="center">
            120
          </Heading>
          <Text color="#6C757D" pt="1" fontSize="sm">
            Listed
          </Text>
        </Box>

        <Box pl={12}>
          <Heading color="black" size="md" textTransform="uppercase" textAlign="center">
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
          <Heading color="black" size="md" textTransform="uppercase" textAlign="center">
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
          <Flex justifyContent="center" width="40%">
            <Text fontSize="13px" color="#6C757D" fontWeight="bold">
              Created
            </Text>
            <Text fontWeight="bold" fontSize="13px" pl={1}>
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
              <Box w="20px">
                <Image src="/images/Collectible/warning.png" alt="" />
              </Box>
            </HStack>
          </Flex>
        </Flex>

        <Box textAlign={'center'} pt={'2vw'} px={'15vw'}>
          <Text fontSize={'1.1vw'} pt={'1.5vw'}>
            Augue pellentesque a, molestie nisi scelerisque in turpis urna hendrerit purus libero, dictum nisl, eget
            accumsan scelerisque duis massa aliquam elit, leo turpis magnis diam netus ut nunc scelerisque at augue non
            vel, faucibus risus netus ornare vitae viverra nec vestibulum vel diam in sagittis neque, at vulputate
            turpis tempor elit risus tempus quam semper ut sagittis.
            <Text fontWeight="bold" color="orange" justifyContent="center">
              See More <ChevronDownIcon w={7} h={7} />
            </Text>
          </Text>
        </Box>
      </Box>
      <Box>
        <Tabs>
          <Flex justifyContent="center" alignItems="center" TextAlign="center" my={10}>
            <TabList>
              <Tab fontSize="14px" fontWeight="bold">
                Items
              </Tab>
              <Tab fontSize="14px" fontWeight="bold">
                Activities
              </Tab>
            </TabList>
          </Flex>
          <hr />
          <TabPanels>
            <TabPanel>
              <Marketplace />
            </TabPanel>

            <TabPanel>
              <Profile_user_Activities />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  )
}
