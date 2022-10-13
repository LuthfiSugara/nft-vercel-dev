import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'
import {
  Text,
  Flex,
  // Image,
  Button,
  Slider,
  Divider,
  // Skeleton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Input,
  Center,
} from '@chakra-ui/react'
import { InjectedModalProps, useTranslation } from '@app/context'
// import { useTheme } from '@chakra-ui/system'
import { useToastApp } from '@app/hooks'
import BigNumber from 'bignumber.js'
import { getFullDisplayBalance, getDecimalAmount } from '@app/utils/formatBalance'
import { DeserializedPool } from '@app/store/typed'
// import { getInterestBreakdown } from '@app/utils/compoundApyHelpers'
import PercentageButton from './PercentageButton'
import useStakePool from '@app/content/Pools/hooks/useStakePool'
import useUnstakePool from '@app/content/Pools/hooks/useUnstakePool'
import { ModalActions } from '@app/components/Modal'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import Link from 'next/link'
// import { legionStats } from '@app/mocks'
// import RoiCalculatorModal from 'components/RoiCalculatorModal'

interface StakeModalProps {
  isBnbPool: boolean
  pool: DeserializedPool
  stakingTokenBalance: BigNumber
  stakingTokenPrice: number
  isRemovingStake?: boolean
  onDismiss?: () => void
}

// const StyledLink = styled(Link)`
//   width: 100%;
// `

// const AnnualRoiContainer = styled(Flex)`
//   cursor: pointer;
// `

// const AnnualRoiDisplay = styled(Text)`
//   width: 72px;
//   max-width: 72px;
//   overflow: hidden;
//   text-align: right;
//   text-overflow: ellipsis;
// `

const StakeModal: React.FC<InjectedModalProps & StakeModalProps> = ({
  isOpen,
  isBnbPool,
  pool,
  stakingTokenBalance,
  // stakingTokenPrice,
  isRemovingStake = false,
  onDismiss,
}) => {
  const { sousId, stakingToken, userData, stakingLimit, earningToken } = pool
  const { t } = useTranslation()
  // const { theme } = useTheme()
  const { onStake } = useStakePool(sousId, isBnbPool)
  const { onUnstake } = useUnstakePool(sousId, pool.enableEmergencyWithdraw)
  const { toastSuccess, toastError } = useToastApp()
  const [pendingTx, setPendingTx] = useState(false)
  const [stakeAmount, setStakeAmount] = useState('')
  const [hasReachedStakeLimit, setHasReachedStakedLimit] = useState(false)
  const [percent, setPercent] = useState(0)

  // const [showRoiCalculator, setShowRoiCalculator] = useState(false)
  const getCalculatedStakingLimit = () => {
    if (isRemovingStake) {
      return userData.stakedBalance
    }
    return stakingLimit.gt(0) && stakingTokenBalance.gt(stakingLimit) ? stakingLimit : stakingTokenBalance
  }
  const fullDecimalStakeAmount = getDecimalAmount(new BigNumber(stakeAmount), stakingToken.decimals)
  const userNotEnoughToken = isRemovingStake
    ? userData.stakedBalance.lt(fullDecimalStakeAmount)
    : userData.stakingTokenBalance.lt(fullDecimalStakeAmount)

  // const usdValueStaked = new BigNumber(stakeAmount).times(stakingTokenPrice)
  // const formattedUsdValueStaked = !usdValueStaked.isNaN() && formatNumber(usdValueStaked.toNumber())

  // const interestBreakdown = getInterestBreakdown({
  //   principalInUSD: !usdValueStaked.isNaN() ? usdValueStaked.toNumber() : 0,
  //   apr,
  //   earningTokenPrice,
  // })
  // const annualRoi = interestBreakdown[3] * pool.earningTokenPrice
  // const formattedAnnualRoi = formatNumber(annualRoi, annualRoi > 10000 ? 0 : 2, annualRoi > 10000 ? 0 : 2)

  const getTokenLink = stakingToken.address ? `/swap?outputCurrency=${stakingToken.address}` : '/swap'

  useEffect(() => {
    if (stakingLimit.gt(0) && !isRemovingStake) {
      setHasReachedStakedLimit(fullDecimalStakeAmount.plus(userData.stakedBalance).gt(stakingLimit))
    }
  }, [
    stakeAmount,
    stakingLimit,
    userData,
    stakingToken,
    isRemovingStake,
    setHasReachedStakedLimit,
    fullDecimalStakeAmount,
  ])

  const handleStakeInputChange = (input: string) => {
    if (input) {
      const convertedInput = getDecimalAmount(new BigNumber(input), stakingToken.decimals)
      const percentage = Math.floor(convertedInput.dividedBy(getCalculatedStakingLimit()).multipliedBy(100).toNumber())
      setPercent(Math.min(percentage, 100))
    } else {
      setPercent(0)
    }
    setStakeAmount(input)
  }

  const handleChangePercent = (sliderPercent: number) => {
    if (sliderPercent > 0) {
      const percentageOfStakingMax = getCalculatedStakingLimit().dividedBy(100).multipliedBy(sliderPercent)
      const amountToStake = getFullDisplayBalance(percentageOfStakingMax, stakingToken.decimals, stakingToken.decimals)
      setStakeAmount(amountToStake)
    } else {
      setStakeAmount('')
    }
    setPercent(sliderPercent)
  }

  const handleConfirmClick = async () => {
    setPendingTx(true)
    try {
      if (isRemovingStake) {
        // unstaking
        await onUnstake(stakeAmount, stakingToken.decimals)
        toastSuccess(
          `${t('Unstaked')}!`,
          t('Your %symbol% earnings have also been harvested to your wallet!', {
            symbol: earningToken.symbol,
          })
        )
      } else {
        // staking
        await onStake(stakeAmount, stakingToken.decimals)
        toastSuccess(
          `${t('Staked')}!`,
          t('Your %symbol% funds have been staked in the pool!', {
            symbol: stakingToken.symbol,
          })
        )
      }
      setPendingTx(false)
      onDismiss()
    } catch (e) {
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingTx(false)
    }
  }

  // if (showRoiCalculator) {
  //   return (
  //     <RoiCalculatorModal
  //       earningTokenPrice={earningTokenPrice}
  //       stakingTokenPrice={stakingTokenPrice}
  //       apr={apr}
  //       linkLabel={t('Get %symbol%', { symbol: stakingToken.symbol })}
  //       linkHref={getTokenLink}
  //       stakingTokenBalance={userData.stakedBalance.plus(stakingTokenBalance)}
  //       stakingTokenSymbol={stakingToken.symbol}
  //       earningTokenSymbol={earningToken.symbol}
  //       onBack={() => setShowRoiCalculator(false)}
  //       initialValue={stakeAmount}
  //     />
  //   )
  // }

  return (
    <Modal isOpen={isOpen} onClose={onDismiss} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader textTransform="uppercase">
          {isRemovingStake ? t('Unstake') : t('Stake')} {stakingToken.symbol}
        </ModalHeader>
        <Divider />
        <ModalBody>
          {stakingLimit.gt(0) && !isRemovingStake && (
            <Text color="secondary" mb="24px" style={{ textAlign: 'center' }} fontSize="16px">
              {t('Max stake for this pool: %amount% %token%', {
                amount: getFullDisplayBalance(stakingLimit, stakingToken.decimals, 0),
                token: stakingToken.symbol,
              })}
            </Text>
          )}
          <Flex alignItems="center" justifyContent="space-between" mb="8px">
            <Text>{isRemovingStake ? t('Unstake') : t('Stake')}:</Text>
            <Flex alignItems="center" minWidth="70px">
              {/* <Image src={`/images/tokens/${stakingToken.address}.png`} width={24} height={24} alt={stakingToken.symbol} /> */}
              {/* <Image src="https://pancakeswap.finance/images/tokens/0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63.png" width={24} height={24} alt={stakingToken.symbol} /> */}
              {/* <Text ml="4px">
                {stakingToken.symbol}
              </Text> */}
            </Flex>
          </Flex>
          {/* <BalanceInput
            value={stakeAmount}
            onUserInput={handleStakeInputChange}
            currencyValue={stakingTokenPrice !== 0 && `~${formattedUsdValueStaked || 0} USD`}
            isWarning={hasReachedStakeLimit || userNotEnoughToken}
            decimals={stakingToken.decimals}
          /> */}
          <Input
            value={stakeAmount}
            onChange={(e) => handleStakeInputChange(e.target.value)}
            type="number"
            isInvalid={hasReachedStakeLimit || userNotEnoughToken}
            decimals={stakingToken.decimals}
            // currencyValue={stakingTokenPrice !== 0 && `~${formattedUsdValueStaked || 0} USD`}
          />
          {hasReachedStakeLimit && (
            <Text color="failure" fontSize="12px" style={{ textAlign: 'right' }} mt="4px">
              {t('Maximum total stake: %amount% %token%', {
                amount: getFullDisplayBalance(new BigNumber(stakingLimit), stakingToken.decimals, 0),
                token: stakingToken.symbol,
              })}
            </Text>
          )}
          {userNotEnoughToken && (
            <Text color="failure" fontSize="12px" style={{ textAlign: 'right' }} mt="4px">
              {t('Insufficient %symbol% balance', {
                symbol: stakingToken.symbol,
              })}
            </Text>
          )}
          <Text ml="auto" color="textSubtle" fontSize="12px">
            {t('Balance: %balance%', {
              balance: getFullDisplayBalance(getCalculatedStakingLimit(), stakingToken.decimals),
            })}
          </Text>
          <Slider
            min={0}
            max={100}
            value={percent}
            name="stake"
            step={1}
            // onValueChanged={handleChangePercent}
            // valueLabel={`${percent}%`}
          />
          <Flex alignItems="center" justifyContent="space-between" mb="20px">
            <PercentageButton
              color={percent === 25 ? 'legion.primary' : 'legion.white'}
              onClick={() => handleChangePercent(25)}
            >
              25%
            </PercentageButton>
            <Center height="40px">
              <Divider size="20px" colorScheme="primary" orientation="vertical" />
            </Center>
            <PercentageButton
              color={percent === 50 ? 'legion.primary' : 'legion.white'}
              onClick={() => handleChangePercent(50)}
            >
              50%
            </PercentageButton>
            <Center height="40px">
              <Divider size="20px" colorScheme="primary" orientation="vertical" />
            </Center>
            <PercentageButton
              color={percent === 75 ? 'legion.primary' : 'legion.white'}
              onClick={() => handleChangePercent(75)}
            >
              75%
            </PercentageButton>
            <Center height="40px">
              <Divider size="20px" colorScheme="primary" orientation="vertical" />
            </Center>
            <PercentageButton
              color={percent === 100 ? 'legion.primary' : 'legion.white'}
              onClick={() => handleChangePercent(100)}
            >
              {t('Max')}
            </PercentageButton>
          </Flex>
          {/* {!isRemovingStake && (
            <Flex mt="24px" alignItems="center" justifyContent="space-between">
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
            </Flex>
          )} */}

          {!isRemovingStake && (
            <Flex width="fit-content">
              <Link href={getTokenLink}>
                <a onClick={onDismiss}>
                  <Text color="legion.primary" mt="8px">
                    {t('Get %symbol%', { symbol: stakingToken.symbol })}
                    <ExternalLinkIcon ml="8px" mb="5px" />
                  </Text>
                </a>
              </Link>
            </Flex>
          )}

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
              isLoading={pendingTx}
              onClick={handleConfirmClick}
              disabled={
                !stakeAmount || parseFloat(stakeAmount) === 0 || hasReachedStakeLimit || userNotEnoughToken || pendingTx
              }
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

export default StakeModal
