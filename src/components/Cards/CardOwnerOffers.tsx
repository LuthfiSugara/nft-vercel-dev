import { Box, Grid, GridItem, HStack, Image, Text } from '@chakra-ui/react'

const CardOwnerOffers = () => {
  return (
    <Box>
      <Grid templateColumns="repeat(7, 1fr)" gap="20px">
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

        <GridItem w="100%" py={2}>
          <Text fontSize="12px" fontWeight="bold">
            90 WGICT
          </Text>
          <Text fontSize="12px" fontWeight="bold" color="#6C757D">
            $98.7
          </Text>
        </GridItem>

        <GridItem w="100%" py={4}>
          <Text fontSize="12px" fontWeight="bold">
            70% Below
          </Text>
        </GridItem>

        <GridItem w="100%" py={4}>
          <Text fontSize="12px" fontWeight="bold">
            0xsadb234bs3...
          </Text>
        </GridItem>

        <GridItem w="100%" py={4}>
          <Text fontSize="12px" fontWeight="bold">
            2 days ago
          </Text>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default CardOwnerOffers
