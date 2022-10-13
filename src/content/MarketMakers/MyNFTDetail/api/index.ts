import { ExternalAPIGicFetch, GlobalAPIFetch } from '@app/utils/axios/api/MarketMaker'

export const FetchMMDetails = async (mmid, setMMDetails, setMMDetailsPending) => {
  setMMDetailsPending(true)
  try {
    await ExternalAPIGicFetch.MMDetails(mmid).then(function ({ data }) {
      return setMMDetails(data.data)
    })
  } catch (e) {
    console.error(e)
  } finally {
    setMMDetailsPending(false)
  }
}

export const FetchMMOpenPositions = async (mmid, setMMOpenPositions, setMMOpenPositionsPending) => {
  setMMOpenPositionsPending(true)
  try {
    await ExternalAPIGicFetch.MMOpenPositions(mmid, 1, 20).then(function ({ data }) {
      return setMMOpenPositions(data.data.records)
    })
  } catch (e) {
    console.error(e)
  } finally {
    setMMOpenPositionsPending(false)
  }
}

export const FetchMMOrderHistories = async (mmid, setMMOrderHistories, setMMOrderHistoriesPending) => {
  setMMOrderHistoriesPending(true)
  try {
    await ExternalAPIGicFetch.MMOrderHistories(mmid, 1, 20).then(function ({ data }) {
      return setMMOrderHistories(data.data.records)
    })
  } catch (e) {
    console.error(e)
  } finally {
    setMMOrderHistoriesPending(false)
  }
}

export const FetchDisplayClaimReward = async (
  nftid,
  mmid,
  year,
  setDisplayClaimReward,
  setDisplayClaimRewardPending
) => {
  try {
    await GlobalAPIFetch.DisplayClaimReward(nftid, mmid, year).then(function ({ data }) {
      return setDisplayClaimReward(data.data.data)
    })
  } catch (e) {
    console.error(e)
  } finally {
    setDisplayClaimRewardPending(false)
  }
}

export const FetchDisplayClaimRewardSpecial = async (
  nftid,
  mmid,
  year,
  setDisplayClaimRewardSpecial,
  setDisplayClaimRewardSpecialPending
) => {
  try {
    await GlobalAPIFetch.DisplayClaimRewardSpecial(nftid, mmid, year).then(function ({ data }) {
      return setDisplayClaimRewardSpecial(data.data.data)
    })
  } catch (e) {
    console.error(e)
  } finally {
    setDisplayClaimRewardSpecialPending(false)
  }
}
