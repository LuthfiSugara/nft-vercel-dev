import BigNumber from 'bignumber.js'
import React from 'react'
import { BIG_ZERO } from '@app/utils/bigNumber'
import { Box } from '@chakra-ui/react'
import { DeserializedMarketMaker } from '@app/store/typed'
import ApprovalAction from './ApprovalAction'
import BuyActions from './BuyActions'

// import { useModal } from '@app/context/Modal/useModal'
// import ModalBuyNFT from '@app/components/Modals/MarketMaker/ModalBuyNFT'
// import { useTranslation } from '@app/context'

interface CardActionsProps {
  marketMaker: DeserializedMarketMaker
  userDataLoaded: boolean
  sold: boolean
  mmid: number
  batchid: number
  account: string
}

const CardActions: React.FC<CardActionsProps> = ({ marketMaker, userDataLoaded, sold, mmid, batchid, account }) => {
  const { userData } = marketMaker
  const allowance = userData?.allowance ? new BigNumber(userData.allowance) : BIG_ZERO
  const needsApproval = !allowance.gt(0)
  const isLoading = !userData || !userDataLoaded
  // const [onOpenBuyNFTModal] = useModal(<ModalBuyNFT />)
  // const { t } = useTranslation()

  return (
    <Box w={'100%'}>
      {needsApproval ? (
        <ApprovalAction marketMaker={marketMaker} isLoading={isLoading} />
      ) : (
        <BuyActions sold={sold} mmid={mmid} batchid={batchid} account={account} isLoading={isLoading} />
        // <Button
        //   colorScheme="primary"
        //   color={'legion.white'}
        //   fontSize={['7vw', '7vw', '1vw']}
        //   fontWeight={'bold'}
        //   maxH={'1vw'}
        //   w={'100%'}
        //   py={'1.5vw'}
        //   textTransform={'capitalize'}
        //   borderRadius={'0.5vw'}
        //   onClick={onOpenBuyNFTModal}
        // >
        //   {t('Buy')}
        // </Button>
      )}
    </Box>
  )
}

export default CardActions
