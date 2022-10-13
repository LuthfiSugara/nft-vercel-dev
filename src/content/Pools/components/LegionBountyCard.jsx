import { GridItem, Text, Box, HStack, VStack, Button } from '@chakra-ui/react'

const LegionBountyCard = () => {
  return (
    <GridItem colSpan={[2, 1]}>
      <Box
        width={['auto', 'max-content']}
        ml={['0', 'auto']}
        bg="legion.light"
        rounded="32px"
        px={['4', '6']}
        py={['4', '5']}
      >
        <Text fontSize={['md', 'lg']} fontWeight="bold" color="legion.secondary">
          Auto LEGION Bounty
        </Text>
        <HStack justifyContent="space-between" alignItems="flex-end" mt="2" spacing={[8, 16]}>
          <VStack align="start">
            <VStack align="flex-start" spacing={-1}>
              <Text fontWeight="bold" fontSize={['xl', '2xl']} letterSpacing="wider">
                0.006
              </Text>
              <Text color="legion.secondary" fontWeight="bold" fontSize={['xs', 'md']}>
                ~0.16 USD
              </Text>
            </VStack>
          </VStack>
          <Button px={'8'} py={['4', '5']} colorScheme="primary" color="white" rounded="xl" fontSize={['sm', 'lg']}>
            Claim
          </Button>
        </HStack>
      </Box>
    </GridItem>
  )
}

export default LegionBountyCard
