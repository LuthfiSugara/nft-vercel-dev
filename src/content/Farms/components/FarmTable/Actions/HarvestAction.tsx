import React, { useEffect, useState } from 'react'
import { Skeleton, Text, Heading, Button, VStack, Flex } from '@chakra-ui/react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useToastApp } from '@app/hooks'
import { useFarmUser, usePriceLegionBusd } from '@app/store/farms/hooks'
import { BIG_ZERO } from '@app/utils/bigNumber'
import { getBalanceAmount } from '@app/utils/formatBalance'
import { useTranslation } from '@app/context'
import { useAppDispatch } from '@app/store/typed'
import Balance from '@app/components/Balance'
import { fetchFarmUserDataAsync } from '@app/store/farms'
import useHarvestFarm from '@app/content/Farms/hooks/useHarvestFarm'
import { FarmWithStakedValue } from '../../FarmCard/FarmCard'
// import Balance from 'components/Balance'
// import { BIG_ZERO } from 'utils/bigNumber'
// import { getBalanceAmount } from 'utils/formatBalance'
// import { useAppDispatch } from 'state'
// import { fetchFarmUserDataAsync } from 'state/farms'
// import { usePriceCakeBusd } from 'state/farms/hooks'
// import useToast from 'hooks/useToast'
// import { useTranslation } from 'contexts/Localization'
// import useHarvestFarm from '../../../hooks/useHarvestFarm'

interface HarvestActionProps extends FarmWithStakedValue {
    userDataReady: boolean
}

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({ pid, userData, userDataReady }) => {
  const { toastSuccess, toastError } = useToastApp()
  const earningsBigNumber = new BigNumber(userData.earnings)
  const legionPrice = usePriceLegionBusd()
  let earnings = BIG_ZERO
  let earningsBusd = 0
  let displayBalance = userDataReady ? earnings.toLocaleString() : <Skeleton width={60} />

  // If user didn't connect wallet default balance will be 0
  if (!earningsBigNumber.isZero()) {
    earnings = getBalanceAmount(earningsBigNumber)
    earningsBusd = earnings.multipliedBy(legionPrice).toNumber()
    displayBalance = earnings.toFixed(3, BigNumber.ROUND_DOWN)
  }

  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestFarm(pid)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const { allowance, stakedBalance } = useFarmUser(pid)

  const isApproved = account && allowance && allowance.isGreaterThan(0)

  useEffect(() => {
    dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
  }, [displayBalance])

  return (
    <>
        <Flex spacing={9} width="full" height="full" px="2" py={['2', '0']} justifyContent="space-between">
            <VStack align="start" spacing={4} width="full" height="full">
                <Text>LEGION {t('EARNED')}</Text>
                <Flex justifyContent="space-between" width="full" alignItems="center">
                    <div>
                        <Heading>{isApproved && stakedBalance.gt(0) ? displayBalance : 0}</Heading>
                        {earningsBusd > 0 && (
                            <Balance fontSize="12px" color="textSubtle" decimals={2} value={earningsBusd} unit=" USD" prefix="~" />
                        )}
                    </div>
                    <Button
                        colorScheme="primary" 
                        color="white" 
                        size="md"
                        p="6"
                        rounded="2xl"
                        disabled={earnings.eq(0) || pendingTx || !userDataReady}
                        onClick={async () => {
                            setPendingTx(true)
                            try {
                            await onReward()
                            toastSuccess(
                                `${t('Harvested')}!`,
                                t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'LEGION' }),
                            )
                            } catch (e) {
                            toastError(
                                t('Error'),
                                t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
                            )
                            console.error(e)
                            } finally {
                            setPendingTx(false)
                            }
                            dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
                        }}
                    >
                        {pendingTx ? t('Harvesting') : t('Harvest')}
                    </Button>
                </Flex>
            </VStack>
        </Flex>
    </>
  )
}

export default HarvestAction
