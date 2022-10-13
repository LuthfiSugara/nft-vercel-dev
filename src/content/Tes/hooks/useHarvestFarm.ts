import { useMarketMaker } from '@app/hooks'
import { addMinter } from '@app/utils/calls/MarketMaker/addMinter'
import { useCallback } from 'react'
// import { addMinter } from 'utils/calls'
// import { useMarketMaker } from 'hooks/useContract'

const useAddMinter = (address) => {
  const marketMakerContract = useMarketMaker()

  const handleHarvest = useCallback(async () => {
    await addMinter(marketMakerContract, address)
  }, [address, marketMakerContract])

  return { onReward: handleHarvest }
}

export default useAddMinter
