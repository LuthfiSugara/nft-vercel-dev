import PageHeading from '@app/components/Shared/PageHeading'
import { Text, Box } from '@chakra-ui/react'
import React from 'react'

const Hero = () => {
  return (
    <Box>
      <PageHeading>Farms</PageHeading>
      <Text color="legion.light" fontSize="xl" fontWeight="bold">
        Stake Liquidity Pool (LP) tokens to earn.
      </Text>
    </Box>
  )
}

export default Hero
