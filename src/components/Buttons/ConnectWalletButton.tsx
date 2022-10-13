import { useTranslation } from '@app/context/Localization'
import { useModal } from '@app/context/Modal/useModal'
import { Button, ButtonProps } from '@chakra-ui/react'
import { ModalWalletSelection } from '../Modals'

const ConnectWalletButton = (props: Omit<ButtonProps, 'children'>) => {
  const [onOpenWalletModal] = useModal(<ModalWalletSelection />)
  const { t } = useTranslation()
  return (
    <Button colorScheme="primary" onClick={onOpenWalletModal} color="white" {...props}>
      {t('Connect Wallet')}
    </Button>
  )
}

export default ConnectWalletButton
