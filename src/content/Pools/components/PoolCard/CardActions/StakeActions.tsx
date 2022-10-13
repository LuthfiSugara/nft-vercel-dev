import React from 'react'
import { Flex, Button, Skeleton } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import BigNumber from 'bignumber.js'
import { useTranslation } from '@app/context' 
import { getBalanceNumber } from '@app/utils/formatBalance'
import { DeserializedPool } from '@app/store/typed'
import Balance from '@app/components/Balance'
import { useModal } from '@app/context/Modal/useModal'
import StakeModal from '../Modals/StakeModal'
import NotEnoughTokensModal from '../Modals/NotEnoughTokensModal'
import styled from 'styled-components'
// import NotEnoughTokensModal from '../Modals/NotEnoughTokensModal'
// import StakeModal from '../Modals/StakeModal'

const IconButtonWrapper = styled.div`
  display: flex;
`
interface StakeActionsProps {
  pool: DeserializedPool
  stakingTokenBalance: BigNumber
  stakedBalance: BigNumber
  isBnbPool: boolean
  isStaked: ConstrainBoolean
  isLoading?: boolean
}

const StakeAction: React.FC<StakeActionsProps> = ({
  pool,
  stakingTokenBalance,
  stakedBalance,
  isBnbPool,
  isStaked,
  isLoading = false,
}) => {
  const { stakingToken, stakingTokenPrice, stakingLimit, isFinished, userData } = pool
  const { t } = useTranslation()
  const stakedTokenBalance = getBalanceNumber(stakedBalance, stakingToken.decimals)
  // const stakedTokenDollarBalance = getBalanceNumber(
  //   stakedBalance.multipliedBy(stakingTokenPrice),
  //   stakingToken.decimals,
  // )

  const [onPresentTokenRequired] = useModal(
    <NotEnoughTokensModal 
      pool={pool}
    />,
    true,
    false,
    'notEnoughTokenModal'
  )

  const [onPresentStake] = useModal(
    <StakeModal
      isBnbPool={isBnbPool}
      pool={pool}
      stakingTokenBalance={stakingTokenBalance}
      stakingTokenPrice={stakingTokenPrice}
    />,
    true,
    false,
    'addStakeModal'
  )

  const [onPresentUnstake] = useModal(
    <StakeModal
      stakingTokenBalance={stakingTokenBalance}
      isBnbPool={isBnbPool}
      pool={pool}
      stakingTokenPrice={stakingTokenPrice}
      isRemovingStake
    />,
    true,
    false,
    'minusStakeModal'
  )

  // const { targetRef, tooltip, tooltipVisible } = useTooltip(
  //   t('You’ve already staked the maximum amount you can stake in this pool!'),
  //   { placement: 'bottom' },
  // )

  const reachStakingLimit = stakingLimit.gt(0) && userData.stakedBalance.gte(stakingLimit)

  const renderStakeAction = () => {
    return isStaked ? (
      <Flex justifyContent="space-between" alignItems="center">
        <Balance fontSize={['5vw', '5vw', '1.7vw', '1.2vw']} decimals={2} value={stakedTokenBalance} />
        {/* {stakingTokenPrice !== 0 && (
        <Balance
          fontSize="12px"
          color="textSubtle"
          decimals={2}
          value={stakedTokenDollarBalance}
          prefix="~"
          unit=" USD"
        />
        )} */}
        <IconButtonWrapper>
          {/* <Button variant="secondary" onClick={onPresentUnstake} mr="6px"> */}
          <Button 
              variant="outline" 
              onClick={onPresentUnstake}
              // onClick={() => alert('onPresentUnstake')} 
              mr={['2vw', '2vw', '0.7vw', '0.5vw']}
              colorScheme="primary" 
              color="legion.primary" 
              py={['5vw', '5vw', '1vw', '1.4vw']}
              px={['4vw', '4vw', '1vw', '1vw']}

          >
            <MinusIcon />
          </Button>
          {reachStakingLimit ? (
            // <span ref={targetRef}>
            <span>
              <Button
                variant="outline"
                colorScheme="primary" 
                color="legion.primary" 
                py={['5vw', '5vw', '1vw', '1.4vw']}
                px={['4vw', '4vw', '1vw', '1vw']}
                disabled
              >
                <AddIcon />
              </Button>
            </span>
          ) : (
            <Button
              variant="outline"
              onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}
              colorScheme="primary" 
              color="legion.primary" 
              py={['5vw', '5vw', '1vw', '1.4vw']}
              px={['4vw', '4vw', '1vw', '1vw']}
              disabled={isFinished}
            >
              <AddIcon />
            </Button>
          )}
        </IconButtonWrapper>
        {/* {tooltipVisible && tooltip} */}
      </Flex>
    ) : (
      <Button 
        colorScheme="primary" 
        color="white" 
        width="100%" 
        borderRadius={['2vw', '2vw', '0.5vw']}
        disabled={isFinished} 
        onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}
        fontSize={['4.5vw', '4.5vw', '1.4vw', '1vw']}
        py={['5vw', '5vw', '1.7vw', '1.4vw']}
        px={['4.5vw', '4.5vw', '1.8vw', '1.5vw']}
        mt={['1.2vw', '1.2vw', '0.9vw', '0.3vw']}
      >
        {t('Stake')}
      </Button>
    )
  }

  return <Flex flexDirection="column">{isLoading ? <Skeleton width="100%" height="40px" rounded="2xl" mt="10px"/> : renderStakeAction()}</Flex>
}

export default StakeAction
