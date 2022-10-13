import React, { useState } from 'react'
import { Button } from '@chakra-ui/react'
import { useTranslation } from '@app/context'
import { useToastApp } from '@app/hooks'
import useClaimReward from '@app/content/MarketMakers/hooks/useClaimReward'
import { useFetchDisplayClaimRewardQuery } from '@app/store/myNftDetail/my-nft-detail-slice'
// import { useModal } from '@app/context/Modal/useModal'
// import ModalBuyNFT from '@app/components/Modals/MarketMaker/ModalBuyNFT'

interface ClaimRewardActionsProps {
  idnft: number
  mmid: number
  month: number
  year: number
}

const ClaimRewardActions: React.FC<ClaimRewardActionsProps> = ({ idnft, mmid, month, year }) => {
  const { toastSuccess, toastError } = useToastApp()
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const { onClaimReward } = useClaimReward()
  const { refetch } = useFetchDisplayClaimRewardQuery({ nftid: idnft, mmid: mmid, year: year })

  const handleClaimRewardClick = async () => {
    setPendingTx(true)
    try {
      await onClaimReward(idnft, month, year)
      refetch()
      toastSuccess(`${t('Claimed')}!`, t('Your Reward Claiming has Been Succeeded!'))
      setPendingTx(false)
    } catch (e) {
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingTx(false)
    }
  }

  return (
    <Button
      textTransform={'capitalize'}
      borderRadius={['2vw', '2vw', '0.5vw']}
      colorScheme={'primary'}
      color={'legion.white'}
      fontSize={['3.5vw', '3.5vw', '1vw']}
      fontWeight={'bold'}
      w={'100%'}
      maxH={['3.5vw', '3.5vw', '1vw']}
      py={['5vw', '5vw', '1.5vw']}
      isLoading={pendingTx}
      isDisabled={pendingTx}
      onClick={handleClaimRewardClick}
    >
      {t('Claim')}
    </Button>
  )
}

export default ClaimRewardActions
