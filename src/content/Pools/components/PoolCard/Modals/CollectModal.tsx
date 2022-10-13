import React, { useState } from 'react'
import {
  Text,
  Button,
  Heading,
  Flex,
  // useTooltip,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { InjectedModalProps, useTranslation } from '@app/context' 
// import useTheme from 'hooks/useTheme'
import { useToastApp } from '@app/hooks'
import { Token } from '@aulyaaryansyah/legionswap-sdk-mainnet' 
// import { formatNumber } from '@app/utils/formatBalance'
import useHarvestPool from '../../../hooks/useHarvestPool'
import useStakePool from '../../../hooks/useStakePool'
import { ModalActions } from '@app/components/Modal'

interface CollectModalProps {
  formattedBalance: string
  fullBalance: string
  earningToken: Token
  earningsDollarValue: number
  sousId: number
  isBnbPool: boolean
  isCompoundPool?: boolean
  onDismiss?: () => void
}

const CollectModal: React.FC<InjectedModalProps & CollectModalProps> = ({
  isOpen,
  formattedBalance,
  fullBalance,
  earningToken,
  // earningsDollarValue,
  sousId,
  isBnbPool,
  // isCompoundPool = false,
  onDismiss,
}) => {
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToastApp()
  const { onReward } = useHarvestPool(sousId, isBnbPool)
  const { onStake } = useStakePool(sousId, isBnbPool)
  const [pendingTx, setPendingTx] = useState(false)
  const [shouldCompound] = useState(false)
  // const [shouldCompound, setShouldCompound] = useState(isCompoundPool)

  // const { theme } = useTheme()
  // const { targetRef, tooltip, tooltipVisible } = useTooltip(
  //   <>
  //     <Text mb="12px">{t('Compound: collect and restake CAKE into pool.')}</Text>
  //     <Text>{t('Harvest: collect CAKE and send to wallet')}</Text>
  //   </>,
  //   { placement: 'bottom-end', tooltipOffset: [20, 10] },
  // )

  const handleHarvestConfirm = async () => {
    setPendingTx(true)
    // compounding
    // console.log(shouldCompound)
    if (shouldCompound) {
      try {
        await onStake(fullBalance, earningToken.decimals)
        toastSuccess(
          `${t('Compounded')}!`,
          t('Your %symbol% earnings have been re-invested into the pool!', { symbol: earningToken.symbol }),
        )
        setPendingTx(false)
        onDismiss()
      } catch (e) {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        console.error(e)
        setPendingTx(false)
      }
    } else {
      // harvesting
      try {
        await onReward()
        toastSuccess(
          `${t('Harvested')}!`,
          t('Your %symbol% earnings have been sent to your wallet!', { symbol: earningToken.symbol }),
        )
        setPendingTx(false)
        onDismiss()
      } catch (e) {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        console.error(e)
        setPendingTx(false)
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onDismiss} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader textTransform="uppercase" >{t('Harvest')}</ModalHeader>
        <Divider />
        <ModalBody>
          {/* {isCompoundPool && (
            <Flex justifyContent="center" alignItems="center" mb="24px">
              <ButtonMenu
                activeIndex={shouldCompound ? 0 : 1}
                scale="sm"
                variant="subtle"
                onItemClick={(index) => setShouldCompound(!index)}
              >
                <ButtonMenuItem as="button">{t('Compound')}</ButtonMenuItem>
                <ButtonMenuItem as="button">{t('Harvest')}</ButtonMenuItem>
              </ButtonMenu>
              <Flex ml="10px" ref={targetRef}>
                <HelpIcon color="textSubtle" />
              </Flex>
              {tooltipVisible && tooltip}
            </Flex>
          )} */}

          <Flex justifyContent="space-between" alignItems="center" mt="16px" mb="24px">
            {/* <Text>{shouldCompound ? t('Compounding') : t('Harvesting')}:</Text> */}
            <Text>{t('Harvesting')}:</Text>
            <Flex flexDirection="column">
              <Heading>
                {formattedBalance} {earningToken.symbol}
              </Heading>
              {/* {earningsDollarValue > 0 && (
                <Text fontSize="12px" color="textSubtle">{`~${formatNumber(earningsDollarValue)} USD`}</Text>
              )} */}
            </Flex>
          </Flex>
          
          <Divider mt="8px" />
          <ModalActions>
            <Button 
              variant="secondary" 
              onClick={onDismiss} 
              pb="0px"
              width="100%" 
              colorScheme="primary" 
              color="white" 
              size="md" 
              rounded="2xl"
              border="1px solid #555"
              mt="22px"
              mb="16px"
            >
              {t('Cancel')}
            </Button>
            <Button
              onClick={handleHarvestConfirm}
              isLoading={pendingTx}
              width="100%"
              colorScheme="primary" 
              color="white" 
              size="md" 
              rounded="2xl"
              mt="22px"
              mb="16px"
              // endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
            >
              {pendingTx ? t('Confirming') : t('Confirm')}
            </Button>
          </ModalActions>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CollectModal
