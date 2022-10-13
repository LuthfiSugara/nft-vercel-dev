import { useCallback } from 'react'
import { useMasterchef } from '@app/hooks'
import { stakeFarm } from '@app/utils/calls'

const useStakeFarms = (pid: number) => {
  const masterChefContract = useMasterchef()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stakeFarm(masterChefContract, pid, amount)
      console.info(txHash)
    },
    [masterChefContract, pid],
  )

  return { onStake: handleStake }
}

export default useStakeFarms
