import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  SimpleGrid,
} from '@chakra-ui/react'
import WalletButton from '@app/components/Buttons/WalletButton'
import { InjectedModalProps, useTranslation } from '@app/context'
import { walletSelections } from '@app/config/wallets'

export default function ModalWalletSelection({ isOpen, onDismiss }: InjectedModalProps) {
  const { t } = useTranslation()
  return (
    <Modal isOpen={isOpen} onClose={onDismiss} isCentered>
      <ModalOverlay />
      <ModalContent
        minW={['10vw', '10vw', '30vw']}
        maxW={['10vw', '10vw', '30vw']}
        px={['1vw', '1vw', '1.5vw']}
        py={['1vw', '1vw', '2vw']}
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
        <ModalHeader p={0}>{t('Connect a wallet')}</ModalHeader>
        <ModalBody pt={['1vw', '1vw', '1.5vw']} px={0} pb={0}>
          <SimpleGrid columns={2}>
            {walletSelections.map((wallet, idx) => (
              <WalletButton wallet={wallet} key={idx} onDismiss={onDismiss} />
            ))}
          </SimpleGrid>
        </ModalBody>
        {/* <ModalFooter p={0}>
          <Button fontSize={['1vw', '1vw', '1vw']} w="full" variant="link">
            {t('Learn How to Connect')}
          </Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  )
}
