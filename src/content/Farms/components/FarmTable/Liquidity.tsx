import React from 'react'
// import styled from 'styled-components'
import { Text, Skeleton } from '@chakra-ui/react'
// import { useTranslation } from '@app/context'
import BigNumber from 'bignumber.js'

// const ReferenceElement = styled.div`
//   display: inline-block;
// `

export interface LiquidityProps {
  liquidity: BigNumber
}

// const LiquidityWrapper = styled.div`
//   min-width: 110px;
//   font-weight: 600;
//   text-align: right;
//   margin-right: 14px;

//   ${({ theme }) => theme.mediaQueries.lg} {
//     text-align: left;
//     margin-right: 0;
//   }
// `

// const Container = styled.div`
//   display: flex;
//   align-items: center;
// `

const Liquidity: React.FunctionComponent<LiquidityProps> = ({ liquidity }) => {
  // console.log(liquidity)
  const displayLiquidity =
    liquidity && liquidity.gt(0) ? (
      <Text>${Number(liquidity).toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
    ) : (
      <Skeleton width={100} height={5} />
    )
  // const { t } = useTranslation()
  // const { targetRef, tooltip, tooltipVisible } = useTooltip(
  //   t('Total value of the funds in this farm’s liquidity pool'),
  //   { placement: 'top-end', tooltipOffset: [20, 10] },
  // )

  return (
      displayLiquidity
      // <ReferenceElement ref={targetRef}>
      //   <HelpIcon color="textSubtle" />
      // </ReferenceElement>
      // {tooltipVisible && tooltip}
  )
}

export default Liquidity
