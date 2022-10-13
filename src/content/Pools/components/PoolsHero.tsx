import PageHeading from '@app/components/Shared/PageHeading'
import { Text, Box } from '@chakra-ui/react'

const PoolsHero: React.FC = () => {
  return (
    <Box>
      <PageHeading>Pools</PageHeading>
      <Text color="legion.light" fontSize={['6vw', '6vw', '1.2vw']} fontWeight="bold" letterSpacing={['normal', 'normal', 'wide']}>
        Simply stake tokens to earn.
        <br /> High APR, low risk.
      </Text>
    </Box>
  )
}

export default PoolsHero
