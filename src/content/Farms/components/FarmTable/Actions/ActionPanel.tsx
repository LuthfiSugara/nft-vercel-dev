import { Flex, Collapse, Grid, Text, GridItem, Box } from '@chakra-ui/react'
// import { useWeb3React } from '@web3-react/core'
import { memo } from 'react'
import { FarmWithStakedValue } from '../../FarmCard/FarmCard'
import HarvestAction from './HarvestAction'
import StakedAction from './StackedAction'
import Apr, { AprProps } from '../Apr'
import Multiplier, { MultiplierProps } from '../Multiplier'
import Liquidity, { LiquidityProps } from '../Liquidity'
import { useTranslation } from '@app/context'

export interface ActionPanelProps {
  apr: AprProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
  userDataReady: boolean
  expanded: boolean
}

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({
  details,
  apr,
  multiplier,
  liquidity,
  userDataReady,
  expanded,
}) => {
  // const { isDetailOpen, userDataReady, data } = props
  const { t } = useTranslation()
  const farm = details
  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('LEGION', '')
  // const { active } = useWeb3React()
  
  return (
    <Collapse in={expanded} animateOpacity unmountOnExit>
      <Grid
        py={[4, 8]}
        px={[0, 8]}
        fontWeight="bold"
        bg="legion.light"
        gap={[4, 12]}
        templateColumns={['repeat(2, 1fr)', 'repeat(16, 1fr)']}
        templateRows={'repeat(1, 1fr)'}
      >
        <GridItem gridGap="4" colSpan={[2, 4]} px={4} display="flex" flexWrap="wrap">
          <Box display={['block', 'none']} flex="1 1 40%">
            <Text color="legion.secondary" fontSize={'xs'}>{t('APR')}</Text>
            <Apr {...apr} />
          </Box>
          <Box display={['block', 'none']} flex="1 1 40%">
            <Text color="legion.secondary" fontSize={'xs'}>{t('Liquidity')}</Text>
            <Liquidity {...liquidity} />
          </Box>
          <Box display={['block', 'none']} flex="1 1 40%">
            <Text color="legion.secondary" fontSize={'xs'}>{t('Multiplier')}</Text>
            <Multiplier {...multiplier} />
          </Box>
          <Flex flexDirection="column" color="legion.secondary" flex="1 1 100%">
            <Text>Get LEGION-BNB LP</Text>
            <Text>View Contract</Text>
            <Text>See Pair Info</Text>
          </Flex>
        </GridItem>
        <GridItem
          p={4}
          border="1px"
          rounded="2xl"
          backgroundColor="legion.dark"
          borderColor="brand.bg.8"
          colSpan={[2, 6]}
        >
          {/* <HarvestAction data={data} userDataReady={userDataReady} /> */}
          <HarvestAction {...farm} userDataReady={userDataReady} />

          {/* <Flex spacing={9} width="full" height="full" px="2" py={['2', '0']} justifyContent="space-between">
            <VStack align="start" spacing={4} width="full" height="full">
              <Text>LEGION EARNED</Text>
              <Flex justifyContent="space-between" width="full" alignItems="center">
                <Text fontSize="xxx-large">{active ? 1000 : 0}</Text>
                <Button colorScheme="primary" color="white" p="6" rounded={'2xl'} mt="auto" disabled={!active}>
                  Harvest
                </Button>
              </Flex>
            </VStack>
          </Flex> */}
          
        </GridItem>
        <GridItem
          p={4}
          gridGap={4}
          border="1px"
          rounded="2xl"
          display="flex"
          flexDirection="column"
          backgroundColor="legion.dark"
          borderColor="brand.bg.8"
          colSpan={[2, 6]}
          justifyContent="space-between"
        >
          {/* <StakedAction data={data} userDataReady={userDataReady} /> */}
          <StakedAction {...farm} userDataReady={userDataReady} lpLabel={lpLabel} displayApr={apr.value} />
        </GridItem>
      </Grid>
    </Collapse>
  )
}

export default memo(ActionPanel)
