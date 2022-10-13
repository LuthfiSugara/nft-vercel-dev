import { withCustomScrollBar } from '@app/config/theme/withCustomScrollbar'
import { Box, Flex, MenuItem, Spinner, Text, VStack } from '@chakra-ui/react'
import { Currency, CurrencyAmount, currencyEquals } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { memo, useMemo } from 'react'
import CurrencyLogo from './CurrencyLogo'
import { isTokenOnList } from '@app/utils'
import { useActiveWeb3React, useIsUserAddedToken } from '@app/hooks'
import { useCombinedActiveList } from '@app/store/lists/hooks'
import styled from '@emotion/styled'
import { useCurrencyBalance } from '@app/store/wallet/hooks'
// import { testnetTokens } from '@app/config/constants/tokens'

const StyledBalanceText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  max-width: 5rem;
  text-overflow: ellipsis;
`

function Balance({ balance }: { balance: CurrencyAmount }) {
  return <StyledBalanceText title={balance.toExact()}>{balance.toSignificant(4)}</StyledBalanceText>
}

interface CurrencyRowProps {
  currency: Currency
  onSelect: () => void
  isSelected: boolean
  otherSelected?: boolean
}

const CurrencyRow = ({ onSelect, isSelected, currency }: CurrencyRowProps) => {
  const { account } = useActiveWeb3React()
  const selectedTokenList = useCombinedActiveList()
  const balance = useCurrencyBalance(account ?? undefined, currency)
  const isOnSelectedList = isTokenOnList(selectedTokenList, currency)
  const customAdded = useIsUserAddedToken(currency)
  return (
    <MenuItem
      letterSpacing="wider"
      display="flex"
      alignItems="center"
      _hover={{
        backgroundColor: 'legion.light',
      }}
      rounded="2xl"
      onClick={() => onSelect()}
      isDisabled={isSelected}
    >
      <Flex align="center" justify="space-between" w="full">
        <Flex align="center">
          <CurrencyLogo currency={currency} />
          <Box ml="2">
            <Text fontWeight="bold">{currency.symbol}</Text>
            <Text fontSize="sm" color="legion.secondary">
              {!isOnSelectedList && customAdded && 'Added by user •'} {currency.name}
            </Text>
          </Box>
        </Flex>
        <Box>
          {balance ? (
            <Balance balance={balance} />
          ) : account ? (
            <Spinner color="legion.primary" thickness="4px" size="sm" />
          ) : null}
        </Box>
      </Flex>
    </MenuItem>
  )
}

interface CurrencyListProps {
  showETH: boolean
  currencies: Currency[]
  breakIndex?: number | undefined
  onSelect: (e: Currency) => void
  disabledToken: Currency
  selectedCurrency: Currency
}

const CurrencyList = ({
  showETH,
  currencies,
  breakIndex,
  onSelect,
  selectedCurrency,
  disabledToken,
}: CurrencyListProps) => {
  const itemData: Currency[] = useMemo(() => {
    let formatted = showETH ? [Currency.ETHER, ...currencies] : currencies
    if (breakIndex !== undefined) {
      formatted = [...formatted.slice(0, breakIndex), ...formatted.slice(breakIndex, formatted.length)]
    }
    return formatted
  }, [breakIndex, currencies, showETH])

  return (
    <VStack overflowY="auto" height="72" pb="2" sx={withCustomScrollBar('4px', 'legion.secondary')}>
      {itemData.map((currency, idx) => (
        <CurrencyRow
          currency={currency}
          onSelect={() => onSelect(currency)}
          isSelected={Boolean(selectedCurrency && currencyEquals(selectedCurrency, currency))}
          otherSelected={Boolean(disabledToken && currencyEquals(disabledToken, currency))}
          key={idx}
        />
      ))}
    </VStack>
  )
}

export default memo(CurrencyList)
