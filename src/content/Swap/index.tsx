import {
  Box,
  ButtonGroup,
  Flex,
  Text,
  Center,
  Button,
  Spinner,
  VStack,
  Progress,
  Divider,
  Collapse,
} from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CurrencyAmount, JSBI, Token, Trade } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { CardToken } from '@app/components/Cards'
import ArrowDownSwitchButton from './components/ArrowDownSwitchButton'
import {
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
} from '@app/store/swap/hooks'
import { SWAP_FIELD } from '@app/store/swap/actions'
import useWrapCallback, { WrapType } from '@app/hooks/useWrapCallback'
import maxAmountSpend from '@app/utils/maxAmountSpend'
import { ApprovalState, useApproveCallbackFromTrade } from '@app/hooks/useApproveCallback'
import { useExpertModeManager, useUserSingleHopOnly, useUserSlippageTolerance } from '@app/store/user/hooks'
import { useAllTokens, useCurrency } from '@app/hooks/Tokens'
import SwapWarningTokens from '@app/config/constants/swapWarningTokens'
import OpenHistoryButton from '@app/components/Buttons/OpenHistoryButton'
import OpenSettingsButton from '@app/components/Buttons/OpenSettingsButton'
import { useIsTransactionUnsupported } from '@app/hooks/Trades'
import ConnectWalletButton from '@app/components/Buttons/ConnectWalletButton'
import { computeTradePriceBreakdown, warningSeverity } from '@app/utils/prices'
import { useSwapCallback } from '@app/hooks/useSwapCallback'
import confirmPriceImpactWithoutFee from './components/confirmPriceImpactWithoutFees'
import { useActiveWeb3React } from '@app/hooks'
import { INITIAL_ALLOWED_SLIPPAGE } from '@app/config/constants'
import { useModal } from '@app/context/Modal/useModal'
import ConfirmSwapModal from './components/ConfirmSwapModal'
import { useTranslation } from '@app/context/Localization'
import NoSSR from '@app/components/Shared/NoSsr'
import dynamic from 'next/dynamic'
import ComponentLoader from '@app/components/Utils/ComponentLoader'

const AdvancedSwapDetails = dynamic(
  () => import('./components/AdvancedSwapDetails').then((mod) => mod.AdvancedSwapDetails),
  { ssr: false, loading: ComponentLoader }
)
const TradePrice = dynamic(() => import('./components/TradePrice'), { ssr: false, loading: ComponentLoader })

const ExchangeContent = () => {
  const loadedUrlParams = useDefaultsFromURLSearch()
  const { t } = useTranslation()
  //  token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ]

  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
    [loadedInputCurrency, loadedOutputCurrency]
  )

  //dismiss warning if all imported tokens are in active lists
  const defaultTokens = useAllTokens()
  const importTokensNotInDefault =
    urlLoadedTokens &&
    urlLoadedTokens.filter((token: Token) => {
      return !(token.address in defaultTokens)
    })

  const { account } = useActiveWeb3React()

  // for expert mode
  const [isExpertMode] = useExpertModeManager()

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance()

  // Swap State
  const { independentField, typedValue, recipient } = useSwapState()
  const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo()

  // get custom setting values for user
  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[SWAP_FIELD.INPUT], currencies[SWAP_FIELD.OUTPUT], typedValue)
  const showWrap = wrapType !== WrapType.NOT_APPLICABLE
  const trade = showWrap ? undefined : v2Trade

  const parsedAmounts = showWrap
    ? {
        [SWAP_FIELD.INPUT]: parsedAmount,
        [SWAP_FIELD.OUTPUT]: parsedAmount,
      }
    : {
        [SWAP_FIELD.INPUT]: independentField === SWAP_FIELD.INPUT ? parsedAmount : trade?.inputAmount,
        [SWAP_FIELD.OUTPUT]: independentField === SWAP_FIELD.OUTPUT ? parsedAmount : trade?.outputAmount,
      }

  const { onSwitchTokens, onCurrencySelection, onUserInput } = useSwapActionHandlers()
  const isValid = !swapInputError
  const dependentField: SWAP_FIELD = independentField === SWAP_FIELD.INPUT ? SWAP_FIELD.OUTPUT : SWAP_FIELD.INPUT

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(SWAP_FIELD.INPUT, value)
    },
    [onUserInput]
  )
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(SWAP_FIELD.OUTPUT, value)
    },
    [onUserInput]
  )

  // modal and loading
  const [{ tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    tradeToConfirm: Trade | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const route = trade?.route
  const userHasSpecifiedInputOutput = Boolean(
    currencies[SWAP_FIELD.INPUT] &&
      currencies[SWAP_FIELD.OUTPUT] &&
      parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0))
  )
  const noRoute = !route

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[SWAP_FIELD.INPUT])
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[SWAP_FIELD.INPUT]?.equalTo(maxAmountInput))

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(trade, allowedSlippage, recipient)

  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)

  const [singleHopOnly] = useUserSingleHopOnly()

  const handleSwap = useCallback(() => {
    if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee)) {
      return
    }
    if (!swapCallback) {
      return
    }
    setSwapState({ attemptingTxn: true, tradeToConfirm, swapErrorMessage: undefined, txHash: undefined })
    swapCallback()
      .then((hash) => {
        setSwapState({ attemptingTxn: false, tradeToConfirm, swapErrorMessage: undefined, txHash: hash })
      })
      .catch((error) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          swapErrorMessage: error.message,
          txHash: undefined,
        })
      })
  }, [priceImpactWithoutFee, swapCallback, tradeToConfirm])

  // errors
  const [showInverted, setShowInverted] = useState(false)

  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  const handleConfirmDismiss = useCallback(() => {
    setSwapState({ tradeToConfirm, attemptingTxn, swapErrorMessage, txHash })
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(SWAP_FIELD.INPUT, '')
    }
  }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash])

  const handleAcceptChanges = useCallback(() => {
    setSwapState({ tradeToConfirm: trade, swapErrorMessage, txHash, attemptingTxn })
  }, [attemptingTxn, swapErrorMessage, trade, txHash])

  // swap warning state
  const [swapWarningCurrency, setSwapWarningCurrency] = useState(null)
  // const [onPresentSwapWarningModal] = useModal(<SwapWarningModal swapCurrency={swapWarningCurrency} />)

  const shouldShowSwapWarning = (swapCurrency) => {
    const isWarningToken = Object.entries(SwapWarningTokens).find((warningTokenConfig) => {
      const warningTokenData = warningTokenConfig[1]
      return swapCurrency.address === warningTokenData.address
    })
    return Boolean(isWarningToken)
  }

  useEffect(() => {
    if (swapWarningCurrency) {
      // onPresentSwapWarningModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swapWarningCurrency])

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(SWAP_FIELD.INPUT, inputCurrency)
      const showSwapWarning = shouldShowSwapWarning(inputCurrency)
      if (showSwapWarning) {
        setSwapWarningCurrency(inputCurrency)
      } else {
        setSwapWarningCurrency(null)
      }
    },
    [onCurrencySelection]
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(SWAP_FIELD.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, onUserInput])

  const handleOutputSelect = useCallback(
    (outputCurrency) => {
      onCurrencySelection(SWAP_FIELD.OUTPUT, outputCurrency)
      const showSwapWarning = shouldShowSwapWarning(outputCurrency)
      if (showSwapWarning) {
        setSwapWarningCurrency(outputCurrency)
      } else {
        setSwapWarningCurrency(null)
      }
    },

    [onCurrencySelection]
  )

  const swapIsUnsupported = useIsTransactionUnsupported(currencies?.INPUT, currencies?.OUTPUT)

  // const [onPresentImportTokenWarningModal] = useModal(
  //   <ImportTokenWarningModal tokens={importTokensNotInDefault} onCancel={() => history.push('/swap/')} />,
  // )

  useEffect(() => {
    if (importTokensNotInDefault.length > 0) {
      // onPresentImportTokenWarningModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importTokensNotInDefault.length])

  const [onPresentConfirmModal] = useModal(
    <ConfirmSwapModal
      trade={trade}
      originalTrade={tradeToConfirm}
      onAcceptChanges={handleAcceptChanges}
      attemptingTxn={attemptingTxn}
      txHash={txHash}
      recipient={recipient}
      allowedSlippage={allowedSlippage}
      onConfirm={handleSwap}
      swapErrorMessage={swapErrorMessage}
      customOnDismiss={handleConfirmDismiss}
    />,
    true,
    true,
    'confirmSwapModal'
  )
  return (
    <Box pos={'relative'} width="430px">
      {/* <Box pos={'absolute'}> */}
        <VStack px="4" py="4" spacing={4} align="stretch" backgroundColor="legion.dark" rounded="3xl">
          <Flex align="center" justifyContent="space-between">
            <Box pl="1">
              <Text fontSize={['lg', 'xl']} fontWeight="bold" letterSpacing="wide">
                {t('Exchange')}
              </Text>
              <Text fontWeight="bold" color="legion.secondary" fontSize={['sm', 'md']}>
                {t('Trade tokens in an instant')}
              </Text>
            </Box>
            <ButtonGroup variant="ghost">
              <OpenSettingsButton />
              <OpenHistoryButton />
            </ButtonGroup>
          </Flex>
          <Divider />
          <CardToken
            label={independentField === SWAP_FIELD.OUTPUT && !showWrap && trade ? t('From (estimated)') : t('From')}
            id="Swap-token-input"
            value={formattedAmounts[SWAP_FIELD.INPUT]}
            selectedToken={currencies[SWAP_FIELD.INPUT]}
            opponentToken={currencies[SWAP_FIELD.OUTPUT]}
            setSelected={handleInputSelect}
            showMaxButton={!atMaxAmountInput}
            onValueChange={handleTypeInput}
            onMax={handleMaxInput}
          />
          <Center my="2">
            <ArrowDownSwitchButton onSwitch={onSwitchTokens} />
          </Center>
          <CardToken
            label={independentField === SWAP_FIELD.INPUT && !showWrap && trade ? t('To (estimated)') : t('To')}
            id="Swap-token-output"
            value={formattedAmounts[SWAP_FIELD.OUTPUT]}
            selectedToken={currencies[SWAP_FIELD.OUTPUT]}
            opponentToken={currencies[SWAP_FIELD.INPUT]}
            setSelected={handleOutputSelect}
            showMaxButton={false}
            onValueChange={handleTypeOutput}
          />
          {showWrap ? null : (
            <VStack px="2">
              <Collapse in={Boolean(trade)} animateOpacity style={{ width: '100%' }}>
                <Flex justify="space-between" align="center" w="full">
                  <Text fontSize="sm">{t('Price')}</Text>
                  <TradePrice
                    price={trade?.executionPrice}
                    showInverted={showInverted}
                    setShowInverted={setShowInverted}
                  />
                </Flex>
              </Collapse>
              <NoSSR>
                {allowedSlippage !== INITIAL_ALLOWED_SLIPPAGE && (
                  <Flex w={'full'} justifyContent={'right'} alignItems={'center'}>
                    <Text fontSize="xs" color="legion.secondary" mr={2}>
                      {t('Slippage Tolerance')}
                    </Text>
                    <Text color="legion.primary" fontWeight="bold">
                      {allowedSlippage / 100}%
                    </Text>
                  </Flex>
                )}
              </NoSSR>
            </VStack>
          )}
          {swapIsUnsupported ? (
            <Button width="100%" disabled mb="4px">
              {t('Unsupported Asset')}
            </Button>
          ) : !account ? (
            <ConnectWalletButton py="5" mt="auto" rounded="xl" />
          ) : showWrap ? (
            <Button width="100%" disabled={Boolean(wrapInputError)} isDisabled={Boolean(wrapInputError)} onClick={onWrap}>
              {wrapInputError ?? (wrapType === WrapType.WRAP ? 'Wrap' : wrapType === WrapType.UNWRAP ? 'Unwrap' : null)}
            </Button>
          ) : noRoute && userHasSpecifiedInputOutput ? (
            <Box sx={{ textAlign: 'center' }}>
              <Text color="textSubtle" mb="4px">
                {t('Insufficient liquidity for this trade.')}
              </Text>
              {singleHopOnly && (
                <Text color="textSubtle" mb="4px">
                  {t('Try enabling multi-hop trades.')}
                </Text>
              )}
            </Box>
          ) : showApproveFlow ? (
            <VStack>
              <Button
                colorScheme={approval === ApprovalState.APPROVED ? 'blue' : 'yellow'}
                onClick={approveCallback}
                disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                width="48%"
              >
                {approval === ApprovalState.PENDING ? (
                  <Flex gap="6px" justify="center">
                    {t('Enabling')} <Spinner stroke="white" />
                  </Flex>
                ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
                  t('Enabled')
                ) : (
                  t('Enable %asset%', { asset: currencies[SWAP_FIELD.INPUT]?.symbol ?? '' })
                )}
              </Button>
              <Button
                colorScheme={isValid && priceImpactSeverity > 2 && !swapCallbackError ? 'legion.red' : 'legion.main'}
                onClick={() => {
                  if (isExpertMode) {
                    handleSwap()
                  } else {
                    setSwapState({
                      tradeToConfirm: trade,
                      attemptingTxn: false,
                      swapErrorMessage: undefined,
                      txHash: undefined,
                    })
                    onPresentConfirmModal()
                  }
                }}
                width="48%"
                id="swap-button"
                disabled={!isValid || approval !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode)}
              >
                {priceImpactSeverity > 3 && !isExpertMode
                  ? t('Price Impact High')
                  : priceImpactSeverity > 2
                  ? t('Swap Anyway')
                  : t('Swap')}
              </Button>
            </VStack>
          ) : (
            <Button
              colorScheme={isValid && priceImpactSeverity > 2 && !swapCallbackError ? 'legion.red' : 'legion.main'}
              color="white"
              rounded="2xl"
              onClick={() => {
                if (isExpertMode) {
                  handleSwap()
                } else {
                  setSwapState({
                    tradeToConfirm: trade,
                    attemptingTxn: false,
                    swapErrorMessage: undefined,
                    txHash: undefined,
                  })
                  onPresentConfirmModal()
                }
              }}
              id="swap-button"
              width="100%"
              disabled={!isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError}
              isDisabled={!isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError}
            >
              {swapInputError ||
                (priceImpactSeverity > 3 && !isExpertMode
                  ? t('Price Impact Too High')
                  : priceImpactSeverity > 2
                  ? t('Swap Anyway')
                  : t('Swap'))}
            </Button>
          )}
          {showApproveFlow && (
            <Box sx={{ marginTop: '1rem' }}>
              <Progress value={approval === ApprovalState.APPROVED ? 100 : 50} />
            </Box>
          )}
        </VStack>
        <Collapse in={!swapIsUnsupported} animateOpacity>
          <AdvancedSwapDetails trade={trade} />
        </Collapse>
      {/* </Box> */}
    </Box>
  )
}

export default ExchangeContent
