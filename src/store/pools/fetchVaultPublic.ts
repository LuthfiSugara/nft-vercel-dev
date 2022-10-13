import BigNumber from 'bignumber.js'
import { convertSharesToLegion } from '@app/content/Pools/helpers' 
import { multicallv2 } from '@app/utils/multicall'
import legionVaultAbi from '@app/config/abi/legionVault.json'
import { getLegionVaultAddress } from '@app/utils/addressHelpers'
import { BIG_ZERO } from '@app/utils/bigNumber'

export const fetchPublicVaultData = async () => {
  try {
    const calls = [
      'getPricePerFullShare',
      'totalShares',
      'calculateHarvestLegionRewards',
      'calculateTotalPendingLegionRewards',
    ].map((method) => ({
      address: getLegionVaultAddress(),
      name: method,
    }))

    const [[sharePrice], [shares], [estimatedLegionBountyReward], [totalPendingLegionHarvest]] = await multicallv2(
      legionVaultAbi,
      calls,
    )

    const totalSharesAsBigNumber = shares ? new BigNumber(shares.toString()) : BIG_ZERO
    const sharePriceAsBigNumber = sharePrice ? new BigNumber(sharePrice.toString()) : BIG_ZERO
    const totalLegionInVaultEstimate = convertSharesToLegion(totalSharesAsBigNumber, sharePriceAsBigNumber)
    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalLegionInVault: totalLegionInVaultEstimate.legionAsBigNumber.toJSON(),
      estimatedLegionBountyReward: new BigNumber(estimatedLegionBountyReward.toString()).toJSON(),
      totalPendingLegionHarvest: new BigNumber(totalPendingLegionHarvest.toString()).toJSON(),
    }
  } catch (error) {
    return {
      totalShares: null,
      pricePerFullShare: null,
      totalLegionInVault: null,
      estimatedLegionBountyReward: null,
      totalPendingLegionHarvest: null,
    }
  }
}

export const fetchVaultFees = async () => {
  try {
    const calls = ['performanceFee', 'callFee', 'withdrawFee', 'withdrawFeePeriod'].map((method) => ({
      address: getLegionVaultAddress(),
      name: method,
    }))

    const [[performanceFee], [callFee], [withdrawalFee], [withdrawalFeePeriod]] = await multicallv2(legionVaultAbi, calls)

    return {
      performanceFee: performanceFee.toNumber(),
      callFee: callFee.toNumber(),
      withdrawalFee: withdrawalFee.toNumber(),
      withdrawalFeePeriod: withdrawalFeePeriod.toNumber(),
    }
  } catch (error) {
    return {
      performanceFee: null,
      callFee: null,
      withdrawalFee: null,
      withdrawalFeePeriod: null,
    }
  }
}

export default fetchPublicVaultData
