import { ChainId } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import store from '@app/store'
import { GAS_PRICE_GWEI } from '@app/store/user/hooks/helpers'

/**
 * Function to return gasPrice outwith a react component
 */
const getGasPrice = (): string => {
  const chainId = process.env.CHAIN_ID
  const state = store.getState()
  const userGas = state.user.gasPrice || GAS_PRICE_GWEI.default
  return chainId === ChainId.MAINNET.toString() ? userGas : GAS_PRICE_GWEI.testnet
}

export default getGasPrice
