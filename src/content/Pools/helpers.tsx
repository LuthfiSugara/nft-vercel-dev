import BigNumber from 'bignumber.js'
import { DeserializedPool } from '@app/store/typed'
import { getApy } from '@app/utils/compoundApyHelpers'
import { getBalanceNumber, getFullDisplayBalance, getDecimalAmount } from '@app/utils/formatBalance'

export const convertSharesToLegion = (
  shares: BigNumber,
  legionPerFullShare: BigNumber,
  decimals = 18,
  decimalsToRound = 3,
) => {
  const sharePriceNumber = getBalanceNumber(legionPerFullShare, decimals)
  const amountInLegion = new BigNumber(shares.multipliedBy(sharePriceNumber))
  const legionAsNumberBalance = getBalanceNumber(amountInLegion, decimals)
  const legionAsBigNumber = getDecimalAmount(new BigNumber(legionAsNumberBalance), decimals)
  const legionAsDisplayBalance = getFullDisplayBalance(amountInLegion, decimals, decimalsToRound)
  return { legionAsNumberBalance, legionAsBigNumber, legionAsDisplayBalance }
}

export const convertLegionToShares = (
  legion: BigNumber,
  legionPerFullShare: BigNumber,
  decimals = 18,
  decimalsToRound = 3,
) => {
  const sharePriceNumber = getBalanceNumber(legionPerFullShare, decimals)
  const amountInShares = new BigNumber(legion.dividedBy(sharePriceNumber))
  const sharesAsNumberBalance = getBalanceNumber(amountInShares, decimals)
  const sharesAsBigNumber = getDecimalAmount(new BigNumber(sharesAsNumberBalance), decimals)
  const sharesAsDisplayBalance = getFullDisplayBalance(amountInShares, decimals, decimalsToRound)
  return { sharesAsNumberBalance, sharesAsBigNumber, sharesAsDisplayBalance }
}

const AUTO_VAULT_COMPOUND_FREQUENCY = 5000
const MANUAL_POOL_AUTO_COMPOUND_FREQUENCY = 0

export const getAprData = (pool: DeserializedPool, performanceFee: number) => {
  const { isAutoVault, apr } = pool
  // console.log(apr)

  //   Estimate & manual for now. 288 = once every 5 mins. We can change once we have a better sense of this
  const autoCompoundFrequency = isAutoVault ? AUTO_VAULT_COMPOUND_FREQUENCY : MANUAL_POOL_AUTO_COMPOUND_FREQUENCY

  if (isAutoVault) {
    const autoApr = getApy(apr, AUTO_VAULT_COMPOUND_FREQUENCY, 365, performanceFee) * 100
    return { apr: autoApr, autoCompoundFrequency }
  }
  return { apr, autoCompoundFrequency }
}

export const getLegionVaultEarnings = (
  account: string,
  legionAtLastUserAction: BigNumber,
  userShares: BigNumber,
  pricePerFullShare: BigNumber,
  earningTokenPrice: number,
) => {
  const hasAutoEarnings =
    account && legionAtLastUserAction && legionAtLastUserAction.gt(0) && userShares && userShares.gt(0)
  const { legionAsBigNumber } = convertSharesToLegion(userShares, pricePerFullShare)
  const autoLegionProfit = legionAsBigNumber.minus(legionAtLastUserAction)
  const autoLegionToDisplay = autoLegionProfit.gte(0) ? getBalanceNumber(autoLegionProfit, 18) : 0

  const autoUsdProfit = autoLegionProfit.times(earningTokenPrice)
  const autoUsdToDisplay = autoUsdProfit.gte(0) ? getBalanceNumber(autoUsdProfit, 18) : 0
  return { hasAutoEarnings, autoLegionToDisplay, autoUsdToDisplay }
}

export const getPoolBlockInfo = (pool: DeserializedPool, currentBlock: number) => {
  const { startBlock, endBlock, isFinished } = pool
  const shouldShowBlockCountdown = Boolean(!isFinished && startBlock && endBlock)
  const blocksUntilStart = Math.max(startBlock - currentBlock, 0)
  const blocksRemaining = Math.max(endBlock - currentBlock, 0)
  const hasPoolStarted = blocksUntilStart === 0 && blocksRemaining > 0
  const blocksToDisplay = hasPoolStarted ? blocksRemaining : blocksUntilStart
  return { shouldShowBlockCountdown, blocksUntilStart, blocksRemaining, hasPoolStarted, blocksToDisplay }
}
