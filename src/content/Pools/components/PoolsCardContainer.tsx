// import { legionTokens } from '@app/mocks'
import { Box, Grid } from '@chakra-ui/react'
import { PoolsCard } from '.'

const PoolsCardContainer = ({
  pools,
  account,
  userDataLoaded
}) => {
  return (
    <Box mt={['10vw', '10vw', '5vw', '5vw']}>
      <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)']} alignItems="start">
        {pools.map((pool, idx) => (
          <PoolsCard key={`${pool.sousId}-${idx}`} pool={pool} account={account} userDataLoaded={userDataLoaded} />
        ))}
      </Grid>
    </Box>
  )
}

export default PoolsCardContainer
