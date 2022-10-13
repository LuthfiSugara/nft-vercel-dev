import React from 'react'
import { useTranslation } from '@app/context'
import { useERC20 } from '@app/hooks/useContract'
import { DeserializedPool } from '@app/store/typed'
import { useApprovePool } from '@app/content/Pools/hooks/useApprove'
import { Skeleton, Button, Box } from '@chakra-ui/react'

interface ApprovalActionProps {
  pool: DeserializedPool
  isLoading?: boolean
}

const ApprovalAction: React.FC<ApprovalActionProps> = ({ pool, isLoading = false }) => {
  const { sousId, stakingToken, earningToken } = pool
  const { t } = useTranslation()
  const stakingTokenContract = useERC20(stakingToken.address || '')
  const { handleApprove, requestedApproval } = useApprovePool(stakingTokenContract, sousId, earningToken.symbol)

  return (
    <Box width={'100%'} mt={[0, 0, 0, '0.3vw']}>
      {isLoading ? (
        <Skeleton width="100%" height={['48px', '48px', '4vw', '3.2vw']} />
      ) : (
        <Button
          // endIcon={requestedApproval ? <AutoRenewIcon spin color="currentColor" /> : null}
          width={'100%'}
          colorScheme="primary"
          color="white"
          borderRadius={['2vw', '2vw', '0.5vw']}
          isLoading={requestedApproval}
          disabled={requestedApproval}
          onClick={handleApprove}
          fontSize={['4.5vw', '4.5vw', '1.4vw', '1vw']}
          py={['5vw', '5vw', '1.7vw', '1.4vw']}
          px={['4.5vw', '4.5vw', '1.8vw', '1.5vw']}
        >
          {t('Enable')}
        </Button>
      )}
    </Box>
  )
}

export default ApprovalAction
