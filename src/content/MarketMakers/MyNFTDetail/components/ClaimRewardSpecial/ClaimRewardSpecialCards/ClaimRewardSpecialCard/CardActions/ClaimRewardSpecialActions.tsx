import React, { useState } from 'react'
import { Button } from '@chakra-ui/react'
import { useTranslation } from '@app/context'
import { useToastApp } from '@app/hooks'
import useClaimRewardSpecial from '@app/content/MarketMakers/hooks/useClaimRewardSpecial'
import { useFetchDisplayClaimRewardSpecialQuery } from '@app/store/myNftDetail/my-nft-detail-slice'
// import { useModal } from '@app/context/Modal/useModal'
// import ModalBuyNFT from '@app/components/Modals/MarketMaker/ModalBuyNFT'

interface ClaimRewardSpecialActionsProps {
  idnft: number
  batchid: number
  month: string
  year: number
}

const ClaimRewardSpecialActions: React.FC<ClaimRewardSpecialActionsProps> = ({ idnft, batchid, month, year }) => {
  const { toastSuccess, toastError } = useToastApp()
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const { onClaimRewardSpecial } = useClaimRewardSpecial()
  const { refetch } = useFetchDisplayClaimRewardSpecialQuery({ nftid: idnft, batchid: batchid, year: year })

  const handleClaimRewardSpecialClick = async () => {
    setPendingTx(true)
    try {
      await onClaimRewardSpecial(idnft, month, year)
      refetch()
      toastSuccess(`${t('Claimed')}!`, t('Your Special Reward Claiming has Been Succeeded!'))
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
      onClick={handleClaimRewardSpecialClick}
    >
      {t('Claim')}
    </Button>
  )
}

export default ClaimRewardSpecialActions
