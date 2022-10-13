import { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { useMarketMaker } from '@app/hooks/useContract'
import { DEFAULT_GAS_LIMIT } from '@app/config'
import getGasPrice from '@app/utils/getGasPrice'
import { useRouter } from 'next/router'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const marketMakerTransfer = async (marketMakerContract, account, receiver, nftId) => {
  const gasPrice = getGasPrice()
  const tx = await marketMakerContract.transferFrom(
    account.toString(),
    receiver.toString(),
    new BigNumber(nftId).toString(),
    {
      ...options,
      gasPrice,
    }
  )
  const receipt = await tx.wait()

  return receipt
}

const useTransferNFT = (account: string) => {
  const marketMakerContract = useMarketMaker()
  const router = useRouter()

  const handleTransfer = useCallback(
    async (receiver: string, nftId: number) => {
      await marketMakerTransfer(marketMakerContract, account, receiver, nftId).then(() => {
        router.push('/my-nft')
      })
    },
    [account, marketMakerContract, router]
  )

  return { onTransfer: handleTransfer }
}

export default useTransferNFT
