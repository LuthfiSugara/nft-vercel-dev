import Balance from '@app/components/Balance'
import { useFetchMMOrderHistoriesQuery } from '@app/store/myNftDetail/my-nft-detail-slice'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Divider, Grid, GridItem, HStack, Text } from '@chakra-ui/react'

const MMOrderHistoriesTabPanelItem = ({ mmid }) => {
  const page = 1
  const limit = 50
  const { data: mmOrderHistoriesAll = { data: { records: [] } }, isFetching: isMMOrderHistoriesFetching } =
    useFetchMMOrderHistoriesQuery({
      mmid,
      page,
      limit,
    })

  const mmOrderHistories = mmOrderHistoriesAll.data.records ? mmOrderHistoriesAll.data.records : []

  return (
    <>
      {!isMMOrderHistoriesFetching && mmOrderHistories.length !== 0
        ? mmOrderHistories.map((_, idx) => {
            return (
              <Box key={`mmOrderHistory__item__${idx}`} bg={'legion.white'}>
                <Grid templateColumns={'repeat(10, 1fr)'} py={['4vw', '4vw', '0.5vw']}>
                  <GridItem colSpan={7} display={'flex'} alignItems={'center'}>
                    <Box w={'100%'} px={['4vw', '4vw', '1vw']}>
                      <HStack fontWeight={'bold'} spacing={['3vw', '3vw', '1vw']} fontSize={['4vw', '4vw', '0.9vw']}>
                        <Text>{_.symbol}</Text>
                        <Text color={_.action === 'SELL' ? 'legion.error' : 'legion.success'}>{_.action}</Text>
                      </HStack>
                      <HStack fontWeight={'medium'} spacing={['3vw', '3vw', '1vw']}>
                        <Balance value={_.open} decimals={2} fontSize={['4vw', '4vw', '0.9vw']} />
                        <ArrowForwardIcon fontSize={['5vw', '5vw', '1.4vw']} />
                        <Balance value={_.close} decimals={2} fontSize={['4vw', '4vw', '0.9vw']} />
                      </HStack>
                    </Box>
                    <Box h={'100%'}>
                      <Divider orientation="vertical" bg={'rgba(0, 0, 0, 0.15)'} w={['0.3vw', '0.3vw', '0.1vw']} />
                    </Box>
                  </GridItem>
                  <GridItem colSpan={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Box fontWeight={'bold'}>
                      <Balance
                        value={_.profit}
                        decimals={2}
                        textAlign={'center'}
                        color={_.profit < 0 ? 'legion.error' : 'legion.success'}
                        fontSize={['4vw', '4vw', '1vw']}
                      />
                      <Text textAlign={'center'} fontSize={['3.5vw', '3.5vw', '0.9vw']}>
                        Profit/Loss
                      </Text>
                    </Box>
                  </GridItem>
                </Grid>
                <Grid templateColumns={'repeat(10, 1fr)'} bg={'legion.gray.100'} py={['4vw', '4vw', '0.5vw']}>
                  <GridItem colSpan={10} display={'flex'} alignItems={'center'}>
                    <HStack
                      spacing={['3vw', '3vw', '1vw']}
                      fontSize={['3vw', '3vw', '0.8vw']}
                      px={['4vw', '4vw', '1vw']}
                    >
                      <Box>
                        <Text>Open Date</Text>
                        <Text>Close Date</Text>
                      </Box>
                      <Box>
                        <Text>{_.open_date}</Text>
                        <Text>{_.close_date}</Text>
                      </Box>
                    </HStack>
                  </GridItem>
                  {/* <GridItem colSpan={5} display={'flex'} alignItems={'center'}>
                  <HStack spacing={'1vw'} fontSize={'0.8vw'} px={'1vw'}>
                    <Box>
                      <Text>Take Profit</Text>
                      <Text>Swap</Text>
                    </Box>
                    <Box>
                      <Balance value={0} decimals={2} />
                      <Balance value={0} decimals={0} />
                    </Box>
                  </HStack>
                </GridItem> */}
                </Grid>
              </Box>
            )
          })
        : [...Array(10)].map((_, idx) => (
            <Box key={`MMOrderHistories__Skeleton__${idx}`} bg={'legion.white'}>
              <Grid templateColumns={'repeat(10, 1fr)'} py={['4vw', '4vw', '0.5vw']}>
                <GridItem colSpan={7} display={'flex'} alignItems={'center'}>
                  <Box w={'100%'} px={['4vw', '4vw', '1vw']}>
                    <HStack fontWeight={'bold'} spacing={['3vw', '3vw', '1vw']} fontSize={['4vw', '4vw', '0.9vw']}>
                      <Text>-</Text>
                      <Text color={'legion.success'}>-</Text>
                    </HStack>
                    <HStack fontWeight={'medium'} spacing={['3vw', '3vw', '1vw']}>
                      <Balance value={0} decimals={2} fontSize={['4vw', '4vw', '0.9vw']} />
                      <ArrowForwardIcon fontSize={['5vw', '5vw', '1.4vw']} />
                      <Balance value={0} decimals={2} fontSize={['4vw', '4vw', '0.9vw']} />
                    </HStack>
                  </Box>
                  <Box h={'100%'}>
                    <Divider orientation="vertical" bg={'rgba(0, 0, 0, 0.15)'} w={['0.3vw', '0.3vw', '0.1vw']} />
                  </Box>
                </GridItem>
                <GridItem colSpan={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                  <Box fontWeight={'bold'}>
                    <Balance
                      value={0}
                      decimals={2}
                      textAlign={'center'}
                      color={'legion.success'}
                      fontSize={['4vw', '4vw', '1vw']}
                    />
                    <Text textAlign={'center'} fontSize={['3.5vw', '3.5vw', '0.9vw']}>
                      Profit/Loss
                    </Text>
                  </Box>
                </GridItem>
              </Grid>
              <Grid templateColumns={'repeat(10, 1fr)'} bg={'legion.gray.100'} py={['4vw', '4vw', '0.5vw']}>
                <GridItem colSpan={10} display={'flex'} alignItems={'center'}>
                  <HStack spacing={['3vw', '3vw', '1vw']} fontSize={['3vw', '3vw', '0.8vw']} px={['4vw', '4vw', '1vw']}>
                    <Box>
                      <Text>Open Date</Text>
                      <Text>Close Date</Text>
                    </Box>
                    <Box>
                      <Text>0000-00-00 00:00:00</Text>
                      <Text>0000-00-00 00:00:00</Text>
                    </Box>
                  </HStack>
                </GridItem>
                {/* <GridItem colSpan={5} display={'flex'} alignItems={'center'}>
              <HStack spacing={'1vw'} fontSize={'0.8vw'} px={'1vw'}>
                <Box>
                  <Text>Take Profit</Text>
                  <Text>Swap</Text>
                </Box>
                <Box>
                  <Balance value={0} decimals={2} />
                  <Balance value={0} decimals={0} />
                </Box>
              </HStack>
            </GridItem> */}
              </Grid>
            </Box>
          ))}
    </>
  )
}

export default MMOrderHistoriesTabPanelItem
