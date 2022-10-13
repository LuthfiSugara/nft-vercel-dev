// import LinkExternal from "@app/components/Link/LinkExternal"
import { ModalActions, ModalInput } from "@app/components/Modal"
import { InjectedModalProps, useTranslation } from "@app/context"
// import { useActiveWeb3React, useToastApp } from "@app/hooks"
// import { getInterestBreakdown } from "@app/utils/compoundApyHelpers"
import { getFullDisplayBalance } from "@app/utils/formatBalance"
import {
  Button,
  Divider,
  // Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import BigNumber from "bignumber.js"
import { useCallback, useMemo, useState } from "react"
import Link from 'next/link'
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { useToastApp } from "@app/hooks"

interface DepositModalProps {
  max: BigNumber
  stakedBalance: BigNumber
  // multiplier?: string
  lpPrice: BigNumber
  lpLabel?: string
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
  apr?: number
  displayApr?: string
  addLiquidityUrl?: string
  legionPrice?: BigNumber
}

const DepositModal: React.FC<InjectedModalProps & DepositModalProps> = ({
  isOpen,
  max,
  // stakedBalance,
  onConfirm,
  onDismiss,
  tokenName = '',
  addLiquidityUrl,
  // multiplier,
  // displayApr,
  // lpPrice,
  // lpLabel,
  // apr,
  // legionPrice,
}) => {
  const [val, setVal] = useState('')
  const { toastSuccess, toastError } = useToastApp()
  const [pendingTx, setPendingTx] = useState(false)
  // const [showRoiCalculator, setShowRoiCalculator] = useState(false)
  const { t } = useTranslation()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const lpTokensToStake = new BigNumber(val)
  const fullBalanceNumber = new BigNumber(fullBalance)

  // const usdToStake = lpTokensToStake.times(lpPrice)

  // const interestBreakdown = getInterestBreakdown({
  //   principalInUSD: !lpTokensToStake.isNaN() ? usdToStake.toNumber() : 0,
  //   apr,
  //   earningTokenPrice: legionPrice.toNumber(),
  // })

  // const annualRoi = legionPrice.times(interestBreakdown[3])
  // const formattedAnnualRoi = formatNumber(
  //   annualRoi.toNumber(),
  //   annualRoi.gt(10000) ? 0 : 2,
  //   annualRoi.gt(10000) ? 0 : 2,
  // )

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

  // if (showRoiCalculator) {
  //   return (
  //     <RoiCalculatorModal
  //       linkLabel={t('Get %symbol%', { symbol: lpLabel })}
  //       stakingTokenBalance={stakedBalance.plus(max)}
  //       stakingTokenSymbol={tokenName}
  //       stakingTokenPrice={lpPrice.toNumber()}
  //       earningTokenPrice={legionPrice.toNumber()}
  //       apr={apr}
  //       multiplier={multiplier}
  //       displayApr={displayApr}
  //       linkHref={addLiquidityUrl}
  //       isFarm
  //       initialValue={val}
  //       onBack={() => setShowRoiCalculator(false)}
  //     />
  //   )
  // }


  return (
    <Modal isOpen={isOpen} onClose={onDismiss} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader textTransform="uppercase" >{t(`Stake`)} {tokenName}</ModalHeader>
        <Divider />
        <ModalBody>
          <ModalInput
            value={val}
            onSelectMax={handleSelectMax}
            onChange={handleChange}
            max={fullBalance}
            symbol={tokenName}
            addLiquidityUrl={addLiquidityUrl}
            inputTitle={t('Stake')}
            onDismiss={onDismiss}
          />
          {/* <Flex my="14px" alignItems="center" justifyContent="space-between">
            <Text mr="8px" color="textSubtle">
              {t('Annual ROI at current rates')}:
            </Text>
            {Number.isFinite(annualRoi) ? (
              <AnnualRoiContainer
                alignItems="center"
                onClick={() => {
                  setShowRoiCalculator(true)
                }}
              >
                <AnnualRoiDisplay>${formattedAnnualRoi}</AnnualRoiDisplay>
                <IconButton variant="text" scale="sm">
                  <CalculateIcon color="textSubtle" width="18px" />
                </IconButton>
              </AnnualRoiContainer>
            ) : (
              <Skeleton width={60} />
            )}
          </Flex> */}

          <Link href={addLiquidityUrl}>
            <a onClick={onDismiss}>
              <Text color="legion.primary" mt="16px">
                {t('Get %symbol%', { symbol: tokenName })}<ExternalLinkIcon ml="8px" mb="5px" />
              </Text>
            </a>
          </Link>

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
              disabled={
                pendingTx || !lpTokensToStake.isFinite() || lpTokensToStake.eq(0) || lpTokensToStake.gt(fullBalanceNumber)
              }
              onClick={async () => {
                setPendingTx(true)
                try {
                  await onConfirm(val)
                  toastSuccess(t('Staked!'), t('Your funds have been staked in the farm'))
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

export default DepositModal
