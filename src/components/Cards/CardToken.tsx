import { Flex, FormControl, Text, NumberInput, NumberInputField, Button } from '@chakra-ui/react'
import { ModalTokenSelection } from '../Modals'
import CurrencyLogo from '../Currency/CurrencyLogo'
import { Currency, Pair, Token } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { WrappedTokenInfo } from '@app/store/lists/hooks'
import { useModal } from '@app/context/Modal/useModal'
import { useTranslation } from '@app/context/Localization'
import { useActiveWeb3React } from '@app/hooks'
import { useCurrencyBalance } from '@app/store/wallet/hooks'
import { DoubleCurrencyLogo } from '../Currency'
import { ChevronDownIcon } from '@chakra-ui/icons'

interface CardTokenProps {
  setSelected: (e: Token) => void
  selectedToken: Currency | WrappedTokenInfo | null
  opponentToken?: Currency | WrappedTokenInfo | null
  label?: string
  onValueChange: (e: number | string) => void
  value: string | number
  id?: string
  showMaxButton?: boolean
  onMax?: () => void
  hideInput?: boolean
  pair?: Pair | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
}

const CardToken = ({
  setSelected,
  selectedToken,
  opponentToken,
  onValueChange,
  value,
  showMaxButton,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  onMax,
  id,
  hideInput,
  label = '',
}: CardTokenProps) => {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, selectedToken ?? undefined)

  const [onPresentCurrencyModal] = useModal(
    <ModalTokenSelection
      setSelected={setSelected}
      showCommonBases
      opponent={opponentToken}
      selectedCurrency={selectedToken}
    />
  )
  return (
    <Flex rounded="xl" height="90px" bgColor="gicv.light" boxShadow="inner" id={id}>
      <Flex w="full" justify="space-between" px="4" py="2" align="stretch" direction="column">
        <Flex justify="space-between">
          <Text>{label}</Text>
          {account && (
            <Text onClick={onMax} fontSize="14px" style={{ display: 'inline', cursor: 'pointer' }}>
              {!hideBalance && !!selectedToken
                ? t('Balance: %balance%', { balance: selectedCurrencyBalance?.toSignificant(6) ?? t('Loading') })
                : ' -'}
            </Text>
          )}
        </Flex>
        <Flex justify="space-between" gridColumnGap="2">
          {!hideInput && (
            <FormControl id={id}>
              <NumberInput id={id} onChange={onValueChange} value={value}>
                <NumberInputField id={id} pl="1.5" placeholder="0.0" border="none" ring="none" />
              </NumberInput>
            </FormControl>
          )}
          <Flex gridColumnGap="2">
            {!hideInput && showMaxButton && selectedToken && label !== 'To' && (
              <Button onClick={onMax} colorScheme="primary" variant="ghost">
                {t('MAX')}
              </Button>
            )}
            <Button
              variant="solid"
              bg="inherit"
              mt="auto"
              // px={!selectedToken ? '5' : '8'}
              onClick={() => {
                if (!disableCurrencySelect) {
                  onPresentCurrencyModal()
                }
              }}
              fontWeight="normal"
              title="Select Token"
              aria-label="Select Token"
              leftIcon={
                pair ? (
                  <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
                ) : selectedToken ? (
                  <CurrencyLogo currency={selectedToken} size={24} />
                ) : null
              }
              rightIcon={!disableCurrencySelect ? <ChevronDownIcon boxSize={8} /> : null}
            >
              {selectedToken ? selectedToken.symbol : t('Select a currency')}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CardToken
