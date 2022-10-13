import React from 'react'
import { Box, Button } from '@chakra-ui/react'
import { useTranslation } from '@app/context'
import ClaimRewardActions from './ClaimRewardActions'

interface CardActionsProps {
  account: string
  nftid: number[]
  month: number
  year: number
  detail: any[]
}

const CardActions: React.FC<CardActionsProps> = ({ account, nftid, month, year, detail }) => {
  const { t } = useTranslation()
  return (
    <Box w={'100%'}>
      {nftid.length > 0 ? (
        <ClaimRewardActions account={account} idnft={nftid} month={month} year={year} detail={detail} />
      ) : (
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
          isDisabled={true}
        >
          {t('No Claimable Reward')}
        </Button>
      )}
    </Box>
  )
}

export default CardActions
