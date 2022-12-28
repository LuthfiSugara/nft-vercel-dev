import { CheckCircleIcon } from '@chakra-ui/icons'
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  ListItem,
  Select,
  Stack,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react'
import React from 'react'

const Profile_user_Activities = () => {
  return (
    <Box>
      <Flex justifyContent="center" py={5}>
        <CheckboxGroup colorScheme="orange" defaultValue={['Sales']}>
          <Stack spacing={[1, 5]} direction={['column', 'row']}>
            <Checkbox value="Sales">Sales</Checkbox>
            <Checkbox value="Listings">Listings</Checkbox>
            <Checkbox value="Offers">Offers</Checkbox>
            <Checkbox value="Transfers">Transfers</Checkbox>
            <Select placeholder="All Of Time">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Stack>
        </CheckboxGroup>
      </Flex>
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
    </Box>
  )
}

export default Profile_user_Activities
