import React from 'react'
import { useTranslation } from '@app/context'
import { useERC20 } from '@app/hooks/useContract'
import { DeserializedMarketMaker } from '@app/store/typed'
import { useApproveMarketMaker } from '@app/content/MarketMakers/hooks/useApprove'
import { Skeleton, Button, Box } from '@chakra-ui/react'

interface ApprovalActionProps {
  marketMaker: DeserializedMarketMaker
  isLoading?: boolean
}

const ApprovalAction: React.FC<ApprovalActionProps> = ({ marketMaker, isLoading = false }) => {
  const { mmptId, purchasingToken } = marketMaker
  const { t } = useTranslation()
  const purchasingTokenContract = useERC20(purchasingToken.address || '')
  const { handleApprove, requestedApproval } = useApproveMarketMaker(purchasingTokenContract, mmptId)

  return (
    <Box width={'100%'} mt={[0, 0, 0, '0.3vw']}>
      {isLoading ? (
        <Skeleton width="100%" height={['48px', '48px', '4vw', '3.2vw']} />
      ) : (
        <Button
          // endIcon={requestedApproval ? <AutoRenewIcon spin color="currentColor" /> : null}
          width={'100%'}
          borderRadius={['1.5vw', '1.5vw', '0.5vw']}
          isLoading={requestedApproval}
          disabled={requestedApproval}
          onClick={handleApprove}
          fontSize={['3.5vw', '3.5vw', '1vw']}
          py={['5vw', '5vw', '1.5vw']}
          px={['4.5vw', '4.5vw', '1.8vw', '1.5vw']}
          colorScheme="primary"
          color={'legion.white'}
          fontWeight={'bold'}
          maxH={['10vw', '10vw', '1vw']}
          textTransform={'capitalize'}
        >
          {t('Enable')}
        </Button>
      )}
    </Box>
  )
}

export default ApprovalAction
