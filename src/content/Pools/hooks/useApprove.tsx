import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers, Contract } from 'ethers'
import { useAppDispatch } from '@app/store/typed'
import { updateUserAllowance } from '@app/store/pools'
import { useTranslation } from '@app/context'
import { useLegion, useSousChef, useLegionVaultContract } from '@app/hooks/useContract'
import useToastApp from '@app/hooks/useToastApp'
import useLastUpdated from '@app/hooks/useLastUpdated'
import { useCallWithGasPrice } from '@app/hooks/useCallWithGasPrice'
// import { ToastDescriptionWithTx } from '@app/components/Toast'

export const useApprovePool = (lpContract: Contract, sousId, earningTokenSymbol) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { toastSuccess, toastError } = useToastApp()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const sousChefContract = useSousChef(sousId)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const tx = await callWithGasPrice(lpContract, 'approve', [sousChefContract.address, ethers.constants.MaxUint256])
      const receipt = await tx.wait()

      dispatch(updateUserAllowance(sousId, account))
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
    account,
    dispatch,
    lpContract,
    sousChefContract,
    sousId,
    earningTokenSymbol,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
  ])

  return { handleApprove, requestedApproval }
}

// Approve LEGION auto pool
export const useVaultApprove = (setLastUpdated: () => void) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToastApp()
  const legionVaultContract = useLegionVaultContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const legionContract = useLegion()

  const handleApprove = async () => {
    const tx = await callWithGasPrice(legionContract, 'approve', [
      legionVaultContract.address,
      ethers.constants.MaxUint256,
    ])
    setRequestedApproval(true)
    const receipt = await tx.wait()
    if (receipt.status) {
      toastSuccess(
        t('Contract Enabled')
        // <ToastDescriptionWithTx txHash={receipt.transactionHash}>
        //   {t('You can now stake in the %symbol% vault!', { symbol: 'LEGION' })}
        // </ToastDescriptionWithTx>,
      )
      setLastUpdated()
      setRequestedApproval(false)
    } else {
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setRequestedApproval(false)
    }
  }

  return { handleApprove, requestedApproval }
}

export const useCheckVaultApprovalStatus = () => {
  const [isVaultApproved, setIsVaultApproved] = useState(false)
  const { account } = useWeb3React()
  const legionContract = useLegion()
  const legionVaultContract = useLegionVaultContract()
  const { lastUpdated, setLastUpdated } = useLastUpdated()
  useEffect(() => {
    const checkApprovalStatus = async () => {
      try {
        const currentAllowance = await legionContract.allowance(account, legionVaultContract.address)
        setIsVaultApproved(currentAllowance.gt(0))
      } catch (error) {
        setIsVaultApproved(false)
      }
    }

    checkApprovalStatus()
  }, [account, legionContract, legionVaultContract, lastUpdated])

  return { isVaultApproved, setLastUpdated }
}
