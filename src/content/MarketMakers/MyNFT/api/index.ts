import { GlobalAPIFetch } from '@app/utils/axios/api/MarketMaker'

export const FetchOwnerNFT = async (address, start, row, setTotalNFT, setOwnerNFT, setOwnerNFTPending) => {
  setOwnerNFTPending(true)
  try {
    await GlobalAPIFetch.OwnerNFT(address, start, row).then(function ({ data }) {
      return setTotalNFT(Number(data.data.total)), setOwnerNFT(data.data.records)
    })
  } catch (e) {
    console.error(e)
  } finally {
    setOwnerNFTPending(false)
  }
}
