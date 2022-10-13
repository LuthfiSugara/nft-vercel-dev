import { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT } from '@app/config'
import { useMarketMaker } from '@app/hooks/useContract'
import getGasPrice from '@app/utils/getGasPrice'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const claimRewardSpecial = async (marketMakerContract, idnft, month, year) => {
  const gasPrice = getGasPrice()
  const tx = await marketMakerContract.ClaimRewardSpecial(
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

const useClaimRewardSpecial = () => {
  const marketMakerContract = useMarketMaker()

  const handleClaimRewardSpecial = useCallback(
    async (idnft: number, month: string, year: number) => {
      await claimRewardSpecial(marketMakerContract, idnft, month, year)
    },
    [marketMakerContract]
  )

  return { onClaimRewardSpecial: handleClaimRewardSpecial }
}

export default useClaimRewardSpecial
