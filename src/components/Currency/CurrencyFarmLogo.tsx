import useHttpLocations from '@app/hooks/useHttpLocation'
import { WrappedTokenInfo } from '@app/store/lists/hooks'
import { useMemo } from 'react'
import { Currency, ETHER, Token } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import getTokenLogoURL from '@app/utils/getTokenLogoURL'
import ImageWithFallback from '@app/components/Shared/ImageWithFallback'
import BinanceIcon from '../Icons/Tokens/BinanceIcon'

interface CurrencyLogoProps {
  currency: Currency
  size?: number
}

const CurrencyLogo = ({ currency, size = 24 }: CurrencyLogoProps) => {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs = useMemo(() => {
    // BNB Logo use manual address: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
    if (currency === ETHER) return []
    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL()]
      }
      return [getTokenLogoURL()]
    }
    return []
  }, [currency, uriLocations])
  if (currency === ETHER) return <BinanceIcon />
  return (
    <ImageWithFallback
      srcs={srcs}
      height={`${size}px`}
      width={`${size}px`}
      boxSize={`${size}px`}
      alt={currency?.name}
    />
  )
}

export default CurrencyLogo
