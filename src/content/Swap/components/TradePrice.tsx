import { Price } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { ArrowUpDownIcon } from '@chakra-ui/icons'
import { IconButton, Text } from '@chakra-ui/react'

interface TradePriceProps {
  price?: Price
  showInverted: boolean
  setShowInverted: (showInverted: boolean) => void
}

export default function TradePrice({ price, showInverted, setShowInverted }: TradePriceProps) {
  const formattedPrice = showInverted ? price?.toSignificant(6) : price?.invert()?.toSignificant(6)

  const show = Boolean(price?.baseCurrency && price?.quoteCurrency)
  const label = showInverted
    ? `${price?.quoteCurrency?.symbol} per ${price?.baseCurrency?.symbol}`
    : `${price?.baseCurrency?.symbol} per ${price?.quoteCurrency?.symbol}`

  return (
    <Text display="flex" alignItems="center" justifyContent="center">
      {show ? (
        <>
          {formattedPrice ?? '-'} {label}
          <IconButton
            aria-label="Invert"
            variant="link"
            minWidth="6"
            colorScheme="primary"
            onClick={() => setShowInverted(!showInverted)}
            icon={<ArrowUpDownIcon width="14px" />}
          />
        </>
      ) : (
        '-'
      )}
    </Text>
  )
}
