import React from 'react'
// import styled from 'styled-components'
import BigNumber from 'bignumber.js'
// import { Flex } from '@chakra-ui/react'
// import RoiCalculatorModal from '@app/components/RoiCalculatorModal' 
// import { useTranslation } from '@app/context' 
// import { useLpTokenPrice } from '@app/store/farms/hooks'
// import { useModal } from '@app/context/Modal/useModal'

// const ApyLabelContainer = styled(Flex)`
//   cursor: pointer;

//   &:hover {
//     opacity: 0.5;
//   }
// `

export interface ApyButtonProps {
  variant: 'text' | 'text-and-button'
  pid: number
  lpSymbol: string
  lpLabel?: string
  multiplier: string
  legionPrice?: BigNumber
  apr?: number
  displayApr?: string
  addLiquidityUrl?: string
}

const ApyButton: React.FC<ApyButtonProps> = ({
  // variant,
  // pid,
  // lpLabel,
  // lpSymbol,
  // legionPrice,
  // apr,
  // multiplier,
  displayApr,
  // addLiquidityUrl,
}) => {
  // const { t } = useTranslation()
  // const lpPrice = useLpTokenPrice(lpSymbol)
  // const { tokenBalance, stakedBalance } = useFarmUser(pid)
  // const [onPresentApyModal] = useModal(
  //   <RoiCalculatorModal
  //     linkLabel={t('Get %symbol%', { symbol: lpLabel })}
  //     stakingTokenBalance={stakedBalance.plus(tokenBalance)}
  //     stakingTokenSymbol={lpSymbol}
  //     stakingTokenPrice={lpPrice.toNumber()}
  //     earningTokenPrice={legionPrice.toNumber()}
  //     apr={apr}
  //     multiplier={multiplier}
  //     displayApr={displayApr}
  //     linkHref={addLiquidityUrl}
  //     isFarm
  //   />,
  // )

  // const handleClickButton = (event): void => {
  //   event.stopPropagation()
  //   // onPresentApyModal()
  // }

  return (
    <>
      {displayApr}%
    </>
  )
}

export default ApyButton
