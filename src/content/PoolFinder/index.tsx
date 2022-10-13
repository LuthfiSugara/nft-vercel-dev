import { Box, Button, Text, VStack, Flex, ButtonGroup, Divider, BoxProps } from '@chakra-ui/react'
import { useTranslation } from '@app/context/Localization'
import BackButton from '@app/components/Buttons/BackButton'
import { useRouter } from 'next/router'
import OpenSettingsButton from '@app/components/Buttons/OpenSettingsButton'
import OpenHistoryButton from '@app/components/Buttons/OpenHistoryButton'
import Row from '@app/components/Layout/Row'
import { CurrencyLogo } from '@app/components/Currency'
import { PairState, useActiveWeb3React, usePair } from '@app/hooks'
import { useCallback, useEffect, useState } from 'react'
import { Currency, ETHER, JSBI, TokenAmount } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ModalTokenSelection } from '@app/components/Modals'
import { useModal } from '@app/context/Modal/useModal'
import { AutoColumn, ColumnCenter } from '@app/components/Layout/Column'
import { usePairAdder } from '@app/store/user/hooks'
import { useTokenBalance } from '@app/store/wallet/hooks'
import { MinimalPositionCard } from '@app/components/Cards/CardPosition'
import { parseCurrencyId } from '@app/utils/currencyId'
import Link from 'next/link'

enum Fields {
  TOKEN0 = 0,
  TOKEN1 = 1,
}

const LightCard = (props: BoxProps) => (
  <Box bg="legion.light" w="full" rounded="3xl" borderWidth="1px" borderColor="legion.dark" {...props} />
)

const PoolFinder = () => {
  const router = useRouter()
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()

  const [activeField, setActiveField] = useState<number>(Fields.TOKEN1)
  const [currency0, setCurrency0] = useState<Currency | null>(ETHER)
  const [currency1, setCurrency1] = useState<Currency | null>(null)
  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      if (activeField === Fields.TOKEN0) {
        setCurrency0(currency)
      } else {
        setCurrency1(currency)
      }
    },
    [activeField]
  )
  const [pairState, pair] = usePair(currency0 ?? undefined, currency1 ?? undefined)
  const addPair = usePairAdder()
  useEffect(() => {
    if (pair) {
      addPair(pair)
    }
  }, [pair, addPair])

  const validPairNoLiquidity: boolean =
    pairState === PairState.NOT_EXISTS ||
    Boolean(
      pairState === PairState.EXISTS &&
        pair &&
        JSBI.equal(pair.reserve0.raw, JSBI.BigInt(0)) &&
        JSBI.equal(pair.reserve1.raw, JSBI.BigInt(0))
    )

  const position: TokenAmount | undefined = useTokenBalance(account ?? undefined, pair?.liquidityToken)
  const hasPosition = Boolean(position && JSBI.greaterThan(position.raw, JSBI.BigInt(0)))
  const [onPresentCurrencyModal] = useModal(
    <ModalTokenSelection
      setSelected={handleCurrencySelect}
      showCommonBases
      selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
    />,
    true,
    true,
    'selectCurrencyModal'
  )
  const prerequisiteMessage = (
    <LightCard padding="45px 10px">
      <Text textAlign="center">
        {!account ? t('Connect to a wallet to find pools') : t('Select a token to find your liquidity.')}
      </Text>
    </LightCard>
  )
  return (
    <VStack align="flex-start" spacing="6" flex="1 0 100%" backgroundColor="legion.dark" p="4" rounded="3xl">
      <Flex align="center" justifyContent="space-between" w="full">
        <Flex align="center">
          <BackButton handleBack={() => router.push('/liquidity')} />
          <Box ml="4" lineHeight="base">
            <Text fontSize={['lg', 'xl']} fontWeight="bold" letterSpacing="wide">
              {t('Import Pool')}
            </Text>
            <Flex align="center" gridColumnGap="1">
              <Text color="legion.secondary" fontSize={'sm'}>
                {t('Import an existing pool')}
              </Text>
            </Flex>
          </Box>
        </Flex>
        <ButtonGroup variant="ghost" ml="auto">
          <OpenSettingsButton />
          <OpenHistoryButton />
        </ButtonGroup>
      </Flex>
      <Divider />
      <VStack mt={10} width="full" spacing={[4, 6]}>
        <Button
          rightIcon={<ChevronDownIcon />}
          width="full"
          onClick={() => {
            onPresentCurrencyModal()
            setActiveField(Fields.TOKEN0)
          }}
          py={['6', '7']}
          rounded="2xl"
        >
          <Row>
            {currency0 ? (
              <>
                <CurrencyLogo currency={currency0} />
                <Text ml="8px">{currency0.symbol}</Text>
              </>
            ) : (
              <Text ml="8px">{t('Select a Token')}</Text>
            )}
          </Row>
        </Button>
        <AddIcon />
        <Button
          rightIcon={<ChevronDownIcon />}
          width="full"
          onClick={() => {
            onPresentCurrencyModal()
            setActiveField(Fields.TOKEN1)
          }}
          py={['6', '7']}
          rounded="2xl"
          textAlign="left"
        >
          <Row>
            {currency1 ? (
              <>
                <CurrencyLogo currency={currency1} />
                <Text ml="8px">{currency1.symbol}</Text>
              </>
            ) : (
              <Text ml="8px">{t('Select a Token')}</Text>
            )}
          </Row>
        </Button>

        {hasPosition && (
          <ColumnCenter
            style={{ justifyItems: 'center', backgroundColor: '', padding: '12px 0px', borderRadius: '12px' }}
          >
            <Text textAlign="center">{t('Pool Found!')}</Text>
            <Button
              onClick={() =>
                router.push(`/remove/${parseCurrencyId(currency0)}/${parseCurrencyId(currency1)}`, undefined)
              }
              colorScheme="primary"
              rounded="3xl"
              size="sm"
              variant="outline"
              mt={2}
            >
              {t('Manage Pool')}
            </Button>
          </ColumnCenter>
        )}
        {currency0 && currency1 ? (
          pairState === PairState.EXISTS ? (
            hasPosition && pair ? (
              <MinimalPositionCard pair={pair} />
            ) : (
              <LightCard padding="45px 10px">
                <AutoColumn gap="sm" justify="center">
                  <Text textAlign="center">{t('You don’t have liquidity in this pool yet.')}</Text>
                  <Link
                    href={`/add?currencyIdA=${parseCurrencyId(currency0)}&currencyIdB=${parseCurrencyId(currency1)}`}
                  >
                    <Button colorScheme="primary" rounded="3xl" size="sm" variant="outline">
                      {t('Add Liquidity')}
                    </Button>
                  </Link>
                </AutoColumn>
              </LightCard>
            )
          ) : validPairNoLiquidity ? (
            <LightCard padding="45px 10px">
              <AutoColumn gap="sm" justify="center">
                <Text textAlign="center">{t('No pool found.')}</Text>
                <Link href={`/add?currencyIdA=${parseCurrencyId(currency0)}&currencyIdB=${parseCurrencyId(currency1)}`}>
                  <Button colorScheme="primary" rounded="3xl" size="sm" variant="outline">
                    {t('Create Pool')}
                  </Button>
                </Link>
              </AutoColumn>
            </LightCard>
          ) : pairState === PairState.INVALID ? (
            <LightCard padding="45px 10px">
              <AutoColumn gap="sm" justify="center">
                <Text textAlign="center" fontWeight={500}>
                  {t('Invalid pair.')}
                </Text>
              </AutoColumn>
            </LightCard>
          ) : pairState === PairState.LOADING ? (
            <LightCard padding="45px 10px">
              <AutoColumn gap="sm" justify="center">
                <Text textAlign="center">{t('Loading')}</Text>
              </AutoColumn>
            </LightCard>
          ) : null
        ) : (
          prerequisiteMessage
        )}
      </VStack>
    </VStack>
  )
}

export default PoolFinder
