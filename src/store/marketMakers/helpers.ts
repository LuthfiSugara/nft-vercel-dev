import BigNumber from 'bignumber.js'
import { DeserializedMarketMaker, SerializedMarketMaker } from '@app/store/typed'
import { deserializeToken } from '@app/store/user/hooks/helpers'
import { BIG_ZERO } from '@app/utils/bigNumber'

type UserData =
  | DeserializedMarketMaker['userData']
  | {
      allowance: number | string
    }

export const transformUserData = (userData: UserData) => {
  return {
    allowance: userData ? new BigNumber(userData.allowance) : BIG_ZERO,
  }
}

export const transformMarketMaker = (marketMaker: SerializedMarketMaker): DeserializedMarketMaker => {
  const { userData, purchasingToken, ...rest } = marketMaker

  return {
    ...rest,
    purchasingToken: deserializeToken(purchasingToken),
    userData: transformUserData(userData),
  }
}
