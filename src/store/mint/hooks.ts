import { Currency, CurrencyAmount, ETHER, JSBI, Percent, Price } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { useCallback, useMemo } from 'react'
import useActiveWeb3React from '@app/hooks/useActiveWeb3React'
import { PairState, usePair } from '@app/hooks/usePairs'
import useTotalSupply from '@app/hooks/useTotalSupply'
import { wrappedCurrency, wrappedCurrencyAmount } from '@app/utils/wrappedCurrency'
import { tryParseAmount } from '../swap/hooks'
import { useCurrencyBalances } from '../wallet/hooks'
import { CURRENCY_FIELD, typeInput } from './slice'
import { useAppDispatch, useAppSelector } from '@app/store/typed'
import { useTranslation } from '@app/context'

const ZERO = JSBI.BigInt(0)

export function useMintState() {
  return useAppSelector((s) => s.mint)
}

export function useMintActionHandlers(noLiquidity?: boolean) {
  const dispatch = useAppDispatch()

  const onFieldAInput = useCallback(
    (typedValue: string) => {
      dispatch(
        typeInput({
          field: CURRENCY_FIELD.CURRENCY_A,
          typedValue,
          noLiquidity: noLiquidity === true,
        })
      )
    },
    [dispatch, noLiquidity]
  )
  const onFieldBInput = useCallback(
    (typedValue: string) => {
      dispatch(
        typeInput({
          field: CURRENCY_FIELD.CURRENCY_B,
          typedValue,
          noLiquidity: noLiquidity === true,
        })
      )
    },
    [dispatch, noLiquidity]
  )

  return {
    onFieldAInput,
    onFieldBInput,
  } as const
}

export function useDerivedMintInfo(currencyA: Currency | undefined, currencyB: Currency | undefined) {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const { independentField, typedValue, otherTypedValue } = useMintState()

  const dependentField =
    independentField === CURRENCY_FIELD.CURRENCY_A ? CURRENCY_FIELD.CURRENCY_B : CURRENCY_FIELD.CURRENCY_A

  // tokens
  const currencies = useMemo(
    () => ({
      [CURRENCY_FIELD.CURRENCY_A]: currencyA ?? undefined,
      [CURRENCY_FIELD.CURRENCY_B]: currencyB ?? undefined,
    }),
    [currencyA, currencyB]
  )

  // pair
  const [pairState, pair] = usePair(currencies[CURRENCY_FIELD.CURRENCY_A], currencies[CURRENCY_FIELD.CURRENCY_B])

  const totalSupply = useTotalSupply(pair?.liquidityToken)

  const noLiquidity = pairState === PairState.NOT_EXISTS || Boolean(totalSupply && JSBI.equal(totalSupply.raw, ZERO))

  // balances
  const balances = useCurrencyBalances(account ?? undefined, [
    currencies[CURRENCY_FIELD.CURRENCY_A],
    currencies[CURRENCY_FIELD.CURRENCY_B],
  ])
  const currencyBalances = {
    [CURRENCY_FIELD.CURRENCY_A]: balances[0],
    [CURRENCY_FIELD.CURRENCY_B]: balances[1],
  }

  // amounts
  const independentAmount = tryParseAmount(typedValue, currencies[independentField])
  const dependentAmount = useMemo(() => {
    if (noLiquidity) {
      if (otherTypedValue && currencies[dependentField]) {
        return tryParseAmount(otherTypedValue, currencies[dependentField])
      }
      return undefined
    }
    if (independentAmount) {
      // we wrap the currencies just to get the price in terms of the other token
      const wrappedIndependentAmount = wrappedCurrencyAmount(independentAmount, chainId)
      const [tokenA, tokenB] = [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)]
      if (tokenA && tokenB && wrappedIndependentAmount && pair) {
        const dependentCurrency = dependentField === CURRENCY_FIELD.CURRENCY_B ? currencyB : currencyA
        const dependentTokenAmount =
          dependentField === CURRENCY_FIELD.CURRENCY_B
            ? pair.priceOf(tokenA).quote(wrappedIndependentAmount)
            : pair.priceOf(tokenB).quote(wrappedIndependentAmount)
        return dependentCurrency === ETHER ? CurrencyAmount.ether(dependentTokenAmount.raw) : dependentTokenAmount
      }
      return undefined
    }
    return undefined
  }, [noLiquidity, otherTypedValue, currencies, dependentField, independentAmount, currencyA, chainId, currencyB, pair])

  const parsedAmounts = useMemo(
    () => ({
      [CURRENCY_FIELD.CURRENCY_A]: independentField === CURRENCY_FIELD.CURRENCY_A ? independentAmount : dependentAmount,
      [CURRENCY_FIELD.CURRENCY_B]: independentField === CURRENCY_FIELD.CURRENCY_A ? dependentAmount : independentAmount,
    }),
    [dependentAmount, independentAmount, independentField]
  )

  const price = useMemo(() => {
    if (noLiquidity) {
      const { [CURRENCY_FIELD.CURRENCY_A]: currencyAAmount, [CURRENCY_FIELD.CURRENCY_B]: currencyBAmount } =
        parsedAmounts
      if (currencyAAmount && currencyBAmount) {
        return new Price(currencyAAmount.currency, currencyBAmount.currency, currencyAAmount.raw, currencyBAmount.raw)
      }
      return undefined
    }
    const wrappedCurrencyA = wrappedCurrency(currencyA, chainId)
    return pair && wrappedCurrencyA ? pair.priceOf(wrappedCurrencyA) : undefined
  }, [chainId, currencyA, noLiquidity, pair, parsedAmounts])

  // liquidity minted
  const liquidityMinted = useMemo(() => {
    const { [CURRENCY_FIELD.CURRENCY_A]: currencyAAmount, [CURRENCY_FIELD.CURRENCY_B]: currencyBAmount } = parsedAmounts
    const [tokenAmountA, tokenAmountB] = [
      wrappedCurrencyAmount(currencyAAmount, chainId),
      wrappedCurrencyAmount(currencyBAmount, chainId),
    ]
    if (pair && totalSupply && tokenAmountA && tokenAmountB) {
      return pair.getLiquidityMinted(totalSupply, tokenAmountA, tokenAmountB)
    }
    return undefined
  }, [parsedAmounts, chainId, pair, totalSupply])

  const poolTokenPercentage = useMemo(() => {
    if (liquidityMinted && totalSupply) {
      return new Percent(liquidityMinted.raw, totalSupply.add(liquidityMinted).raw)
    }
    return undefined
  }, [liquidityMinted, totalSupply])

  let error: string
  if (!account) {
    error = t('Connect Wallet')
  }

  if (pairState === PairState.INVALID) {
    error = error ?? t('Invalid pair')
  }

  if (!parsedAmounts[CURRENCY_FIELD.CURRENCY_A] || !parsedAmounts[CURRENCY_FIELD.CURRENCY_B]) {
    error = error ?? t('Enter an amount')
  }

  const { [CURRENCY_FIELD.CURRENCY_A]: currencyAAmount, [CURRENCY_FIELD.CURRENCY_B]: currencyBAmount } = parsedAmounts

  if (currencyAAmount && currencyBalances?.[CURRENCY_FIELD.CURRENCY_A]?.lessThan(currencyAAmount)) {
    error = t('Insufficient %symbol% balance', { symbol: currencies[CURRENCY_FIELD.CURRENCY_A]?.symbol })
  }

  if (currencyBAmount && currencyBalances?.[CURRENCY_FIELD.CURRENCY_B]?.lessThan(currencyBAmount)) {
    error = t('Insufficient %symbol% balance', { symbol: currencies[CURRENCY_FIELD.CURRENCY_B]?.symbol })
  }

  return {
    dependentField,
    currencies,
    pair,
    pairState,
    currencyBalances,
    parsedAmounts,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error,
  }
}
