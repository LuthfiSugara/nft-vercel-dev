import ClaimRewardCards from '@app/content/MarketMakers/MyNFTDetail/components/ClaimReward/ClaimRewardCards'

const ClaimRewardCardsContainer = ({ displayClaimReward, idnft, mmid, year, account }) => {
  return (
    <>
      <ClaimRewardCards
        displayClaimReward={displayClaimReward}
        idnft={idnft}
        mmid={mmid}
        year={year}
        account={account}
      />
    </>
  )
}

export default ClaimRewardCardsContainer
