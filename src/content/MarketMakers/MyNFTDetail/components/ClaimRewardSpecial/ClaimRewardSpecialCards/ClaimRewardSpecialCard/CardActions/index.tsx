import React from 'react'
import { Box, Button } from '@chakra-ui/react'
import ClaimRewardSpecialActions from '@app/content/MarketMakers/MyNFTDetail/components/ClaimRewardSpecial/ClaimRewardSpecialCards/ClaimRewardSpecialCard/CardActions/ClaimRewardSpecialActions'
import { useTranslation } from '@app/context'

interface CardActionsProps {
  reward: number
  status: boolean
  idnft: number
  batchid: number
  month: string
  year: number
}

const CardActions: React.FC<CardActionsProps> = ({ reward, status, idnft, batchid, month, year }) => {
  const { t } = useTranslation()
  return (
    <Box w={'100%'}>
      {reward > 0 && status === false ? (
        <ClaimRewardSpecialActions idnft={idnft} batchid={batchid} month={month} year={year} />
      ) : (
        <Button
          textTransform={'capitalize'}
          borderRadius={['2vw', '2vw', '0.5vw']}
          colorScheme={'primary'}
          color={'legion.white'}
          fontSize={['3.5vw', '3.5vw', '1vw']}
          fontWeight={'bold'}
          w={'100%'}
          maxH={['3vw', '3vw', '1vw']}
          py={['5vw', '5vw', '1.5vw']}
          isDisabled={true}
        >
          {t('Claim')}
        </Button>
      )}
    </Box>
  )
}

export default CardActions
