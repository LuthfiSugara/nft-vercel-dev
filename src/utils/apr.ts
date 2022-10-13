import BigNumber from 'bignumber.js'
import { BLOCKS_PER_YEAR, LEGION_PER_YEAR } from '@app/config'
import lpAprs from '@app/config/constants/lpAprs.json'

/**
 * Get the APR value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new legion allocated to the pool for each new block
 * @returns Null if the APR is NaN or infinite.
 */
export const getPoolApr = (
  stakingTokenPrice: number,
  rewardTokenPrice: number,
  totalStaked: number,
  tokenPerBlock: number,
): number => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerBlock).times(BLOCKS_PER_YEAR)
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

/**
 * Get farm APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param legionPriceUsd Legion price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @param farmAddress Farm Address
 * @returns Farm Apr
 */
export const getFarmApr = (
  poolWeight: BigNumber,
  legionPriceUsd: BigNumber,
  poolLiquidityUsd: BigNumber,
  farmAddress: string,
): { legionRewardsApr: number; lpRewardsApr: number } => {
  const yearlyLegionRewardAllocation = poolWeight ? poolWeight.times(LEGION_PER_YEAR) : new BigNumber(NaN)
  const legionRewardsApr = yearlyLegionRewardAllocation.times(legionPriceUsd).div(poolLiquidityUsd).times(100)
  let legionRewardsAprAsNumber = null
  if (!legionRewardsApr.isNaN() && legionRewardsApr.isFinite()) {
    legionRewardsAprAsNumber = legionRewardsApr.toNumber()
  }
  const lpRewardsApr = lpAprs[farmAddress?.toLocaleLowerCase()] ?? 0
  return { legionRewardsApr: legionRewardsAprAsNumber, lpRewardsApr }
}

export default null
