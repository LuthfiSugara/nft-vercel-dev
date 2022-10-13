import { Box, Text, Center, Flex, ButtonGroup, VStack, Divider, Button, Heading } from '@chakra-ui/react'
import { Currency, currencyEquals, ETHER, WETH } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useState } from 'react'
import { CardToken } from '@app/components/Cards'
import { useCurrency } from '@app/hooks/Tokens'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from '@app/store/mint/hooks'
import { CURRENCY_FIELD, resetMintState } from '@app/store/mint/slice'
import { PairState } from '@app/hooks'
import { useIsTransactionUnsupported } from '@app/hooks/Trades'
import OpenSettingsButton from '@app/components/Buttons/OpenSettingsButton'
import OpenHistoryButton from '@app/components/Buttons/OpenHistoryButton'
import { ApprovalState, useApproveCallback } from '@app/hooks/useApproveCallback'
import BackButton from '@app/components/Buttons/BackButton'
import { ROUTER_ADDRESS } from '@app/config/constants'
import ConnectWalletButton from '@app/components/Buttons/ConnectWalletButton'
import useTransactionDeadline from '@app/hooks/useTransactionDeadline'
import { useGasPrice, useIsExpertMode, useUserSlippageTolerance } from '@app/store/user/hooks'
import { calculateGasMargin, calculateSlippageAmount, getRouterContract } from '@app/utils'
import { wrappedCurrency } from '@app/utils/wrappedCurrency'
import { BigNumber } from '@ethersproject/bignumber'
import { useTransactionAdder } from '@app/store/transactions/hooks'
import { parseCurrencyId } from '@app/utils/currencyId'
import { useAppDispatch } from '@app/store/typed'
import maxAmountSpend from '@app/utils/maxAmountSpend'
import { useModal } from '@app/context/Modal/useModal'
import DoubleCurrencyLogo from '@app/components/Currency/DoubleCurrencyLogo'
import ConfirmAddLiquidityModalBottom from './components/ConfirmAddLiquidityModalBottom'
import TransactionConfirmationModal, {
  ConfirmationModalContent,
} from '@app/components/Modals/TransactionConfirmationModal'
import { useRouter } from 'next/router'
import { useTranslation } from '@app/context/Localization'
import QuestionHelper from '@app/components/Shared/QuestionHelper'
import { AddIcon } from '@chakra-ui/icons'
import dynamic from 'next/dynamic'
import ComponentLoader from '@app/components/Utils/ComponentLoader'

const PoolPriceBar = dynamic(() => import('@app/components/Utils/Pools/PoolPriceBar'), {
  ssr: false,
  loading: ComponentLoader,
})
const NoLiquidityBanner = dynamic(() => import('@app/components/Banners/NoLiquidityBanner'), {
  ssr: false,
  loading: ComponentLoader,
})
const MinimalPositionCard = dynamic(
  () => import('@app/components/Cards/CardPosition').then((mod) => mod.MinimalPositionCard),
  { ssr: false, loading: ComponentLoader }
)

const AddLiquidityContent = () => {
  const router = useRouter()
  const { currencyIdA, currencyIdB } = router.query
  const { account, library, chainId } = useWeb3React()
  const dispatch = useAppDispatch()
  const gasPrice = useGasPrice()
  const { t } = useTranslation()
  const [currencyA, currencyB] = [
    useCurrency(currencyIdA as string | undefined),
    useCurrency(currencyIdB as string | undefined),
  ]

  useEffect(() => {
    if (!currencyIdA && !currencyIdB) {
      dispatch(resetMintState())
    }
  }, [dispatch, currencyIdA, currencyIdB])

  const oneCurrencyIsWETH = Boolean(
    chainId &&
      ((currencyA && currencyEquals(currencyA, WETH[chainId])) ||
        (currencyB && currencyEquals(currencyB, WETH[chainId])))
  )

  const expertMode = useIsExpertMode()

  // Mint State
  const { independentField, typedValue, otherTypedValue } = useMintState()
  const {
    currencies,
    noLiquidity,
    pairState,
    error,
    pair,
    price,
    poolTokenPercentage,
    currencyBalances,
    dependentField,
    parsedAmounts,
    liquidityMinted,
  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)

  const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity)

  const isValid = !error

  // modal and loading
  const [attemptingTxn, setAttemptingTxn] = useState(false) // clicked confirm

  // txn values
  const deadline = useTransactionDeadline() // custom from users settings
  const [allowedSlippage] = useUserSlippageTolerance() // custom from users
  const [txHash, setTxHash] = useState('')

  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  // get the max amounts user can add
  const maxAmounts = [CURRENCY_FIELD.CURRENCY_A, CURRENCY_FIELD.CURRENCY_B].reduce((accumulator, field) => {
    return {
      ...accumulator,
      [field]: maxAmountSpend(currencyBalances[field]),
    }
  }, {})

  const atMaxAmounts = [CURRENCY_FIELD.CURRENCY_A, CURRENCY_FIELD.CURRENCY_B].reduce((accumulator, field) => {
    return {
      ...accumulator,
      [field]: maxAmounts[field]?.equalTo(parsedAmounts[field] ?? '0'),
    }
  }, {})

  // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback] = useApproveCallback(parsedAmounts[CURRENCY_FIELD.CURRENCY_A], ROUTER_ADDRESS)
  const [approvalB, approveBCallback] = useApproveCallback(parsedAmounts[CURRENCY_FIELD.CURRENCY_B], ROUTER_ADDRESS)

  const addTransaction = useTransactionAdder()

  async function onAdd() {
    if (!chainId || !library || !account) return
    const router = getRouterContract(chainId, library, account)

    const { [CURRENCY_FIELD.CURRENCY_A]: parsedAmountA, [CURRENCY_FIELD.CURRENCY_B]: parsedAmountB } = parsedAmounts
    if (!parsedAmountA || !parsedAmountB || !currencyA || !currencyB || !deadline) {
      return
    }

    const amountsMin = {
      [CURRENCY_FIELD.CURRENCY_A]: calculateSlippageAmount(parsedAmountA, noLiquidity ? 0 : allowedSlippage)[0],
      [CURRENCY_FIELD.CURRENCY_B]: calculateSlippageAmount(parsedAmountB, noLiquidity ? 0 : allowedSlippage)[0],
    }

    let estimate
    let method
    let args: Array<string | string[] | number>
    let value: BigNumber | null
    if (currencyA === ETHER || currencyB === ETHER) {
      const tokenBIsETH = currencyB === ETHER
      estimate = router.estimateGas.addLiquidityETH
      method = router.addLiquidityETH
      args = [
        wrappedCurrency(tokenBIsETH ? currencyA : currencyB, chainId)?.address ?? '', // token
        (tokenBIsETH ? parsedAmountA : parsedAmountB).raw.toString(), // token desired
        amountsMin[tokenBIsETH ? CURRENCY_FIELD.CURRENCY_A : CURRENCY_FIELD.CURRENCY_B].toString(), // token min
        amountsMin[tokenBIsETH ? CURRENCY_FIELD.CURRENCY_B : CURRENCY_FIELD.CURRENCY_A].toString(), // eth min
        account,
        deadline.toHexString(),
      ]
      value = BigNumber.from((tokenBIsETH ? parsedAmountB : parsedAmountA).raw.toString())
    } else {
      estimate = router.estimateGas.addLiquidity
      method = router.addLiquidity
      args = [
        wrappedCurrency(currencyA, chainId)?.address ?? '',
        wrappedCurrency(currencyB, chainId)?.address ?? '',
        parsedAmountA.raw.toString(),
        parsedAmountB.raw.toString(),
        amountsMin[CURRENCY_FIELD.CURRENCY_A].toString(),
        amountsMin[CURRENCY_FIELD.CURRENCY_B].toString(),
        account,
        deadline.toHexString(),
      ]
      value = null
    }

    setAttemptingTxn(true)
    await estimate(...args, value ? { value } : {})
      .then((estimatedGasLimit) =>
        method(...args, {
          ...(value ? { value } : {}),
          gasLimit: calculateGasMargin(estimatedGasLimit),
          gasPrice,
        }).then((response) => {
          setAttemptingTxn(false)

          addTransaction(response, {
            summary: `Add ${parsedAmounts[CURRENCY_FIELD.CURRENCY_A]?.toSignificant(3)} ${
              currencies[CURRENCY_FIELD.CURRENCY_A]?.symbol
            } and ${parsedAmounts[CURRENCY_FIELD.CURRENCY_B]?.toSignificant(3)} ${
              currencies[CURRENCY_FIELD.CURRENCY_B]?.symbol
            }`,
          })

          setTxHash(response.hash)
        })
      )
      .catch((err) => {
        setAttemptingTxn(false)
        // we only care if the error is something _other_ than the user rejected the tx
        if (err?.code !== 4001) {
          console.error(err)
        }
      })
  }

  const pendingText = t('Supplying %amountA% %symbolA% and %amountB% %symbolB%', {
    amountA: parsedAmounts[CURRENCY_FIELD.CURRENCY_A]?.toSignificant(6) ?? '',
    symbolA: currencies[CURRENCY_FIELD.CURRENCY_A]?.symbol ?? '',
    amountB: parsedAmounts[CURRENCY_FIELD.CURRENCY_B]?.toSignificant(6) ?? '',
    symbolB: currencies[CURRENCY_FIELD.CURRENCY_B]?.symbol ?? '',
  })

  const modalHeader = () => {
    return noLiquidity ? (
      <Flex alignItems="center">
        <Heading marginRight="10px">
          {`${currencies[CURRENCY_FIELD.CURRENCY_A]?.symbol}/${currencies[CURRENCY_FIELD.CURRENCY_B]?.symbol}`}
        </Heading>
        <DoubleCurrencyLogo
          currency0={currencies[CURRENCY_FIELD.CURRENCY_A]}
          currency1={currencies[CURRENCY_FIELD.CURRENCY_B]}
          size={30}
        />
      </Flex>
    ) : (
      <VStack align="stretch" spacing="4">
        <Flex alignItems="center">
          <Heading fontSize="48px" fontWeight="normal" marginRight="10px">
            {liquidityMinted?.toSignificant(6)}
          </Heading>
          <DoubleCurrencyLogo
            currency0={currencies[CURRENCY_FIELD.CURRENCY_A]}
            currency1={currencies[CURRENCY_FIELD.CURRENCY_B]}
            size={30}
          />
        </Flex>
        <Flex>
          <Text fontSize="24px">
            {`${currencies[CURRENCY_FIELD.CURRENCY_A]?.symbol}/${
              currencies[CURRENCY_FIELD.CURRENCY_B]?.symbol
            } Pool Tokens`}
          </Text>
        </Flex>
        <Text textAlign="left" fontSize="sm" color="legion.gray.200">
          {t('Output is estimated. If the price changes by more than %slippage%% your transaction will revert.', {
            slippage: allowedSlippage / 100,
          })}
        </Text>
      </VStack>
    )
  }

  const modalBottom = () => {
    return (
      <ConfirmAddLiquidityModalBottom
        price={price}
        currencies={currencies}
        parsedAmounts={parsedAmounts}
        noLiquidity={noLiquidity}
        onAdd={onAdd}
        poolTokenPercentage={poolTokenPercentage}
      />
    )
  }

  const handleCurrencyASelect = useCallback(
    (currency_: Currency) => {
      const newCurrencyIdA = parseCurrencyId(currency_)
      if (newCurrencyIdA === currencyIdB) {
        router.replace(`/add?currencyIdA=${currencyIdB}&currencyIdB=${currencyIdA}`, undefined, {
          shallow: true,
        })
      } else if (currencyIdB) {
        router.replace(`/add?&currencyIdA=${newCurrencyIdA}&currencyIdB=${currencyIdB}`, undefined, {
          shallow: true,
        })
      } else {
        router.replace(`/add?currencyIdA=${newCurrencyIdA}`, undefined, { shallow: true })
      }
    },
    [router, currencyIdA, currencyIdB]
  )

  const handleCurrencyBSelect = useCallback(
    (currency_: Currency) => {
      const newCurrencyIdB = parseCurrencyId(currency_)
      if (newCurrencyIdB === currencyIdA) {
        if (currencyIdB) {
          router.replace(`/add?currencyIdA=${currencyIdB}&currencyIdB=${newCurrencyIdB}`, undefined, {
            shallow: true,
          })
          return
        }
        router.replace(`/add?currencyIdB=${newCurrencyIdB}`, undefined, { shallow: true })
      } else {
        router.replace(`/add?currencyIdA=${currencyIdA || 'BNB'}&currencyIdB=${newCurrencyIdB}`, undefined, {
          shallow: true,
        })
      }
    },
    [router, currencyIdA, currencyIdB]
  )
  const handleDismissConfirmation = useCallback(() => {
    if (txHash) {
      onFieldAInput('')
    }
    setTxHash('')
  }, [txHash, onFieldAInput])

  const addIsUnSupported = useIsTransactionUnsupported(currencies?.CURRENCY_A, currencies?.CURRENCY_B)

  const [onPresentAddLiquidityModal] = useModal(
    <TransactionConfirmationModal
      title={noLiquidity ? t('You are creating a pool') : t('You will receive')}
      customOnDismiss={handleDismissConfirmation}
      attemptingTxn={attemptingTxn}
      hash={txHash}
      content={() => <ConfirmationModalContent topContent={modalHeader} bottomContent={modalBottom} />}
      pendingText={pendingText}
      currencyToAdd={pair?.liquidityToken}
    />,
    true,
    true,
    'addLiquidityModal'
  )
  return (
    <VStack flex="1 0 100%" spacing="4">
      <VStack p="4" backgroundColor="legion.dark" rounded="3xl" spacing={4} align="stretch">
        <Flex align="center" position="relative">
          <BackButton handleBack={() => router.push('/liquidity')} />
          <Box ml="4" lineHeight="base">
            <Text fontSize={['lg', 'xl']} fontWeight="bold" letterSpacing="wide">
              {t('Add Liquidity')}
            </Text>
            <Flex align="center" gridColumnGap="1">
              <QuestionHelper
                label={t(
                  'Liquidity providers earn a 0.17% trading fee on all trades made for that token pair, proportional to their share of the liquidity pool.'
                )}
                placement="top-start"
              />
              <Text color="legion.secondary" fontSize={'sm'}>
                {t('Add liquidity to receive LP tokens')}
              </Text>
            </Flex>
          </Box>
          <ButtonGroup variant="ghost" ml="auto">
            <OpenSettingsButton />
            <OpenHistoryButton />
          </ButtonGroup>
        </Flex>
        <Divider />
        {noLiquidity && <NoLiquidityBanner />}
        <CardToken
          label={t('Input')}
          id={'Token-input-A'}
          setSelected={handleCurrencyASelect}
          showMaxButton={!atMaxAmounts[CURRENCY_FIELD.CURRENCY_A]}
          onMax={() => {
            onFieldAInput(maxAmounts[CURRENCY_FIELD.CURRENCY_A]?.toExact() ?? '')
          }}
          selectedToken={currencies[CURRENCY_FIELD.CURRENCY_A]}
          value={formattedAmounts[CURRENCY_FIELD.CURRENCY_A]}
          onValueChange={onFieldAInput}
          opponentToken={currencies[CURRENCY_FIELD.CURRENCY_B]}
        />
        <Center>
          <AddIcon my="2" />
        </Center>
        <CardToken
          label={t('Input')}
          id={'Token-input-B'}
          setSelected={handleCurrencyBSelect}
          showMaxButton={!atMaxAmounts[CURRENCY_FIELD.CURRENCY_B]}
          onMax={() => {
            onFieldBInput(maxAmounts[CURRENCY_FIELD.CURRENCY_B]?.toExact() ?? '')
          }}
          selectedToken={currencies[CURRENCY_FIELD.CURRENCY_B]}
          value={formattedAmounts[CURRENCY_FIELD.CURRENCY_B]}
          onValueChange={onFieldBInput}
          opponentToken={currencies[CURRENCY_FIELD.CURRENCY_A]}
        />
        {currencies[CURRENCY_FIELD.CURRENCY_A] &&
          currencies[CURRENCY_FIELD.CURRENCY_B] &&
          pairState !== PairState.INVALID && (
            <Box bg="legion.light" rounded="2xl" shadow="inner" borderWidth="1px" borderColor="brand.bg.5">
              <Text fontSize="sm" letterSpacing="wider" fontWeight="bold" p="3">
                {noLiquidity ? t('Initial prices and pool share') : t('Prices and pool share')}
              </Text>
              <PoolPriceBar
                noLiquidity={noLiquidity}
                currencyA={currencies[CURRENCY_FIELD.CURRENCY_A]}
                currencyB={currencies[CURRENCY_FIELD.CURRENCY_B]}
                poolTokenPercentage={poolTokenPercentage}
                price={price}
              />
            </Box>
          )}
        {addIsUnSupported ? (
          <Button colorSchem="primary" color="white" w="full" py="5" mt="auto" disabled isDisabled rounded="xl">
            {t('Unsupported Asset')}
          </Button>
        ) : !account ? (
          <ConnectWalletButton py="5" mt="auto" rounded="xl" />
        ) : (
          <VStack gap="md">
            {(approvalA === ApprovalState.NOT_APPROVED ||
              approvalA === ApprovalState.PENDING ||
              approvalB === ApprovalState.NOT_APPROVED ||
              approvalB === ApprovalState.PENDING) &&
              isValid && (
                <ButtonGroup w="full">
                  {approvalA !== ApprovalState.APPROVED && (
                    <Button
                      w={approvalB === ApprovalState.APPROVED ? 'full' : 'auto'}
                      py="5"
                      rounded="xl"
                      color="white"
                      colorScheme="primary"
                      mt="auto"
                      onClick={approveACallback}
                      isDisabled={approvalA === ApprovalState.PENDING}
                    >
                      {approvalA === ApprovalState.PENDING ? (
                        <Text>{t('Enabling %asset%', { asset: currencies[CURRENCY_FIELD.CURRENCY_A]?.symbol })}</Text>
                      ) : (
                        t('Enable %asset%', { asset: currencies[CURRENCY_FIELD.CURRENCY_A]?.symbol })
                      )}
                    </Button>
                  )}
                  {approvalB !== ApprovalState.APPROVED && (
                    <Button
                      w={approvalA === ApprovalState.APPROVED ? 'full' : 'auto'}
                      py="5"
                      rounded="xl"
                      color="white"
                      colorScheme="primary"
                      mt="auto"
                      onClick={approveBCallback}
                      isDisabled={approvalB === ApprovalState.PENDING}
                    >
                      {approvalB === ApprovalState.PENDING ? (
                        <Text>{t('Enabling %asset%', { asset: currencies[CURRENCY_FIELD.CURRENCY_B]?.symbol })}</Text>
                      ) : (
                        t('Enable %asset%', { asset: currencies[CURRENCY_FIELD.CURRENCY_B]?.symbol })
                      )}
                    </Button>
                  )}
                </ButtonGroup>
              )}
            <Button
              w="full"
              py="5"
              rounded="xl"
              mt="auto"
              color="white"
              colorScheme={
                !isValid && !!parsedAmounts[CURRENCY_FIELD.CURRENCY_A] && !!parsedAmounts[CURRENCY_FIELD.CURRENCY_B]
                  ? 'gray'
                  : 'primary'
              }
              onClick={() => {
                if (expertMode) {
                  onAdd()
                } else {
                  onPresentAddLiquidityModal()
                }
              }}
              isDisabled={!isValid || approvalA !== ApprovalState.APPROVED || approvalB !== ApprovalState.APPROVED}
            >
              {error ?? t('Supply')}
            </Button>
          </VStack>
        )}
      </VStack>
      {!addIsUnSupported ? (
        pair && !noLiquidity && pairState !== PairState.INVALID ? (
          <Flex w="full">
            <MinimalPositionCard showUnwrapped={oneCurrencyIsWETH} pair={pair} />
          </Flex>
        ) : null
      ) : (
        <Heading>Unsupported</Heading>
        // <UnsupportedCurrencyFooter currencies={[currencies.CURRENCY_A, currencies.CURRENCY_B]} />
      )}
    </VStack>
  )
}

export default AddLiquidityContent
