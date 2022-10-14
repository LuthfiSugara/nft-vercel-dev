import {
  Text,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  Flex,
  // HStack,
  // VStack,
  Switch,
} from '@chakra-ui/react'
import { InjectedModalProps, useTranslation } from '@app/context'
import GasSettings from '../Menu/GlobalSettings/GasSettings'
import TransactionSettings from '../Menu/GlobalSettings/TransactionSettings'
import QuestionHelper from '../Shared/QuestionHelper'
import styled from '@emotion/styled'
import { withCustomScrollBar } from '@app/config/theme/withCustomScrollbar'
import theme from '@app/config/theme'
import { useExpertModeManager, useUserExpertModeAcknowledgementShow } from '@app/store/user/hooks'
import { useState } from 'react'
import ExpertModal from '../Menu/GlobalSettings/ExpertModal'

const ScrollableContainer = styled(ModalBody)`
  flex-direction: column;
  max-height: 400px;
`
export default function ModalTokenSettings({ isOpen, onDismiss }: InjectedModalProps) {
  const { t } = useTranslation()
  const [showConfirmExpertModal, setShowConfirmExpertModal] = useState(false)
  const [showExpertModeAcknowledgement, setShowExpertModeAcknowledgement] = useUserExpertModeAcknowledgementShow()
  const [expertMode, toggleExpertMode] = useExpertModeManager()

  if (showConfirmExpertModal) {
    return (
      <ExpertModal
        setShowConfirmExpertModal={setShowConfirmExpertModal}
        setShowExpertModeAcknowledgement={setShowExpertModeAcknowledgement}
        isOpen={isOpen}
        onDismiss={onDismiss}
      />
    )
  }

  const handleExpertModeToggle = () => {
    if (expertMode) {
      toggleExpertMode()
    } else if (!showExpertModeAcknowledgement) {
      toggleExpertMode()
    } else {
      setShowConfirmExpertModal(true)
    }
  }
  return (
    <Modal isCentered isOpen={isOpen} onClose={onDismiss}>
      <ModalOverlay />
      <ModalContent width={['90vw', 'auto']}>
        <ModalHeader>{t('Settings')}</ModalHeader>
        <ModalCloseButton />
        <ScrollableContainer
          py="4"
          borderTop="1px"
          borderColor="brand.bg.8"
          align="stretch"
          spacing="4"
          mt={['2', '4']}
          overflowY="scroll"
          sx={withCustomScrollBar('4px', theme.colors.gicv.secondary)}
        >
          <>
            <Flex pb="24px" flexDirection="column">
              <Text fontWeight="bold" textTransform="uppercase" fontSize="12px" color="secondary" mb="24px">
                {t('Global')}
              </Text>
              <GasSettings />
            </Flex>
            <Flex pt="24px" flexDirection="column" borderTop={`1px ${theme.colors.gicv.gray[200]} solid`}>
              <Text fontWeight="bold" textTransform="uppercase" fontSize="12px" color="secondary" mb="24px">
                {t('Swaps & Liquidity')}
              </Text>
              <TransactionSettings />
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" mb="24px">
              <Flex alignItems="center" gridColumnGap="2" align="center">
                <Text>{t('Expert Mode')}</Text>
                <QuestionHelper
                  label={t('Bypasses confirmation modals and allows high slippage trades. Use at your own risk.')}
                  placement="top-start"
                  ml="4px"
                />
              </Flex>
              <Switch
                id="toggle-expert-mode-button"
                scale="md"
                isChecked={expertMode}
                onChange={handleExpertModeToggle}
              />
            </Flex>
            {/* <HStack mt="4" justify="space-between">
              <Text>Audio</Text>
              <Switch />
            </HStack> */}
          </>
        </ScrollableContainer>
      </ModalContent>
    </Modal>
  )
}
