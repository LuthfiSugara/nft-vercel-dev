import { Currency } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import React from 'react'
import styled from '@emotion/styled'
import CurrencyLogo from './CurrencyLogo'

const Wrapper = styled.div<{ margin: boolean }>`
  display: flex;
  flex-direction: row;
  column-gap: 4px;
  margin-right: ${({ margin }) => margin && '4px'};
`

interface DoubleCurrencyLogoProps {
  margin?: boolean
  size?: number
  currency0?: Currency
  currency1?: Currency
}

export default function DoubleCurrencyLogo({
  currency0,
  currency1,
  size = 20,
  margin = false,
}: DoubleCurrencyLogoProps) {
  return (
    <Wrapper margin={margin}>
      {currency0 && <CurrencyLogo currency={currency0} size={size} />}
      {currency1 && <CurrencyLogo currency={currency1} size={size} />}
    </Wrapper>
  )
}
