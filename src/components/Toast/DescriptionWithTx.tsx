import React from 'react'
import { getBscScanLink } from '@app/utils'
import { useActiveWeb3React } from '@app/hooks'
import { useTranslation } from '@app/context'
import truncateHash from '@app/utils/truncateHash'
import { Link, Text } from '@chakra-ui/react'


interface DescriptionWithTxProps {
  description?: string
  txHash?: string
}

const DescriptionWithTx: React.FC<DescriptionWithTxProps> = ({ txHash, children }) => {
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()

  return (
    <>
      {typeof children === 'string' ? <Text as="p">{children}</Text> : children}
      {txHash && (
        <Link external href={getBscScanLink(txHash, 'transaction', chainId)}>
          {t('View on BscScan')}: {truncateHash(txHash, 8, 0)}
        </Link>
      )}
    </>
  )
}

export default DescriptionWithTx
