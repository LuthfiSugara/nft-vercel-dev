import React from 'react'
import { useWeb3React } from '@web3-react/core'
import useAuth from '@app/hooks/useAuth'
import { InjectedModalProps, useTranslation } from '@app/context'
import { getBscScanLink } from '@app/utils'
import { getFullDisplayBalance, formatBigNumber } from '@app/utils/formatBalance'
import tokens from '@app/config/constants/tokens'
import { Button, Flex, Skeleton, Text } from '@chakra-ui/react'
import CopyAddress from './CopyAddress'
import useTokenBalance, { FetchStatus, useGetBnbBalance } from '@app/hooks/useTokenBalance'
import LinkExternal from '@app/components/Link/LinkExternal'
import WarningBanner from '@app/components/Banners/WarningBanner'

interface WalletInfoProps {
  hasLowBnbBalance: boolean
  onDismiss: InjectedModalProps['onDismiss']
}

const WalletInfo = ({ hasLowBnbBalance, onDismiss }: WalletInfoProps) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { balance, fetchStatus } = useGetBnbBalance()
  const { balance: legionBalance, fetchStatus: legionFetchStatus } = useTokenBalance(tokens.legion.address)
  const { logout } = useAuth()
  const handleLogout = () => {
    onDismiss()
    logout()
  }
  return (
    <>
      <Text color="secondary" fontSize="12px" textTransform="uppercase" fontWeight="bold" mb="8px">
        {t('Your Address')}
      </Text>
      <CopyAddress account={account} mb="24px" />
      {hasLowBnbBalance && (
        <WarningBanner
          title={t('BNB Balance Low')}
          description={t('You need BNB for transaction fees.')}
          rounded="2xl"
          mb="24px"
        />
      )}
      <Flex alignItems="center" justifyContent="space-between">
        <Text color="legion.secondary">{t('BNB Balance')}</Text>
        {fetchStatus !== FetchStatus.SUCCESS ? (
          <Skeleton height="22px" width="60px" />
        ) : (
          <Text>{formatBigNumber(balance, 6)}</Text>
        )}
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="24px">
        <Text color="legion.secondary">{t('LGN Balance')}</Text>
        {legionFetchStatus !== FetchStatus.SUCCESS ? (
          <Skeleton height="22px" width="60px" />
        ) : (
          <Text>{getFullDisplayBalance(legionBalance, 18, 3)}</Text>
        )}
      </Flex>
      <Flex alignItems="center" justifyContent="end" mb="24px">
        <LinkExternal href={getBscScanLink(account, 'address')}>{t('View on BscScan')}</LinkExternal>
      </Flex>
      <Button colorScheme="primary" variant="outline" width="100%" onClick={handleLogout} rounded="xl">
        {t('Disconnect Wallet')}
      </Button>
    </>
  )
}

export default WalletInfo
