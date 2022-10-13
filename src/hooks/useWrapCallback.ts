import { Currency, currencyEquals, ETHER, WETH } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { useMemo } from 'react'
import useActiveWeb3React from './useActiveWeb3React'
import { tryParseAmount } from '@app/store/swap/hooks'
import { useTransactionAdder } from '@app/store/transactions/hooks'
import { useCurrencyBalance } from '@app/store/wallet/hooks'
import { useWETHContract } from './useContract'
import { useCallWithGasPrice } from './useCallWithGasPrice'

export enum WrapType {
  NOT_APPLICABLE = 'NOT_APPLICABLE',
  WRAP = 'WRAP',
  UNWRAP = 'UNWRAP',
}

const NOT_APPLICABLE = { wrapType: WrapType.NOT_APPLICABLE }
/**
 * Given the selected input and output currency, return a wrap callback
 */
export default function useWrapCallback(
  inputCurrency: Currency | undefined,
  outputCurrency: Currency | undefined,
  typedValue: string | undefined
): {
  wrapType: string
  execute?: undefined | (() => Promise<void>)
  inputError?: string
} {
  const { chainId, account } = useActiveWeb3React()
  const { callWithGasPrice } = useCallWithGasPrice()
  const wethContract = useWETHContract()
  const balance = useCurrencyBalance(account ?? undefined, inputCurrency)
  // we can always parse the amount typed as the input currency, since wrapping is 1:1
  const inputAmount = useMemo(() => tryParseAmount(typedValue, inputCurrency), [inputCurrency, typedValue])
  const addTransaction = useTransactionAdder()

  return useMemo(() => {
    if (!wethContract || !chainId || !inputCurrency || !outputCurrency) return NOT_APPLICABLE

    const sufficientBalance = inputAmount && balance && !balance.lessThan(inputAmount)

    if (inputCurrency === ETHER && currencyEquals(WETH[chainId], outputCurrency)) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await callWithGasPrice(wethContract, 'deposit', undefined, {
                    value: `0x${inputAmount.raw.toString(16)}`,
                  })
                  addTransaction(txReceipt, {
                    summary: `Wrap ${inputAmount.toSignificant(6)} BNB to WBNB`,
                  })
                } catch (error) {
                  console.error('Could not deposit', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient BNB balance',
      }
    }
    if (currencyEquals(WETH[chainId], inputCurrency) && outputCurrency === ETHER) {
      return {
        wrapType: WrapType.UNWRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await callWithGasPrice(wethContract, 'withdraw', [
                    `0x${inputAmount.raw.toString(16)}`,
                  ])
                  addTransaction(txReceipt, {
                    summary: `Unwrap ${inputAmount.toSignificant(6)} WBNB to BNB`,
                  })
                } catch (error) {
                  console.error('Could not withdraw', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient WBNB balance',
      }
    }
    return NOT_APPLICABLE
  }, [wethContract, chainId, inputCurrency, outputCurrency, inputAmount, balance, addTransaction, callWithGasPrice])
}
