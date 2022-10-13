import React, { useState } from 'react'
import { Button, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from '@app/context'
import { useToastApp } from '@app/hooks'
import useClaimRewardAll from '@app/content/MarketMakers/hooks/useClaimRewardAll'
import { useFetchDisplayClaimAllQuery } from '@app/store/myNft/my-nft-slice'
import Balance from '@app/components/Balance'
// import { useModal } from '@app/context/Modal/useModal'
// import ModalBuyNFT from '@app/components/Modals/MarketMaker/ModalBuyNFT'

interface ClaimRewardActionsProps {
  account: string
  idnft: number[]
  month: number
  year: number
  detail: any[]
}

const ClaimRewardActions: React.FC<ClaimRewardActionsProps> = ({ account, idnft, month, year, detail }) => {
  const { toastSuccess, toastError } = useToastApp()
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const { onClaimRewardAll } = useClaimRewardAll()
  const { refetch } = useFetchDisplayClaimAllQuery({ address: account, month: month, year: year })

  const handleClaimRewardAllClick = async () => {
    setPendingTx(true)
    try {
      await onClaimRewardAll(idnft, month, year)
      refetch()
      toastSuccess(`${t('Claimed')}!`, t('All of Your Reward Claiming has Been Succeeded!'))
      setPendingTx(false)
    } catch (e) {
      console.log(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingTx(false)
    }
  }

  const ClaimAllRewards = () => {
    let res = 0
    for (let i = 0; i < detail.length; i++) {
      res += detail[i].reward
    }
    return <Balance value={res} unit={' WGICT'} decimals={2} />
  }

  return (
    <Button
      textTransform={'capitalize'}
      borderRadius={['2vw', '2vw', '0.5vw']}
      colorScheme={'primary'}
      color={'legion.white'}
      fontSize={['3vw', '3vw', '1vw']}
      fontWeight={'bold'}
      w={'100%'}
      maxH={['10vw', '10vw', '3vw']}
      py={['6vw', '6vw', '2vw']}
      isLoading={pendingTx}
      isDisabled={pendingTx}
      onClick={handleClaimRewardAllClick}
    >
      <VStack spacing={['1vw', '1vw', '0.3vw']}>
        <Text>{t('Claim All')}</Text>
        <ClaimAllRewards />
      </VStack>
    </Button>
  )
}

export default ClaimRewardActions
