import React from 'react'
import styled from 'styled-components'
import { Flex, Text, Skeleton } from '@chakra-ui/react'
import { useTranslation } from '@app/context' 
import Balance from '@app/components/Balance'
// import RoiCalculatorModal from '@app/components/RoiCalculatorModal'
import { DeserializedPool } from '@app/store/typed'
import { getAprData } from '../../helpers' 
import BigNumber from 'bignumber.js'
// import { BIG_ZERO } from '@app/utils/bigNumber'

const ApyLabelContainer = styled(Flex)`
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`

interface AprRowProps {
  pool: DeserializedPool
  stakedBalance: BigNumber
  performanceFee?: number
}

const AprRow: React.FC<AprRowProps> = ({ pool, performanceFee = 0 }) => {
  const { t } = useTranslation()
  const { isFinished } =
    pool

  // const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO

  // const tooltipContent = isAutoVault
  //   ? t('APY includes compounding, APR doesn’t. This pool’s CAKE is compounded automatically, so we show APY.')
  //   : t('This pool’s rewards aren’t compounded automatically, so we show APR')

  // const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, { placement: 'bottom-start' })

  const { apr: earningsPercentageToDisplay } = getAprData(pool, performanceFee)

  // const apyModalLink = stakingToken.address ? `/swap?outputCurrency=${stakingToken.address}` : '/swap'

  // const [onPresentApyModal] = useModal(
  //   <RoiCalculatorModal
  //     earningTokenPrice={earningTokenPrice}
  //     stakingTokenPrice={stakingTokenPrice}
  //     apr={apr}
  //     linkLabel={t('Get %symbol%', { symbol: stakingToken.symbol })}
  //     linkHref={apyModalLink}
  //     stakingTokenBalance={stakedBalance.plus(stakingTokenBalance)}
  //     stakingTokenSymbol={stakingToken.symbol}
  //     earningTokenSymbol={earningToken.symbol}
  //     autoCompoundFrequency={autoCompoundFrequency}
  //     performanceFee={performanceFee}
  //   />,
  // )

  return (
    <Flex fontSize={['4.5vw', '4.5vw', '1.5vw', '1.2vw']} alignItems="center" justifyContent="space-between">
      {/* {tooltipVisible && tooltip}
      <TooltipText ref={targetRef}>{isAutoVault ? `${t('APY')}:` : `${t('APR')}:`}</TooltipText> */}
      <Text>{`${t('APR')} : `}</Text>
      {earningsPercentageToDisplay || isFinished ? (
        <ApyLabelContainer>
          <Balance
            isDisabled={isFinished}
            value={isFinished ? 0 : earningsPercentageToDisplay}
            decimals={2}
            unit="%"
          />
          {/* {!isFinished && (
            <IconButton variant="text" scale="sm">
              <CalculateIcon color="textSubtle" width="18px" />
            </IconButton>
          )} */}
        </ApyLabelContainer>
      ) : (
        <Skeleton width={['20vw', '20vw', '7vw', '5vw']} height={['5.5vw', '5.5vw', '2vw', '1.5vw']} />
      )}
    </Flex>
  )
}

export default AprRow
