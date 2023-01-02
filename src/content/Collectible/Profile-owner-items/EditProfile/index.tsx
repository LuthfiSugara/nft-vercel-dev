import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Text,
  Textarea,
} from '@chakra-ui/react'
import React from 'react'
import { LinkIcon } from '@chakra-ui/icons'

const Index = () => {
  return (
    <Box>
      <Flex w="60%" margin="auto">
        <Heading py="5vh" fontSize="30px">
          Edit Collectible Profile
        </Heading>
      </Flex>

      <Box pb="5vh">
        <Flex w="60%" margin="auto" pb={2}>
          <HStack spacing="50px">
            <Text fontSize={12} fontWeight="bold">
              Profile Picture
            </Text>
            <Text fontSize={12} px={3} fontWeight="bold">
              Profile Picture
            </Text>
          </HStack>
        </Flex>

        <Flex w="60%" margin="auto">
          <HStack spacing="50px">
            <Flex w="40%">
              <Box
                width="100px"
                height="100px"
                bgImage={'url(/images/Collectible/astronot2.png)'}
                backgroundRepeat="no-repeat"
                backgroundSize="100%"
                objectFit="cover"
                align="center"
              >
                <Button size="xs" my="40px" color="white" colorScheme="blackAlpha" fontSize="10px">
                  Change
                </Button>
              </Box>
            </Flex>

            <Flex width="100%">
              <Box
                borderRadius="md"
                width="300px"
                height="100px"
                bgImage={'url(/images/Collectible/banner-user.png)'}
                backgroundRepeat="no-repeat"
                backgroundSize="100%"
                objectFit="cover"
              />
            </Flex>
          </HStack>
        </Flex>
      </Box>

      <Box pb="5vh">
        <Flex w="60%" margin="auto" pb={2}>
          <HStack spacing="50px">
            <Text fontSize={12} fontWeight="bold">
              Collectible Name
            </Text>
          </HStack>
        </Flex>

        <Flex w="60%" margin="auto">
          <Flex w="45%">
            <Input placeholder="" />
          </Flex>
        </Flex>
      </Box>

      <Box pb="5vh">
        <Flex w="60%" margin="auto" pb={2}>
          <HStack spacing="50px">
            <Text fontSize={12} fontWeight="bold">
              Bio
            </Text>
          </HStack>
        </Flex>

        <Flex w="60%" margin="auto">
          <Flex w="45%">
            <Textarea />
          </Flex>
        </Flex>
      </Box>

      <Box pb="5vh">
        <Flex w="60%" margin="auto" pb={2}>
          <HStack spacing="50px">
            <Text fontSize={12} fontWeight="bold">
              Email
            </Text>
          </HStack>
        </Flex>

        <Flex w="60%" margin="auto">
          <Flex w="45%">
            <Input placeholder="" type="email" />
          </Flex>
        </Flex>
      </Box>

      <Box pb="3vh">
        <Flex w="60%" margin="auto" pb={4}>
          <HStack spacing="50px">
            <Text fontSize={12} fontWeight="bold">
              Social Connections
            </Text>
          </HStack>
        </Flex>

        <Flex w="60%" margin="auto">
          <Flex w="45%">
            <HStack>
              <Box w="20px">
                <Image src="/images/Collectible/twitt.png" alt="" />
              </Box>

              <Box pl={3}>
                <Text fontWeight="bold" fontSize="12px">
                  Twitter
                </Text>
              </Box>

              <Box>
                <Button bg="#FF6600" colorScheme="orange" size="md" w="120%" color="white" ml="150%" fontSize="14px">
                  Connect
                </Button>
              </Box>
            </HStack>
          </Flex>
        </Flex>
      </Box>

      <Box pb="3vh">
        <Flex w="60%" margin="auto">
          <Flex w="45%">
            <HStack>
              <Box w="20px">
                <Image src="/images/Collectible/discord.png" alt="" />
              </Box>

              <Box pl={3}>
                <Text fontWeight="bold" fontSize="12px">
                  Discord
                </Text>
              </Box>

              <Box>
                <Button bg="#FF6600" colorScheme="orange" size="md" w="120%" color="white" ml="146%" fontSize="14px">
                  Connect
                </Button>
              </Box>
            </HStack>
          </Flex>
        </Flex>
      </Box>

      <Box pb="5vh">
        <Flex w="60%" margin="auto">
          <Flex w="45%">
            <HStack>
              <Box w="20px">
                <Image src="/images/Collectible/instagram.png" alt="" />
              </Box>

              <Box pl={3}>
                <Text fontWeight="bold" fontSize="12px">
                  Instagram
                </Text>
              </Box>

              <Box>
                <Button bg="#FF6600" colorScheme="orange" size="md" w="120%" color="white" ml="128%" fontSize="14px">
                  Connect
                </Button>
              </Box>
            </HStack>
          </Flex>
        </Flex>
      </Box>

      <Box pb="5vh">
        <Flex w="60%" margin="auto" pb={2}>
          <HStack spacing="50px">
            <Text fontSize={12} fontWeight="bold">
              Link
            </Text>
          </HStack>
        </Flex>

        <Flex w="60%" margin="auto">
          <Flex w="45%">
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<LinkIcon color="#6C757D" />} />
              <Input fontSize={12} type="text" placeholder="Example.com" />
            </InputGroup>
          </Flex>
        </Flex>
      </Box>

      <Box pb="5vh">
        <Flex w="60%" margin="auto" pb={2}>
          <HStack spacing="50px">
            <Text fontSize={12} fontWeight="bold">
              Royalty Free
              <Text fontSize={11} color="#6C757D">
                Minimum 1%, max 10%
              </Text>
            </Text>
          </HStack>
        </Flex>

        <Flex w="60%" margin="auto">
          <Flex w="45%">
            <HStack>
              <Box>
                <Input width="60px" type="text" placeholder="1%" fontSize={12} />
              </Box>

              <Box>
                <Button bg="#FF6600" colorScheme="orange" size="md" w="120%" color="white" ml="202%" fontSize="14px">
                  Update
                </Button>
              </Box>
            </HStack>
          </Flex>
        </Flex>
      </Box>

      <Box pb="5vh">
        <Flex w="60%" margin="auto" pb={2}>
          <HStack spacing="50px">
            <Text fontSize={12} fontWeight="bold">
              Wallet Address
              <Text fontSize={11} color="#6C757D">
                For Royalty
              </Text>
            </Text>
          </HStack>
        </Flex>

        <Flex w="60%" margin="auto">
          <Flex w="full">
            <Box w="45%" bg="#F8F9FA" py={1} border="1px" borderRadius="5px" px={2}>
              <HStack>
                <Text fontSize={11} fontWeight="bold">
                  0xf2676f532cqweqwbq1313eqeb3E241fcb
                </Text>
                <Spacer />
                <Image src="/images/Collectible/copy.png" />
              </HStack>
            </Box>
          </Flex>
        </Flex>
      </Box>

      <Box pb="5vh">
        <Flex w="60%" margin="auto" pb={2}>
          <Box>
            <Button bg="#FF6600" colorScheme="orange" size="md" w="120%" color="white" fontSize="14px">
              Save
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Index
