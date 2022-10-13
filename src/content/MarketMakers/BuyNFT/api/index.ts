import { GlobalAPIFetch } from '@app/utils/axios/api/MarketMaker'

export const FetchDisplayHeaderBuy = async (setDisplayHeaderBuy, setDisplayHeaderBuyPending) => {
  setDisplayHeaderBuyPending(true)
  try {
    await GlobalAPIFetch.DisplayHeaderBuy().then(function ({ data }) {
      return setDisplayHeaderBuy(data.data)
    })
  } catch (e) {
    console.error(e)
  } finally {
    setDisplayHeaderBuyPending(false)
  }
}

export const FetchDisplayBuy = async (batch_id, setDisplayBuy, setDisplayBuyPending) => {
  setDisplayBuyPending(true)
  try {
    await GlobalAPIFetch.DisplayBuy(batch_id).then(function ({ data }) {
      return setDisplayBuy(data.data)
    })
  } catch (e) {
    console.error(e)
  } finally {
    setDisplayBuyPending(false)
  }
}

export const FetchGenerateImage = async (nftId) => {
  try {
    await GlobalAPIFetch.GenerateImage(nftId).then((res) => {
      return res
    })
  } catch (e) {
    console.error(e)
  }
}
