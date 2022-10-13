import { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT } from '@app/config'
import { useMarketMaker } from '@app/hooks/useContract'
import getGasPrice from '@app/utils/getGasPrice'
import { FetchGenerateImage } from '../BuyNFT/api'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const marketMakerBuy = async (marketMakerContract, mmid) => {
  const gasPrice = getGasPrice()
  const tx = await marketMakerContract.BuyGICMarketmakerNFT(new BigNumber(mmid).toString(), {
    ...options,
    gasPrice,
  })
  const receipt = await tx.wait()
  const tokenId = receipt.events[2].args.tokenId._hex.slice(2)
  const nftId = parseInt(tokenId, 16)

  return nftId
}

const useBuyMM = () => {
  const marketMakerContract = useMarketMaker()

  const handleBuy = useCallback(
    async (mmid: number) => {
      await marketMakerBuy(marketMakerContract, mmid).then((res) => {
        FetchGenerateImage(res)
      })
    },
    [marketMakerContract]
  )

  return { onBuy: handleBuy }
}

export default useBuyMM
