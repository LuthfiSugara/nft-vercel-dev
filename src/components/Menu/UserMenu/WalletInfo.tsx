import React from 'react'
import { useWeb3React } from '@web3-react/core'
import useAuth from '@app/hooks/useAuth'
import { InjectedModalProps, useTranslation } from '@app/context'
import { Button, Text } from '@chakra-ui/react'
import CopyAddress from './CopyAddress'

interface WalletInfoProps {
  onDismiss: InjectedModalProps['onDismiss']
}

const WalletInfo = ({ onDismiss }: WalletInfoProps) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { logout } = useAuth()
  const handleLogout = () => {
    onDismiss()
    logout()
  }
  return (
    <>
      <Text color="secondary" fontSize={['1vw', '1vw', '0.7vw']} fontWeight={'bold'} textTransform="uppercase">
        {t('Connected Address')}
      </Text>
      <CopyAddress
        account={account}
        border={['0.5vw solid', '0.5vw solid', '0.1vw solid']}
        borderRadius={['2vw', '2vw', '1vw']}
        p={['1vw', '1vw', '1vw']}
        mt={['1vw', '1vw', '0.6vw']}
      />
      <Button
        h={'fit-content'}
        width="100%"
        onClick={handleLogout}
        fontSize={['1vw', '1vw', '1vw']}
        p={['1vw', '1vw', '1vw']}
        mt={['1vw', '1vw', '1.5vw']}
        // border={['1vw solid', '1vw solid', '0.1vw solid']}
        borderRadius={['1vw', '1vw', '1vw']}
      >
        {t('Disconnect Wallet')}
      </Button>
    </>
  )
}

export default WalletInfo
