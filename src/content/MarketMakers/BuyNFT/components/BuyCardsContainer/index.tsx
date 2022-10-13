import BuyCards from '../BuyCards'

const BuyCardsContainer = ({ marketMakers, account, userDataLoaded, displayBuy }) => {
  return (
    <>
      {marketMakers.map((marketMaker, idx) => (
        <BuyCards
          key={`${marketMaker.mmptId}-${idx}`}
          displayBuy={displayBuy}
          marketMaker={marketMaker}
          account={account}
          userDataLoaded={userDataLoaded}
        />
      ))}
    </>
  )
}

export default BuyCardsContainer
