import { useSingleCallResult } from '@app/store/multicall/hooks'
import { BigNumber } from 'ethers'
import { useMulticallContract } from './useContract'

export default function useCurrentBlockTimestamp(): BigNumber | undefined {
  const multicall = useMulticallContract()
  return useSingleCallResult(multicall, 'getCurrentBlockTimestamp')?.result?.[0]
}
