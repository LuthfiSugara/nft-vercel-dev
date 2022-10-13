import { SUGGESTED_BASES } from '@app/config/constants'
import { useTranslation } from '@app/context/Localization'
import { ChainId, Currency, currencyEquals, ETHER, Token } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { Button, ButtonProps, Flex, Text, useBreakpointValue, VStack } from '@chakra-ui/react'
import QuestionHelper from '../Shared/QuestionHelper'
import CurrencyLogo from './CurrencyLogo'

interface CurrencyCommonBasesProps {
  chainId?: ChainId
  selectedCurrency?: Currency | null
  onSelect: (currency: Currency) => void
}

export default function CurrencyCommonBases({ onSelect, chainId, selectedCurrency }: CurrencyCommonBasesProps) {
  const { t } = useTranslation()
  const buttonSize = useBreakpointValue<ButtonProps['size']>(['sm', 'md'])
  return (
    <VStack align="start">
      <Flex align="center" gridGap="2">
        {t('Common bases')}
        <QuestionHelper
          icon="fill"
          label={t('These tokens are commonly paired with other tokens.')}
          placement="top-start"
        />
      </Flex>
      <Flex wrap={['wrap', 'nowrap']} justify={['center', 'space-between']} align="center" gridGap={[2, 0]} w="full">
        <Button
          leftIcon={<CurrencyLogo currency={ETHER} />}
          size={buttonSize}
          onClick={() => {
            if (!selectedCurrency || !currencyEquals(selectedCurrency, ETHER)) {
              onSelect(ETHER)
            }
          }}
          px="3"
          disabled={selectedCurrency === ETHER}
        >
          <Text>BNB</Text>
        </Button>
        {(chainId ? SUGGESTED_BASES[chainId] : []).map((token: Token) => {
          const selected = selectedCurrency instanceof Token && selectedCurrency.address === token.address
          return (
            <Button
              leftIcon={<CurrencyLogo currency={token} />}
              onClick={() => !selected && onSelect(token)}
              disabled={selected}
              key={token.address}
              size={buttonSize}
              ml="2"
              px="3"
            >
              <Text>{token.symbol}</Text>
            </Button>
          )
        })}
      </Flex>
    </VStack>
  )
}
