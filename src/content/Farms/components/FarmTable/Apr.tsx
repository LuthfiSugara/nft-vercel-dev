import React from 'react'
import ApyButton from '../FarmCard/ApyButton' 
import BigNumber from 'bignumber.js'
import { BASE_ADD_LIQUIDITY_URL } from '@app/config' 
import getLiquidityUrlPathParts from '@app/utils/getLiquidityUrlPathParts' 
import { Skeleton } from '@chakra-ui/react'

export interface AprProps {
  value: string
  multiplier: string
  pid: number
  lpLabel: string
  lpSymbol: string
  tokenAddress?: string
  quoteTokenAddress?: string
  legionPrice: BigNumber
  originalValue: number
  hideButton?: boolean
}

const Apr: React.FC<AprProps> = ({
  value,
  pid,
  lpLabel,
  lpSymbol,
  multiplier,
  tokenAddress,
  quoteTokenAddress,
  legionPrice,
  originalValue,
  hideButton = false,
}) => {
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAddress, tokenAddress })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
  
  // return originalValue !== 0 ? (
  return originalValue !== undefined ? (
    <>
      {originalValue ? (
        <ApyButton
          variant={hideButton ? 'text' : 'text-and-button'}
          pid={pid}
          lpSymbol={lpSymbol}
          lpLabel={lpLabel}
          multiplier={multiplier}
          legionPrice={legionPrice}
          apr={originalValue}
          displayApr={value}
          addLiquidityUrl={addLiquidityUrl}
        />
      ) : (
        <>
          <Skeleton width={100} height={5} />
        </>
      )}
    </>
  ) : (
    <>
      <Skeleton width={100} height={5} />
    </>
  )
}

export default Apr
