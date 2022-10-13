import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { InjectedModalProps, useTranslation } from '@app/context'
import { getFullDisplayBalance } from '@app/utils/formatBalance'
import { ModalActions, ModalInput } from '@app/components/Modal'
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useToastApp } from '@app/hooks'

interface WithdrawModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
}

const WithdrawModal: React.FC<InjectedModalProps & WithdrawModalProps> = ({ 
  isOpen, 
  onConfirm, 
  onDismiss, 
  max, 
  tokenName = '' 
}) => {
  const [val, setVal] = useState('')
  const { toastSuccess, toastError } = useToastApp()
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const valNumber = new BigNumber(val)
  const fullBalanceNumber = new BigNumber(fullBalance)

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal isOpen={isOpen} onClose={onDismiss} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader textTransform="uppercase" >{t(`Unstake`)} {tokenName}</ModalHeader>
        <Divider />
        <ModalBody>
          <ModalInput
            onSelectMax={handleSelectMax}
            onChange={handleChange}
            value={val}
            max={fullBalance}
            symbol={tokenName}
            inputTitle={t('Unstake')}
          />
          <Divider mt="8px" />
          <ModalActions>
            <Button 
              variant="secondary" 
              onClick={onDismiss} 
              width="100%" 
              colorScheme="primary" 
              color="white" 
              size="md" 
              rounded="2xl"
              border="1px solid #555"
              mt="22px"
              mb="16px"
              disabled={pendingTx}
              >
              {t('Cancel')}
            </Button>
            <Button
              width="100%"
              colorScheme="primary" 
              color="white" 
              size="md" 
              rounded="2xl"
              mt="22px"
              mb="16px"
              disabled={pendingTx || !valNumber.isFinite() || valNumber.eq(0) || valNumber.gt(fullBalanceNumber)}
              onClick={async () => {
                setPendingTx(true)
                try {
                  await onConfirm(val)
                  toastSuccess(t('Unstaked!'), t('Your earnings have also been harvested to your wallet'))
                  onDismiss()
                } catch (e) {
                  toastError(
                    t('Error'),
                    t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
                  )
                  console.error(e)
                } finally {
                  setPendingTx(false)
                }
              }}
            >
              {pendingTx ? t('Confirming') : t('Confirm')}
            </Button>
          </ModalActions>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default WithdrawModal
