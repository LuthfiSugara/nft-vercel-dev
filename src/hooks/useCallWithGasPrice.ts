import { useCallback } from 'react'
import { useGasPrice } from '@app/store/user/hooks'
import { get } from 'lodash'

/**
 * Perform a contract call with a gas price returned from useGasPrice
 * @see https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt
 */
export function useCallWithGasPrice() {
  const gasPrice = useGasPrice()

  const callWithGasPrice = useCallback(
    async (contract, methodName, methodArgs = [], overrides = null) => {
      const contractMethod = get(contract, methodName)
      const hasManualGasPriceOverride = overrides?.gasPrice

      const tx = await contractMethod(
        ...methodArgs,
        hasManualGasPriceOverride ? { ...overrides } : { ...overrides, gasPrice }
      )

      return tx
    },
    [gasPrice]
  )

  return { callWithGasPrice }
}
