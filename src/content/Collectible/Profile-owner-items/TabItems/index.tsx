import CardownerItems from '@app/components/Cards/CardownerItems'
import { Search2Icon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react'

const TabItems: React.FunctionComponent = () => {
  return (
    <Box pt={5}>
      <Box w={'full'} px={'3vw'} justifyContent="center">
        <Grid templateColumns="repeat(1, 1fr)" gap={6}>
          <Box px={'3vw'} justifyContent="center" w={'full'}>
            <GridItem w="100%" gap={6} justifyContent="center">
              <Box w="90%" margin="auto" px={6}>
                <HStack>
                  <Box w="480px">
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Search2Icon color="gray.300" />
                      </InputLeftElement> 
                      <Input type="text" fontSize="12px" placeholder="Search here..." />
                    </InputGroup>
                  </Box>

                  <Box pl="100px">
                    <Select
                      fontSize={'0.9vw'}
                      fontWeight={'bold'}
                      borderColor={'gicv.black'}
                      placeholder="Quantity"
                      defaultValue={'Quantity'}
                      w={'11vw'}
                    >
                      <option value="recently-listed">Recently listed</option>
                      <option value="recently-created">Recently created</option>
                      <option value="recently-sold">Recently sold</option>
                      <option value="price-low-to-high">Price low to high</option>
                      <option value="price-high-to-low">Price high to low</option>
                      <option value="highest-last-sale">Highest last sale</option>
                    </Select>
                  </Box>
                  <Box pl="10px">
                    <Select
                      fontSize={'0.9vw'}
                      fontWeight={'bold'}
                      borderColor={'gicv.black'}
                      placeholder="Select option"
                      defaultValue={'price-low-to-high'}
                      w={'15vw'}
                    >
                      <option value="recently-listed">Recently listed</option>
                      <option value="recently-created">Recently created</option>
                      <option value="recently-sold">Recently sold</option>
                      <option value="price-low-to-high">Price low to high</option>
                      <option value="price-high-to-low">Price high to low</option>
                      <option value="highest-last-sale">Highest last sale</option>
                    </Select>
                  </Box>
                </HStack>
                <Flex>
                  <VStack py={4}>
                    <Text fontWeight="bold" fontSize="16px">
                      2114 Results
                    </Text>
                  </VStack>
                </Flex>
                <Box>
                  <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                    <Box width="100%" px={8} boxShadow="md" rounded="md" bg="white">
                      <Image src="/images/Collectible/add.png" alt="" pt="70%" pb="10%" cursor="pointer" />
                      <Text textAlign="center" fontSize="12px" fontWeight="bold" color="#6C757D">
                        Create Bunddle
                      </Text>
                    </Box>
                    <GridItem>
                      <CardownerItems />
                    </GridItem>
                    <GridItem>
                      <CardownerItems />
                    </GridItem>
                    <GridItem>
                      <CardownerItems />
                    </GridItem>
                    <GridItem>
                      <CardownerItems />
                    </GridItem>
                  </Grid>
                </Box>

                <Box py={4}>
                  <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                    <GridItem>
                      <CardownerItems />
                    </GridItem>
                    <GridItem>
                      <CardownerItems />
                    </GridItem>
                    <GridItem>
                      <CardownerItems />
                    </GridItem>
                    <GridItem>
                      <CardownerItems />
                    </GridItem>
                    <GridItem>
                      <CardownerItems />
                    </GridItem>
                  </Grid>
                </Box>

                <Box>
                  <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                    <GridItem>
                      <CardownerItems />
                    </GridItem>
                    <GridItem>
                      <CardownerItems />
                    </GridItem>
                    <GridItem>
                      <CardownerItems />
                    </GridItem>
                    <GridItem>
                      <CardownerItems />
                    </GridItem>
                    <GridItem>
                      <CardownerItems />
                    </GridItem>
                  </Grid>
                </Box>
                <Center>
                  <Button
                    variant={'outline'}
                    fontSize={['1vw', '1vw', '1vw']}
                    color={'gicv.gray.900'}
                    px={['1vw', '1vw', '2.5vw']}
                    h={'3vw'}
                    border={'0.1vw solid'}
                    borderColor={'gicv.gray.500'}
                    borderRadius={'0.3vw'}
                    mt={'2vw'}
                  >
                    Load More
                  </Button>
                </Center>
              </Box>
            </GridItem>
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}

export default TabItems
