import { useActiveWeb3React } from '@app/hooks';
import { useTotalSupplyMM } from '@app/hooks/MarketMaker/useTotalSupplyMM'
import { Button } from '@chakra-ui/react';
import React from 'react'
import useAddMinter from './hooks/useHarvestFarm';

const TotalSupply = () => {
    const { account } = useActiveWeb3React()
    const totalSupply = useTotalSupplyMM();
    const { onReward } = useAddMinter(account)
  return (
    <>
      <div>Total Supply : {totalSupply}</div>
      <Button
          colorScheme="primary" 
          color="white" 
          size="md"
          p="6"
          rounded="2xl"
          onClick={async () => {
              try {
              await onReward()
                console.log('success')
              } catch (e) {
                console.error(e)
              }
          }}
      >
          Add Minter
      </Button>
    </>
  )
}

export default TotalSupply