import { Button, Text, Flex, Skeleton, Heading, VStack } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from '@app/components/Buttons/ConnectWalletButton'
import { useCallback, useState } from 'react'
import { useERC20, useToastApp } from '@app/hooks'
import { getAddress } from '@app/utils/addressHelpers'
import useApproveFarm from '../../../hooks/useApproveFarm'
import { useAppDispatch } from '@app/store/typed'
import { useTranslation } from '@app/context'
import { fetchFarmUserDataAsync } from '@app/store/farms'
import { useFarmUser, useLpTokenPrice, usePriceLegionBusd } from '@app/store/farms/hooks'
import { getBalanceAmount, getBalanceNumber, getFullDisplayBalance } from '@app/utils/formatBalance'
import BigNumber from 'bignumber.js'
import Balance from '@app/components/Balance'
import useUnstakeFarms from '../../../hooks/useUnstakeFarms'
// import WithdrawModal from '../WithdrawModal'
import useStakeFarms from '../../../hooks/useStakeFarms'
import DepositModal from '../../DepositModal'
import { useModal } from '@app/context/Modal/useModal'
import WithdrawModal from '../../WithdrawModal'
import getLiquidityUrlPathParts from '@app/utils/getLiquidityUrlPathParts'
import { BASE_ADD_LIQUIDITY_URL } from '@app/config'
import { FarmWithStakedValue } from '../../FarmCard/FarmCard'

const IconButtonWrapper = styled.div`
  display: flex;
`

interface StackedActionProps extends FarmWithStakedValue {
  userDataReady: boolean
  lpLabel?: string
  displayApr?: string
}

const Staked: React.FunctionComponent<StackedActionProps> = ({
  pid,
  // apr,
  // multiplier,
  lpSymbol,
  lpLabel,
  lpAddresses,
  quoteToken,
  token,
  userDataReady,
  // displayApr,
}) => {
    const [requestedApproval, setRequestedApproval] = useState(false)
    const { allowance, tokenBalance, stakedBalance } = useFarmUser(pid)
    // const lpLabel = data.lpSymbol && data.lpSymbol.toUpperCase().replace('LEGION', '')
    const lpPrice = useLpTokenPrice(lpSymbol)
    const legionPrice = usePriceLegionBusd()
    // const { active } = useWeb3React()
    const { t } = useTranslation()
    const { toastError } = useToastApp()
    const { account } = useWeb3React()
    const { onStake } = useStakeFarms(pid)
    const { onUnstake } = useUnstakeFarms(pid)
    const dispatch = useAppDispatch()
    const lpAddress = getAddress(lpAddresses)
    const lpContract = useERC20(lpAddress)
    const { onApprove } = useApproveFarm(lpContract)
    
    const isApproved = account && allowance && allowance.isGreaterThan(0)

    const liquidityUrlPathParts = getLiquidityUrlPathParts({
      quoteTokenAddress: quoteToken.address,
      tokenAddress: token.address,
    })
    const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}${liquidityUrlPathParts}`

    const handleStake = async (amount: string) => {
        await onStake(amount)
        dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
    }

    const handleUnstake = async (amount: string) => {
        await onUnstake(amount)
        dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
    }

    const displayBalance = useCallback(() => {
        const stakedBalanceBigNumber = getBalanceAmount(stakedBalance)
        if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0000001)) {
        return stakedBalanceBigNumber.toFixed(10, BigNumber.ROUND_DOWN)
        }
        if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0001)) {
        return getFullDisplayBalance(stakedBalance).toLocaleString()
        }
        return stakedBalanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
    }, [stakedBalance])

    const [onPresentDeposit] = useModal(
        <DepositModal
        max={tokenBalance}
        lpPrice={lpPrice}
        lpLabel={lpLabel}
        stakedBalance={stakedBalance}
        onConfirm={handleStake}
        tokenName={lpSymbol}
        legionPrice={legionPrice}
        addLiquidityUrl={addLiquidityUrl}
        // apr={apr}
        // displayApr={displayApr}
        // multiplier={multiplier}
        />,
        true,
        false,
        'addStakeLpModal'
    )

    const [onPresentWithdraw] = useModal(
        <WithdrawModal 
        max={stakedBalance} 
        onConfirm={handleUnstake} 
        tokenName={lpSymbol} 
        />,
        true,
        false,
        'subtractStakeLpModal'

    )

    const handleApprove = useCallback(async () => {
        try {
        setRequestedApproval(true)
        await onApprove()
        dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
        } catch (e) {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        console.error(e)
        } finally {
        setRequestedApproval(false)
        }
    }, [onApprove, dispatch, account, pid, t, toastError])
    
    if(!account) {
      return (
        <Flex spacing={9} width="full" height="full" px="2" py={['2', '0']} justifyContent="space-between">
          <VStack align="start" spacing={4} width="full" height="full">
            <Text>
              {t('START FARMING')}
            </Text>
            <Flex justifyContent="space-between" width="full" alignItems="center">
              <ConnectWalletButton 
                width="100%" 
                colorScheme="primary" 
                color="white" 
                size="md" 
                p="6"
                rounded="2xl"
              />
            </Flex>
          </VStack>
        </Flex>
      )
    }
    if (isApproved) {
      if (stakedBalance.gt(0)) {
        return (
          <Flex spacing={9} width="full" height="full" px="2" py={['2', '0']} justifyContent="space-between">
            <VStack align="start" spacing={4} width="full" height="full">
              <Text>
                {lpSymbol} {t('STAKED')}
              </Text>
              <Flex justifyContent="space-between" width="full" alignItems="center">
                <div>
                  <Heading my="auto">{displayBalance()}</Heading>
                  {stakedBalance.gt(0) && lpPrice.gt(0) && (
                      <Balance
                      fontSize="12px"
                      color="textSubtle"
                      decimals={2}
                      value={getBalanceNumber(lpPrice.times(stakedBalance))}
                      unit=" USD"
                      prefix="~"
                      />
                  )}
                </div>
                <IconButtonWrapper>
                    <Button 
                        variant="outline" 
                        onClick={onPresentWithdraw} 
                        mr="12px"
                        colorScheme="primary" 
                        color="legion.primary" 
                        my="auto" 
                        py="22px"
                    >
                        <MinusIcon />
                    </Button>
                    <Button
                        variant="outline"
                        onClick={onPresentDeposit}
                        colorScheme="primary" 
                        color="legion.primary" 
                        my="auto" 
                        py="22px"
                        disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
                    >
                        <AddIcon />
                    </Button>
                </IconButtonWrapper>
              </Flex>
            </VStack>
          </Flex>
        )
      }

      return (
        <Flex spacing={9} width="full" height="full" px="2" py={['2', '0']} justifyContent="space-between">
          <VStack align="start" spacing={4} width="full" height="full">
            <Text>
              {t('STAKE')} {lpSymbol}
            </Text>
            <Flex justifyContent="space-between" width="full" alignItems="center">
              <Button
                width="100%" 
                colorScheme="primary" 
                color="white" 
                size="md" 
                p="6"
                rounded="2xl"
                onClick={onPresentDeposit}
                disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
              >
                {t('STAKE LP')}
              </Button>
            </Flex>
          </VStack>
        </Flex>
      )
    }

    if (!userDataReady) {
      return (
        <Flex spacing={9} width="full" height="full" px="2" py={['2', '0']} justifyContent="space-between">
          <VStack align="start" spacing={4} width="full" height="full">
            <Text>
              {t('Start Farming')}
            </Text>
            <Flex justifyContent="right" width="full" alignItems="center">
              <Skeleton height="48px" width="104px" rounded="2xl" />
            </Flex>
          </VStack>
        </Flex>
      )
    }

    return (
      <Flex spacing={9} width="full" height="full" px="2" py={['2', '0']} justifyContent="space-between">
        <VStack align="start" spacing={4} width="full" height="full">
          <Text>
            {t('ENABLE FARMING')}
          </Text>
          <Flex justifyContent="center" width="full" alignItems="center">
            <Button 
              width="100%" 
              colorScheme="primary" 
              color="white" 
              size="md" 
              p="6"
              rounded="2xl"
              disabled={requestedApproval} 
              onClick={handleApprove}
            >
              Enable
            </Button>
          </Flex>
        </VStack>
      </Flex>
    )
  }

export default Staked
