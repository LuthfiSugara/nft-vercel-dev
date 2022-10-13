export interface IDisplayHeaderBuyData {
  batch_id: number
  batch_name: string
}

export interface IDisplayHeaderBuy {
  status: string
  message: string
  data: IDisplayHeaderBuyData[]
}

export interface IDisplayBuyData {
  batchid: number
  batchname: string
  mmid: number
  price: number
  interest: number
  max: number
  minted: number
  imageurl: string
  accounttype: number
  accounttypename: string
}

export interface IDisplayBuy {
  status: string
  data: IDisplayBuyData[]
}

export interface IDisplayRarityImageData {
  id: number
  name: string
  image: string
  image_gacha: string
}
export interface IDisplayRarityImage {
  status: string
  data: IDisplayRarityImageData[]
}

export interface IMarketRarity {
  id: number
  name: string
  image: string
  image_gacha: string
}
export interface IBatchDetailImages {
  id: number
  image: string
  market_rarity: IMarketRarity
}

export interface IDisplayRarityNFTData {
  id: number
  name: string
  philosophy: string
  batch_detail_images: IBatchDetailImages[]
}

export interface IDisplayRarityNFT {
  status: string
  data: IDisplayRarityNFTData
}
