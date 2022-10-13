import { DEFAULT_GAS_LIMIT } from '@app/config'
import getGasPrice from '@app/utils/getGasPrice'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const addMinter = async (marketMakerContract, address) => {
  const gasPrice = getGasPrice()

  const tx = await marketMakerContract.addMinter(address, { ...options, gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}
