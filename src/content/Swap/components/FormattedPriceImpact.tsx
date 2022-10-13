import { Percent } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import React from 'react'
import { ONE_BIPS } from '@app/config/constants'
import { Text } from '@chakra-ui/react'

/**
 * Formatted version of price impact text with warning colors
 */
export default function FormattedPriceImpact({ priceImpact }: { priceImpact?: Percent }) {
  return (
    <Text fontSize="14px">
      {priceImpact ? (priceImpact.lessThan(ONE_BIPS) ? '<0.01%' : `${priceImpact.toFixed(2)}%`) : '-'}
    </Text>
  )
}
