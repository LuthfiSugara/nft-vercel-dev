import React from 'react'
import { Box, Button } from '@chakra-ui/react'
import ClaimRewardActions from '@app/content/MarketMakers/MyNFTDetail/components/ClaimReward/ClaimRewardCards/ClaimRewardCard/CardActions/ClaimRewardActions'
import { useTranslation } from '@app/context'

interface CardActionsProps {
  reward: number
  status: boolean
  idnft: number
  mmid: number
  month: number
  year: number
}

const CardActions: React.FC<CardActionsProps> = ({ reward, status, idnft, mmid, month, year }) => {
  const { t } = useTranslation()
  return (
    <Box w={'100%'}>
      {reward > 0 && status === false ? (
        <ClaimRewardActions idnft={idnft} mmid={mmid} month={month} year={year} />
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
