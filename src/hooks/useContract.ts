import { useMemo } from 'react'

// ABI
import ERC20_ABI from '@app/config/abi/erc20.json'
import ERC20_BYTES32_ABI from '@app/config/abi/erc20-bytes32.json'
import ENS_PUBLIC_RESOLVER_ABI from '@app/config/abi/ens-public-resolver.json'
import ENS_ABI from '@app/config/abi/ens-registrar.json'
import WETH_ABI from '@app/config/abi/weth.json'

import UniswapV2PairABI from '@uniswap/v2-core/build/IUniswapV2Pair.json'

import { getBep20Contract, getLegionContract, getLegionVaultContract, getMarketMakerContract, getMasterchefContract, getSouschefContract } from '../utils/contractHelpers'
import useActiveWeb3React from './useActiveWeb3React'
import { MULTICALL_ABI } from '@app/config/constants/multicall'
import { getContract } from '@app/utils'
import { ChainId, WETH } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { getMulticallAddress } from '../utils/addressHelpers'
import { Contract } from 'ethers'

export const useERC20 = (address: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getBep20Contract(address, library.getSigner()), [address, library])
}

/**
 * Using Contract manually
 */
function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

/**
 * Get The bytes32 token contract for the specified token address
 */
export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

/**
 * Get the pair contract for the specified pair address
 */
export function usePairContract(pairAddress: string, withSignerIfPossible?: boolean) {
  return useContract(pairAddress, UniswapV2PairABI.abi, withSignerIfPossible)
}

/**
 * Get the erc20 default token contract for the specified pair address
 */
export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

/**
 * @param {string | undefined} [address]
 * @param {boolean} [withSignerIfPossible]
 */
export function useENSResolverContract(address?: string | undefined, withSignerIfPossible?: boolean) {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean) {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? WETH[chainId].address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean) {
  const { chainId } = useActiveWeb3React()
  let address
  if (chainId) {
    // eslint-disable-next-line default-case
    switch (chainId) {
      case ChainId.MAINNET:
      case ChainId.TESTNET:
        address = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
        break
    }
  }
  return useContract(address, ENS_ABI, withSignerIfPossible)
}

export function useMulticallContract() {
  return useContract(getMulticallAddress(), MULTICALL_ABI, false)
}

export const useMarketMaker = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getMarketMakerContract(library.getSigner()), [library])
}

export const useMasterchef = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getMasterchefContract(library.getSigner()), [library])
}

export const useLegion = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getLegionContract(library.getSigner()), [library])
}

export const useSousChef = (id) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getSouschefContract(id, library.getSigner()), [id, library])
}

export const useLegionVaultContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getLegionVaultContract(library.getSigner()), [library])
}