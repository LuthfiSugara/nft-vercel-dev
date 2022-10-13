import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { BIG_ZERO } from '@app/utils/bigNumber'
import { Flex, Text, Box } from '@chakra-ui/react'
import { useTranslation } from '@app/context'
import { PoolCategory } from '@app/config/constants/types'
import { DeserializedPool } from '@app/store/typed'
import ApprovalAction from './ApprovalAction'
import StakeActions from './StakeActions'
import HarvestActions from './HarvestActions'

const InlineText = styled(Text)`
  display: inline;
`

interface CardActionsProps {
  pool: DeserializedPool
  stakedBalance: BigNumber
  userDataLoaded: boolean
}

const CardActions: React.FC<CardActionsProps> = ({ pool, stakedBalance, userDataLoaded }) => {
  const { sousId, stakingToken, earningToken, harvest, poolCategory, userData, earningTokenPrice } = pool
  // Pools using native BNB behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const { t } = useTranslation()
  const allowance = userData?.allowance ? new BigNumber(userData.allowance) : BIG_ZERO
  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO
  const earnings = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO
  const needsApproval = !allowance.gt(0) && !isBnbPool
  const isStaked = stakedBalance.gt(0)
  const isLoading = !userData || !userDataLoaded

  return (
    <Flex flexDirection="column">
      {harvest && (
        <>
          <Box
            display="inline"
            fontSize={['3.4vw', '3.4vw', '1.1vw', '0.8vw']}
            mt={['4.5vw', '4.5vw', '1.5vw', '1vw']}
            mb={['2vw', '2vw', '0.5vw', '0.3vw']}
          >
            <InlineText color="secondary" textTransform="uppercase">
              {`${earningToken.symbol} `}
            </InlineText>
            <InlineText color="textSubtle" textTransform="uppercase">
              {t('Earned')}
            </InlineText>
          </Box>
          <HarvestActions
            earnings={earnings}
            earningToken={earningToken}
            sousId={sousId}
            earningTokenPrice={earningTokenPrice}
            isBnbPool={isBnbPool}
            isLoading={isLoading}
          />
        </>
      )}
      <Box
        display="inline"
        fontSize={['3.4vw', '3.4vw', '1.1vw', '0.8vw']}
        mt={['4.5vw', '4.5vw', '1.5vw', '1vw']}
        mb={['2vw', '2vw', '0.5vw', '0.3vw']}
      >
        <InlineText color={isStaked ? 'secondary' : 'textSubtle'} textTransform="uppercase">
          {isStaked ? stakingToken.symbol : t('Stake')}{' '}
        </InlineText>
        <InlineText color={isStaked ? 'textSubtle' : 'secondary'} textTransform="uppercase">
          {isStaked ? t('Staked') : `${stakingToken.symbol}`}
        </InlineText>
      </Box>
      {needsApproval ? (
        <ApprovalAction pool={pool} isLoading={isLoading} />
      ) : (
        <StakeActions
          isLoading={isLoading}
          pool={pool}
          stakingTokenBalance={stakingTokenBalance}
          stakedBalance={stakedBalance}
          isBnbPool={isBnbPool}
          isStaked={isStaked}
        />
      )}
      {/* {!userDataLoaded && (
        <Flex spacing={9} width="full" height="full" px="2" py={['2', '0']} justifyContent="space-between">
          <VStack align="start" spacing={4} width="full" height="full">
            <Text>
              {t('Start Farming')}
            </Text>
            <Flex justifyContent="right" width="full" alignItems="center">
              <Skeleton height="48px" width="104px" rounded="2xl" />
            </Flex>
          </VStack>
        </Flex>
      )} */}
    </Flex>
  )
}

export default CardActions
