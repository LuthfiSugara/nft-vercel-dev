import { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT } from '@app/config'
import { useMarketMaker } from '@app/hooks/useContract'
import getGasPrice from '@app/utils/getGasPrice'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const claimReward = async (marketMakerContract, idnft, month, year) => {
  const gasPrice = getGasPrice()
  const tx = await marketMakerContract.ClaimReward(
    new BigNumber(idnft).toString(),
    new BigNumber(month).toString(),
    new BigNumber(year).toString(),
    {
      ...options,
      gasPrice,
    }
  )
  const receipt = await tx.wait()
  return receipt.status
}

const useClaimReward = () => {
  const marketMakerContract = useMarketMaker()

  const handleClaimReward = useCallback(
    async (idnft: number, month: number, year: number) => {
      await claimReward(marketMakerContract, idnft, month, year)
    },
    [marketMakerContract]
  )

  return { onClaimReward: handleClaimReward }
}

export default useClaimReward
