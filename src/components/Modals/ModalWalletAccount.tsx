import { InjectedModalProps, useTranslation } from '@app/context'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { parseUnits } from 'ethers/lib/utils'
import WalletInfo from '../Menu/UserMenu/WalletInfo'

export const LOW_BNB_BALANCE = parseUnits('2', 'gwei')

const ModalWalletAccount = ({ onDismiss, isOpen }: InjectedModalProps) => {
  const { t } = useTranslation()
  return (
    <>
      <Modal isOpen={isOpen} onClose={onDismiss} isCentered>
        <ModalOverlay />
        <ModalContent
          minW={['80vw', '80vw', '30vw']}
          maxW={['80vw', '80vw', '30vw']}
          px={['1vw', '1vw', '1.5vw']}
          pt={['1vw', '1vw', '2vw']}
          pb={['1vw', '1vw', '1.2vw']}
        >
          <ModalCloseButton
            fontSize={['1vw', '1vw', '1vw']}
            color={'lightgray'}
            boxSize={['1vw', '1vw', '3vw']}
            top={['1vw', '1vw', '1.2vw']}
            right={['1vw', '1vw', '1.2vw']}
            border={'0.1vw solid lightgray'}
            borderRadius={'50%'}
          />
          <ModalHeader p={0}>{t('Your Wallet')}</ModalHeader>
          <ModalBody pt={['1vw', '1vw', '2vw']} px={0} pb={0}>
            <WalletInfo onDismiss={onDismiss} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalWalletAccount
