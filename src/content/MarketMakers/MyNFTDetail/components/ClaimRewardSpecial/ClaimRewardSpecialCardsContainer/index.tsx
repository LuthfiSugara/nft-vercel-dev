import ClaimRewardSpecialCards from '@app/content/MarketMakers/MyNFTDetail/components/ClaimRewardSpecial/ClaimRewardSpecialCards'

const ClaimRewardSpecialCardsContainer = ({ displayClaimRewardSpecial, idnft, batchid, year, account }) => {
  return (
    <>
      <ClaimRewardSpecialCards
        displayClaimRewardSpecial={displayClaimRewardSpecial}
        idnft={idnft}
        batchid={batchid}
        year={year}
        account={account}
      />
    </>
  )
}

export default ClaimRewardSpecialCardsContainer
