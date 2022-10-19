import { useModal } from '@app/context/Modal/useModal'
import { Avatar, AvatarProps } from '@chakra-ui/react'
import { ModalWalletSelection } from '../Modals'

const ConnectWalletButton = (props: Omit<AvatarProps, 'children'>) => {
  const [onOpenWalletModal] = useModal(<ModalWalletSelection />)
  return (
    <Avatar onClick={onOpenWalletModal} w={'3vw'} h={'3vw'} _hover={{ cursor: 'pointer', opacity: '0.7' }} {...props} />
  )
}

export default ConnectWalletButton
