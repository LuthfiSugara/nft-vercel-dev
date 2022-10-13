import { useCallback, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers, Contract } from 'ethers'
import { useAppDispatch } from '@app/store/typed'
import { updateUserAllowance } from '@app/store/marketMakers'
import { useTranslation } from '@app/context'
import { useMarketMaker } from '@app/hooks/useContract'
import useToastApp from '@app/hooks/useToastApp'
import { useCallWithGasPrice } from '@app/hooks/useCallWithGasPrice'
// import { ToastDescriptionWithTx } from '@app/components/Toast'

export const useApproveMarketMaker = (purchasingTokenContract: Contract, mmptId) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { toastSuccess, toastError } = useToastApp()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const marketMakerContract = useMarketMaker()

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const tx = await callWithGasPrice(purchasingTokenContract, 'approve', [
        marketMakerContract.address,
        ethers.constants.MaxUint256,
      ])
      const receipt = await tx.wait()

      dispatch(updateUserAllowance(mmptId, account))
      if (receipt.status) {
        toastSuccess(
          t('Contract Enabled')
          // <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          //   {t('You can now stake in the %symbol% pool!', { symbol: earningTokenSymbol })}
          // </ToastDescriptionWithTx>,
        )
        setRequestedApproval(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    }
  }, [
    callWithGasPrice,
    purchasingTokenContract,
    marketMakerContract.address,
    dispatch,
    mmptId,
    account,
    toastSuccess,
    t,
    toastError,
  ])

  return { handleApprove, requestedApproval }
}
