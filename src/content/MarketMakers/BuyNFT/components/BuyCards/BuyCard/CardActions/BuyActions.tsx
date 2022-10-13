import React, { useState } from 'react'
import { Flex, Button, Skeleton } from '@chakra-ui/react'
import { useTranslation } from '@app/context'
import { useToastApp } from '@app/hooks'
import useBuyMM from '@app/content/MarketMakers/hooks/useBuyMM'
import { useFetchDisplayBuyQuery } from '@app/store/buyNft/buy-nft-slice'
import { useFetchOwnerNftQuery } from '@app/store/myNft/my-nft-slice'
// import { useModal } from '@app/context/Modal/useModal'
// import ModalBuyNFT from '@app/components/Modals/MarketMaker/ModalBuyNFT'

interface BuyActionsProps {
  sold: boolean
  mmid: number
  batchid: number
  account: string
  isLoading?: boolean
}

const BuyAction: React.FC<BuyActionsProps> = ({ sold, mmid, batchid, account, isLoading = false }) => {
  // const [onOpenBuyNFTModal] = useModal(<ModalBuyNFT />)
  const { toastSuccess, toastError } = useToastApp()
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const { onBuy } = useBuyMM()
  const { refetch: refetchDisplayBuy } = useFetchDisplayBuyQuery(batchid)
  const { refetch: refetchOwnerNft } = useFetchOwnerNftQuery({
    address: account,
    start: 1,
    row: 8,
  })

  const handleBuyClick = async () => {
    setPendingTx(true)
    try {
      await onBuy(mmid)
      refetchDisplayBuy()
      refetchOwnerNft()
      toastSuccess(
        `${t('Purchased')}!`,
        t('Your Market Maker %mmid% Purchasing has Been Succeeded!', {
          mmid: mmid,
        })
      )
      setPendingTx(false)
    } catch (e) {
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingTx(false)
    }
  }

  const renderBuyAction = () => {
    return (
      <Button
        colorScheme="primary"
        color={'legion.white'}
        fontSize={['3.5vw', '3.5vw', '1vw']}
        fontWeight={'bold'}
        maxH={['10vw', '10vw', '1vw']}
        w={'100%'}
        py={['5vw', '5vw', '1.5vw']}
        textTransform={'capitalize'}
        borderRadius={['1.5vw', '1.5vw', '0.5vw']}
        isLoading={pendingTx}
        isDisabled={pendingTx || sold}
        onClick={handleBuyClick}
        // onClick={onOpenBuyNFTModal}
      >
        {sold ? t('Sold') : t('Buy')}
      </Button>
    )
  }

  return (
    <Flex flexDirection="column">
      {isLoading ? <Skeleton width="100%" height="40px" rounded="2xl" mt="10px" /> : renderBuyAction()}
    </Flex>
  )
}

export default BuyAction
