import { Text, Flex, VStack } from '@chakra-ui/react'
import React from 'react'

const WorthCard = () => {
  return (
    <Flex
      bg="legion.dark"
      px="6"
      pb="6"
      pt="4"
      flexDirection="column"
      height="full"
      width="full"
      justifyContent="space-between"
      rounded="3xl"
    >
      <Text fontWeight="bold" fontSize="24px" lineHeight="36px" py="3">
        LEGION LP Worth
      </Text>
      <VStack>
        <Flex fontSize="sm" width="full" fontWeight="bold" align="center" justify="space-between">
          <Text color="legion.secondary">LEGION-BNB</Text>
          <Text>$0.000</Text>
        </Flex>
        <Flex fontSize="sm" fontWeight="bold" width="full" align="center" justify="space-between">
          <Text color="legion.secondary">LEGION-BUSD</Text>
          <Text>$0.000</Text>
        </Flex>
      </VStack>
    </Flex>
  )
}

export default WorthCard
