import { useMasterchef } from '@app/hooks'
import { harvestFarm } from '@app/utils/calls'
import { useCallback } from 'react'
// import { harvestFarm } from 'utils/calls'
// import { useMasterchef } from 'hooks/useContract'

const useHarvestFarm = (farmPid: number) => {
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    await harvestFarm(masterChefContract, farmPid)
  }, [farmPid, masterChefContract])

  return { onReward: handleHarvest }
}

export default useHarvestFarm
