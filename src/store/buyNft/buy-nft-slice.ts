import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IDisplayBuy, IDisplayHeaderBuy, IDisplayRarityImage, IDisplayRarityNFT } from './types'

export const buyNFTSlice = createApi({
  reducerPath: 'buyNFTApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.GLOBAL_API,
  }),
  endpoints: (build) => ({
    fetchDisplayHeaderBuy: build.query<IDisplayHeaderBuy, void>({
      query: () => '/displaymm-active',
    }),
    fetchDisplayBuy: build.query<IDisplayBuy, number>({
      query: (batchid) => ({
        url: '/displaymm',
        method: 'POST',
        body: {
          batchid: batchid,
        },
      }),
    }),
  }),
})

export const rarityImageSlice = createApi({
  reducerPath: 'rarityImageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXTERNAL_API_GIC,
  }),
  endpoints: (build) => ({
    fetchDisplayRarityImage: build.query<IDisplayRarityImage, void>({
      query: () => '/api/v2/gic-verse/market/rarities',
    }),
    fetchDisplayRarityNFT: build.query<IDisplayRarityNFT, number>({
      query: (batchid) => `/api/v2/gic-verse/market/batches/${batchid}`,
    }),
  }),
})

export const { useFetchDisplayHeaderBuyQuery, useFetchDisplayBuyQuery } = buyNFTSlice
export const { useFetchDisplayRarityImageQuery, useFetchDisplayRarityNFTQuery } = rarityImageSlice
