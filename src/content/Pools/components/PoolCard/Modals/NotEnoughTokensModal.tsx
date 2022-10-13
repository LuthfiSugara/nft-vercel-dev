import React from 'react'
import { InjectedModalProps, useTranslation } from '@app/context' 
// import styled from 'styled-components'
import { 
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay, 
  Divider,
  Text, 
  Button, 
  Flex,
} from '@chakra-ui/react'
// import { useTheme } from '@chakra-ui/system' 
import { ModalActions } from '@app/components/Modal'
import Link from 'next/link'
import { DeserializedPool } from '@app/store/typed'
import { ExternalLinkIcon } from '@chakra-ui/icons'

interface NotEnoughTokensModalProps {
  pool: DeserializedPool
  onDismiss?: () => void
}

// const StyledLink = styled(Link)`
//   width: 100%;
// `

const NotEnoughTokensModal: React.FC<InjectedModalProps & NotEnoughTokensModalProps> = ({ isOpen, pool, onDismiss }) => {
  const { stakingToken } = pool
  const { t } = useTranslation()
  // const { theme } = useTheme()

  const getTokenLink = stakingToken.address ? `/swap?outputCurrency=${stakingToken.address}` : '/swap'

  return (
    <Modal
      isOpen={isOpen}
      onClose={onDismiss}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader textTransform="uppercase" >{t('%symbol% required', { symbol: stakingToken.symbol })}</ModalHeader>
        <Divider />
        <ModalBody>
          <Text color="failure">
            {t('Insufficient %symbol% balance', { symbol: stakingToken.symbol })}
          </Text>
          <Text mt="24px">{t("You’ll need %symbol% to stake in this pool!", { symbol: stakingToken.symbol })}</Text>
          <Text>
            {t("Buy some %symbol%, or make sure your %symbol% isn’t in another pool or LP.", {
              symbol: stakingToken.symbol,
            })}
          </Text>
          <Flex width="fit-content">
              <Link href={getTokenLink}>
                <a onClick={onDismiss}>
                  <Text color="legion.primary" mt="38px">
                    {t('Get %symbol%', { symbol: stakingToken.symbol })}<ExternalLinkIcon ml="8px" mb="5px" />
                  </Text>
                </a>
              </Link>
            </Flex>
          <Divider mt="8px" />
          <ModalActions>
            <Button 
              width="100%"
              colorScheme="primary" 
              color="white" 
              size="md" 
              rounded="2xl"
              mt="22px"
              mb="16px"
              onClick={onDismiss}
            >
              {t('Close Window')}
            </Button>
          </ModalActions>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default NotEnoughTokensModal
