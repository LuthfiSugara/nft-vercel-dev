import React from 'react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
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

const ProfileOwnerItems: React.FunctionComponent = () => {
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

        <Box align={'center'} pt={'2vw'} px={'15vw'}>
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
          <Flex justifyContent="center" alignItems="center" align="center" my={10}>
            <TabList color="#6C757D">
              <Tab fontSize="12px" fontWeight="bold">
                Items
              </Tab>
              <Tab fontSize="12px" fontWeight="bold" px={10}>
                On Sale
              </Tab>
              <Tab fontSize="12px" fontWeight="bold" px={10}>
                Offers
              </Tab>
              <Tab fontSize="12px" fontWeight="bold">
                Activities
              </Tab>
            </TabList>
          </Flex>
          <hr />
          <TabPanels>
            <TabPanel>
              <TabItems />
            </TabPanel>

            <TabPanel>{/* <Profile_user_Activities /> */}</TabPanel>

            <TabPanel>{/* <Marketplace /> */}</TabPanel>

            <TabPanel>{/* <Profile_user_Activities /> */}</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  )
}

export default ProfileOwnerItems
