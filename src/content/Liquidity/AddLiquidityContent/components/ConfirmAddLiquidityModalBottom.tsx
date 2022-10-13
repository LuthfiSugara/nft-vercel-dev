import CurrencyLogo from '@app/components/Currency/CurrencyLogo'
import { useTranslation } from '@app/context/Localization'
import { CURRENCY_FIELD } from '@app/store/mint/slice'
import { Currency, CurrencyAmount, Fraction, Percent } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { Button, Flex, HStack, Text } from '@chakra-ui/react'

const ConfirmAddLiquidityModalBottom = ({
  noLiquidity,
  price,
  currencies,
  parsedAmounts,
  poolTokenPercentage,
  onAdd,
}: {
  noLiquidity?: boolean
  price?: Fraction
  currencies: { [field in CURRENCY_FIELD]?: Currency }
  parsedAmounts: { [field in CURRENCY_FIELD]?: CurrencyAmount }
  poolTokenPercentage?: Percent
  onAdd: () => void
}) => {
  const { t } = useTranslation()
  return (
    <Flex direction="column" gridRowGap="3" align="stretch" py="3">
      <Flex justify="space-between">
        <Text>{t('%asset% Deposited', { asset: currencies[CURRENCY_FIELD.CURRENCY_A]?.symbol })}</Text>
        <HStack>
          <CurrencyLogo currency={currencies[CURRENCY_FIELD.CURRENCY_A]} />
          <Text>{parsedAmounts[CURRENCY_FIELD.CURRENCY_A]?.toSignificant(6)}</Text>
        </HStack>
      </Flex>
      <Flex justify="space-between">
        <Text>{t('%asset% Deposited', { asset: currencies[CURRENCY_FIELD.CURRENCY_B]?.symbol })}</Text>
        <HStack>
          <CurrencyLogo currency={currencies[CURRENCY_FIELD.CURRENCY_B]} />
          <Text>{parsedAmounts[CURRENCY_FIELD.CURRENCY_B]?.toSignificant(6)}</Text>
        </HStack>
      </Flex>
      <Flex justify="space-between">
        <Text>{t('Rates')}</Text>
        <Text>{`1 ${currencies[CURRENCY_FIELD.CURRENCY_A]?.symbol} = ${price?.toSignificant(4)} ${
          currencies[CURRENCY_FIELD.CURRENCY_B]?.symbol
        }`}</Text>
      </Flex>
      <Flex justify="flex-end">
        <Text>{`1 ${currencies[CURRENCY_FIELD.CURRENCY_B]?.symbol} = ${price?.invert().toSignificant(4)} ${
          currencies[CURRENCY_FIELD.CURRENCY_A]?.symbol
        }`}</Text>
      </Flex>
      <Flex justify="space-between">
        <Text>{t('Share of Pool')}</Text>
        <Text>{noLiquidity ? '100' : poolTokenPercentage?.toSignificant(4)}%</Text>
      </Flex>
      <Button colorScheme="primary" color="white" mr="auto" size="md" rounded="xl" onClick={onAdd}>
        {noLiquidity ? t('Create Pool & Supply') : t('Confirm Supply')}
      </Button>
    </Flex>
  )
}

export default ConfirmAddLiquidityModalBottom
