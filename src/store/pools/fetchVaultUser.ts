import BigNumber from 'bignumber.js'
import { getLegionVaultContract } from '@app/utils/contractHelpers'

const legionVaultContract = getLegionVaultContract()

const fetchVaultUser = async (account: string) => {
  try {
    const userContractResponse = await legionVaultContract.userInfo(account)
    return {
      isLoading: false,
      userShares: new BigNumber(userContractResponse.shares.toString()).toJSON(),
      lastDepositedTime: userContractResponse.lastDepositedTime.toString(),
      lastUserActionTime: userContractResponse.lastUserActionTime.toString(),
      legionAtLastUserAction: new BigNumber(userContractResponse.legionAtLastUserAction.toString()).toJSON(),
    }
  } catch (error) {
    return {
      isLoading: true,
      userShares: null,
      lastDepositedTime: null,
      lastUserActionTime: null,
      legionAtLastUserAction: null,
    }
  }
}

export default fetchVaultUser
