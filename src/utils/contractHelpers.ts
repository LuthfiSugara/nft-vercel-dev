import { ethers } from 'ethers'

import tokens from '@app/config/constants/tokens'
import { simpleRpcProvider } from './providers'
import { poolsConfig } from '@app/config/constants'
import { PoolCategory } from '@app/config/constants/types'

// ABIS
import bep20Abi from '@app/config/abi/erc20.json'
import legionAbi from '@app/config/abi/legion.json'
import MultiCallAbi from '@app/config/abi/Multicall.json'
// import marketMaker from '@app/config/abi/marketMaker.json'
import marketMaker from '@app/config/abi/MarketplaceNFT_ABIV1.5.json'
import masterChef from '@app/config/abi/masterchef.json'
import sousChefV2 from '@app/config/abi/sousChefV2.json'
import legionVaultAbi from '@app/config/abi/legionVault.json'
import sousChefBnb from '@app/config/abi/sousChefBnb.json'
import sousChef from '@app/config/abi/sousChef.json'

// Addresses
import {
  getAddress,
  getMarketMakerAddress,
  getMasterChefAddress,
  getMulticallAddress,
  getLegionVaultAddress,
} from './addressHelpers'

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getLegionContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(legionAbi, tokens.legion.address, signer)
}

export const getBep20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bep20Abi, address, signer)
}

export const getMulticallContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer)
}

export const getMarketMakerContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(marketMaker, getMarketMakerAddress(), signer)
}

export const getMasterchefContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(masterChef, getMasterChefAddress(), signer)
}

export const getSouschefContract = (id: number, signer?: ethers.Signer | ethers.providers.Provider) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const abi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  return getContract(abi, getAddress(config.contractAddress), signer)
}

export const getSouschefV2Contract = (id: number, signer?: ethers.Signer | ethers.providers.Provider) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  return getContract(sousChefV2, getAddress(config.contractAddress), signer)
}

export const getLegionVaultContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(legionVaultAbi, getLegionVaultAddress(), signer)
}
