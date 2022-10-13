import React, { useState } from 'react'
import { Button, Text, Flex, Alert, Modal, Checkbox, ModalContent, ModalOverlay, ModalCloseButton, ModalHeader, Divider, ModalBody, AlertIcon } from '@chakra-ui/react'
import { useExpertModeManager } from '@app/store/user/hooks' 
import { InjectedModalProps, useTranslation } from '@app/context' 

interface ExpertModalProps extends InjectedModalProps {
  setShowConfirmExpertModal: (boolean) => void
  setShowExpertModeAcknowledgement: (boolean) => void
}

const ExpertModal: React.FC<ExpertModalProps> = ({ 
    setShowConfirmExpertModal, 
    setShowExpertModeAcknowledgement, 
    isOpen,
  }) => {
  const [, toggleExpertMode] = useExpertModeManager()
  const [isRememberChecked, setIsRememberChecked] = useState(false)

  const { t } = useTranslation()

  return (
    <Modal isOpen={isOpen} onClose={() => { setShowConfirmExpertModal(false) }} isCentered>
      <ModalOverlay />
      <ModalContent width={['90vw', 'auto']}>
        <ModalCloseButton />
        <ModalHeader textTransform={'uppercase'}>{t('Expert Mode')}</ModalHeader>
        <Divider />
        <ModalBody>
          <Alert
            status="warning"
            mb="24px"
            size="sm"
            fontSize="sm"
            variant="left-accent"
          >
            <AlertIcon />
            <Text>
              {t(
                "Expert mode turns off the 'Confirm' transaction prompt, and allows high slippage trades that often result in bad rates and lost funds.",
              )}
            </Text>
          </Alert>
          <Text mb="24px">{t('Only use this mode if you know what you’re doing.')}</Text>
          <Flex alignItems="center" mb="24px">
            <Checkbox
              name="confirmed"
              type="checkbox"
              checked={isRememberChecked}
              onChange={() => setIsRememberChecked(!isRememberChecked)}
              scale="sm"
            />
            <Text ml="10px" color="textSubtle" style={{ userSelect: 'none' }}>
              {t('Don’t show this again')}
            </Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Button
              variant={'solid'}
              colorScheme={'primary'}
              mb="8px"
              id="confirm-expert-mode"
              onClick={() => {
                // eslint-disable-next-line no-alert
                if (window.prompt(`Please type the word "confirm" to enable expert mode.`) === 'confirm') {
                  toggleExpertMode()
                  setShowConfirmExpertModal(false)
                  if (isRememberChecked) {
                    setShowExpertModeAcknowledgement(false)
                  }
                }
              }}
            >
              {t('Turn On Expert Mode')}
            </Button>
            <Button
              variant={'ghost'}
              mb="8px"
              width={'40%'}
              onClick={() => {
                setShowConfirmExpertModal(false)
              }}
            >
              {t('Cancel')}
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ExpertModal
