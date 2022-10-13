import { Modal, ModalBody, ModalContent, ModalOverlay, Center, ModalCloseButton, Flex } from '@chakra-ui/react'
import { InjectedModalProps } from '@app/context'
import Image from 'next/image'

interface PopUpNFTModalProps {
  onDismiss?: () => void
  imageUrl: string
}

const ModalPopUpNFT: React.FC<InjectedModalProps & PopUpNFTModalProps> = ({ isOpen, onDismiss, imageUrl }) => {
  return (
    <Modal isOpen={isOpen} onClose={onDismiss} scrollBehavior={'inside'} isCentered>
      <ModalOverlay />
      <ModalContent bgColor={'transparent'} boxShadow={0} maxW={['94vw', '94vw', '43vw']}>
        <Flex justifyContent={'end'} alignItems={'center'} pb={['4.5vw', '4.5vw', '1.5vw']}>
          <ModalCloseButton
            position={'relative'}
            fontSize={['6vw', '6vw', '2vw']}
            w={'fit-content'}
            h={'fit-content'}
          />
        </Flex>
        <ModalBody p={0}>
          <Center>
            <Center
              pos={'relative'}
              border={'0.1vw solid rgba(255, 255, 255, 0.9)'}
              w={['73vw', '73vw', '35vw']}
              h={['73vw', '73vw', '35vw']}
              borderRadius={['3vw', '3vw', '1vw']}
              overflow={'hidden'}
            >
              <Image src={imageUrl} layout="fill" objectFit="contain" alt={''} />
            </Center>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalPopUpNFT
