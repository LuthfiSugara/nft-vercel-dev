import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Button,
  Center,
  Text,
  Flex,
  Divider,
} from '@chakra-ui/react'
import { InjectedModalProps, useTranslation } from '@app/context'
import { ArrowUpIcon } from '@chakra-ui/icons'

export default function ModalSuccessransferNFT({ isOpen, onDismiss }: InjectedModalProps) {
  const { t } = useTranslation()
  return (
    <Modal isOpen={isOpen} onClose={onDismiss} isCentered>
      <ModalOverlay />
      <ModalContent maxW={'25vw'}>
        <ModalBody p={'1vw'}>
          <Flex>
            <Text fontSize={'1.2vw'} fontWeight={'bold'}>
              {t('Transfer Success')}
            </Text>
            <ModalCloseButton w={'3vw'} h={'3vw'} fontSize={'1.2vw'} />
          </Flex>
          <Divider bg={'legion.white'} mt={'1.2vw'} />
          <Center mt={'1.5vw'}>
            <ArrowUpIcon color={'legion.primary'} fontSize={'4vw'} />
          </Center>
          <Center mt={'1.5vw'}>
            <Text align={'center'} fontSize={'1vw'} fontWeight={'bold'}>
              {t('Your NFT GICVsuccess')}
              <br />
              {t('transfered to')}
            </Text>
          </Center>
          <Center w={'100%'} border={'0.1vw solid'} borderColor={'legion.white'} p={'0.3vw'} mt={'1.5vw'}>
            <Text fontSize={'1vw'}>0xb3433hjb12hjk3hj1jjb1u113dsa94</Text>
          </Center>
          <Center mt={'2vw'}>
            <Button
              colorScheme="primary"
              color="white"
              fontSize={'1.2vw'}
              fontWeight={'extrabold'}
              borderRadius={'0.5vw'}
              w={'100%'}
              p={'1.7vw'}
              maxH={'3.5vw'}
              onClick={onDismiss}
            >
              Close
            </Button>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
