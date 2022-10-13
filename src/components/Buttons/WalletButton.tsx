import { Wallet } from '@app/config/wallets'
import { DismissHandler } from '@app/context'
import { useAuth } from '@app/hooks'
import { Button } from '@chakra-ui/react'

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
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      p="6"
      rounded="xl"
      variant="solid"
      onClick={() => {
        login(connectorId)
        onDismiss()
      }}
      rightIcon={<WalletIcon boxSize={7} />}
    >
      {label}
    </Button>
  )
}
