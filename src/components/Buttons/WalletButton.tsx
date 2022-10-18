import { Wallet } from '@app/config/wallets'
import { DismissHandler } from '@app/context'
import { useAuth } from '@app/hooks'
import { Button, Text } from '@chakra-ui/react'

interface WalletButtonProps {
  wallet: Wallet
  onDismiss: DismissHandler
}

export default function WalletButton({
  wallet: { label, icon: WalletIcon, connectorId },
  onDismiss,
}: WalletButtonProps) {
  const { login } = useAuth()
  return (
    <Button
      display="block"
      w="full"
      h={['10w', '10vw', '8vw']}
      px={0}
      fontSize={['1vw', '1vw', '1vw']}
      rounded={['3xl', '3xl', '1vw']}
      variant="solid"
      bgColor={'gicv.white'}
      _hover={{ bgColor: 'gicv.secondary' }}
      onClick={() => {
        login(connectorId)
        onDismiss()
      }}
    >
      <WalletIcon boxSize={['10vw', '10vw', '3vw']} mb={['1vw', '1vw', '1vw']} />
      <Text>{label}</Text>
    </Button>
  )
}
