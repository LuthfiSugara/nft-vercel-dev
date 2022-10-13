import { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../typed' 
import { simpleRpcProvider } from '@app/utils/providers'
import useRefresh from '@app/hooks/useRefresh'
import {
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync,
  fetchLegionVaultPublicData,
  fetchLegionVaultUserData,
  fetchLegionVaultFees,
  fetchPoolsStakingLimitsAsync,
} from '.'
import { State, DeserializedPool } from '@app/store/typed'
import { transformPool } from './helpers'

export const useFetchPublicPoolsData = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchPoolsPublicData = async () => {
      const blockNumber = await simpleRpcProvider.getBlockNumber()
      dispatch(fetchPoolsPublicDataAsync(blockNumber))
    }

    fetchPoolsPublicData()
    dispatch(fetchPoolsStakingLimitsAsync())
  }, [dispatch, slowRefresh])
}

export const useFetchUserPools = (account) => {
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])
}

export const usePools = (): { pools: DeserializedPool[]; userDataLoaded: boolean } => {
  const { pools, userDataLoaded } = useSelector((state: State) => ({
    pools: state.pools.data,
    userDataLoaded: state.pools.userDataLoaded,
  }))
  return { pools: pools.map(transformPool), userDataLoaded }
}

export const useFetchLegionVault = () => {
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchLegionVaultPublicData())
  }, [dispatch, fastRefresh])

  useEffect(() => {
    dispatch(fetchLegionVaultUserData({ account }))
  }, [dispatch, fastRefresh, account])

  useEffect(() => {
    dispatch(fetchLegionVaultFees())
  }, [dispatch])
}

export const useLegionVault = () => {
  const {
    totalShares: totalSharesAsString,
    pricePerFullShare: pricePerFullShareAsString,
    totalLegionInVault: totalLegionInVaultAsString,
    estimatedLegionBountyReward: estimatedLegionBountyRewardAsString,
    totalPendingLegionHarvest: totalPendingLegionHarvestAsString,
    fees: { performanceFee, callFee, withdrawalFee, withdrawalFeePeriod },
    userData: {
      isLoading,
      userShares: userSharesAsString,
      legionAtLastUserAction: legionAtLastUserActionAsString,
      lastDepositedTime,
      lastUserActionTime,
    },
  } = useSelector((state: State) => state.pools.legionVault)

  const estimatedLegionBountyReward = useMemo(() => {
    return new BigNumber(estimatedLegionBountyRewardAsString)
  }, [estimatedLegionBountyRewardAsString])

  const totalPendingLegionHarvest = useMemo(() => {
    return new BigNumber(totalPendingLegionHarvestAsString)
  }, [totalPendingLegionHarvestAsString])

  const totalShares = useMemo(() => {
    return new BigNumber(totalSharesAsString)
  }, [totalSharesAsString])

  const pricePerFullShare = useMemo(() => {
    return new BigNumber(pricePerFullShareAsString)
  }, [pricePerFullShareAsString])

  const totalLegionInVault = useMemo(() => {
    return new BigNumber(totalLegionInVaultAsString)
  }, [totalLegionInVaultAsString])

  const userShares = useMemo(() => {
    return new BigNumber(userSharesAsString)
  }, [userSharesAsString])

  const legionAtLastUserAction = useMemo(() => {
    return new BigNumber(legionAtLastUserActionAsString)
  }, [legionAtLastUserActionAsString])

  return {
    totalShares,
    pricePerFullShare,
    totalLegionInVault,
    estimatedLegionBountyReward,
    totalPendingLegionHarvest,
    fees: {
      performanceFee,
      callFee,
      withdrawalFee,
      withdrawalFeePeriod,
    },
    userData: {
      isLoading,
      userShares,
      legionAtLastUserAction,
      lastDepositedTime,
      lastUserActionTime,
    },
  }
}
