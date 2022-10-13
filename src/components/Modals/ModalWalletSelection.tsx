import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  Button,
  VStack,
  Divider,
} from '@chakra-ui/react'
import WalletButton from '@app/components/Buttons/WalletButton'
import { InjectedModalProps, useTranslation } from '@app/context'
import { walletSelections } from '@app/config/wallets'

export default function ModalWalletSelection({ isOpen, onDismiss }: InjectedModalProps) {
  const { t } = useTranslation()
  return (
    <Modal isOpen={isOpen} onClose={onDismiss} isCentered>
      <ModalOverlay />
      <ModalContent width="317px">
        <ModalCloseButton />
        <ModalHeader>{t('Connect Wallet')}</ModalHeader>
        <Divider />
        <ModalBody>
          <VStack spacing={2}>
            {walletSelections.map((wallet, idx) => (
              <WalletButton wallet={wallet} key={idx} onDismiss={onDismiss} />
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter py="6">
          <Button w="full" variant="link">
            {t('Learn How to Connect')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
