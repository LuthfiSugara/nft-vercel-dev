import { ONE_BIPS } from '@app/config/constants'
import { useTranslation } from '@app/context/Localization'
import { Currency, Percent, Price } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { Flex, SimpleGrid, Text } from '@chakra-ui/react'

interface PoolPriceBarProps {
  currencyA?: Currency | undefined
  currencyB?: Currency | undefined
  noLiquidity: boolean
  price?: Price | undefined
  poolTokenPercentage?: Percent | undefined
}

const PoolPriceBar = ({ currencyA, currencyB, noLiquidity, price, poolTokenPercentage }: PoolPriceBarProps) => {
  const { t } = useTranslation()
  return (
    <SimpleGrid columns={3} columnGap={4} borderWidth="1px" borderColor="brand.bg.5" p="3" rounded="2xl">
      <Flex direction="column" align="center">
        <Text fontSize="sm">{price?.toSignificant(6) ?? '-'}</Text>
        <Text fontSize="sm">
          {currencyA?.symbol ?? ''} per {currencyB?.symbol ?? ''}
        </Text>
      </Flex>
      <Flex direction="column" align="center">
        <Text fontSize="sm">{price?.invert()?.toSignificant(6) ?? '-'}</Text>
        <Text fontSize="sm">
          {currencyB?.symbol ?? ''} per {currencyA?.symbol ?? ''}
        </Text>
      </Flex>
      <Flex direction="column" align="center">
        <Text fontSize="sm">
          {noLiquidity && price
            ? '100'
            : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
          %
        </Text>
        <Text fontSize="sm">{t('Share of Pool')}</Text>
      </Flex>
    </SimpleGrid>
  )
}

export default PoolPriceBar
