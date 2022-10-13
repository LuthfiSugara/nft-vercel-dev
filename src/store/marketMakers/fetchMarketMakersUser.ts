import marketMakersConfig from '@app/config/constants/marketMakers'
import erc20ABI from '@app/config/abi/erc20.json'
import multicall from '@app/utils/multicall'
import { getAddress } from '@app/utils/addressHelpers'
import BigNumber from 'bignumber.js'

// BNB marketMakers use the native BNB token (wrapping ? unwrapping is done at the contract level)
const nonBnbMarketMakers = marketMakersConfig.filter((marketMaker) => marketMaker.purchasingToken.symbol !== 'BNB')

export const fetchMarketMakersAllowance = async (account) => {
  const calls = nonBnbMarketMakers.map((marketMaker) => ({
    address: marketMaker.purchasingToken.address,
    name: 'allowance',
    params: [account, getAddress(marketMaker.contractAddress)],
  }))

  const allowances = await multicall(erc20ABI, calls)
  return nonBnbMarketMakers.reduce(
    (acc, marketMaker, index) => ({ ...acc, [marketMaker.mmptId]: new BigNumber(allowances[index]).toJSON() }),
    {}
  )
}
