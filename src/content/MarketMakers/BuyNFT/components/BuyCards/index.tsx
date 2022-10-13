import { SimpleGrid } from '@chakra-ui/react'
import BuyCard from './BuyCard'

const BuyCards = ({ displayBuy, marketMaker, account, userDataLoaded }) => {
  return (
    <SimpleGrid columns={[2, 2, 4]} spacing={['3vw', '3vw', '1vw']}>
      {displayBuy.map((item, idx) => {
        return (
          <BuyCard
            key={`displayBuyItem__${idx}`}
            displayBuyItem={item}
            marketMaker={marketMaker}
            account={account}
            userDataLoaded={userDataLoaded}
          />
        )
      })}
    </SimpleGrid>
  )
}

export default BuyCards
