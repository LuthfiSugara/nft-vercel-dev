import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IOwnerNftData {
  total: string | number
  records: any[]
}

interface IOwnerNft {
  status: string
  data: IOwnerNftData
}

interface IOwnerNftParams {
  address: string
  start?: number
  row?: number
}

interface IDisplayClaimAll {
  status: string
  message: string
  data: {
    nftid: number[]
    month: number
    year: number
    detail: any[]
  }
}

interface IDisplayClaimAllParams {
  address: string
  month: number
  year: number
}

export const myNFTSlice = createApi({
  reducerPath: 'myNFTApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.GLOBAL_API,
  }),
  endpoints: (build) => ({
    fetchOwnerNft: build.query<IOwnerNft, IOwnerNftParams>({
      query: ({ address, start = 1, row = 8 }) => `/ownernft/${address}/start/${start}/row/${row}`,
    }),
    fetchDisplayClaimAll: build.query<IDisplayClaimAll, IDisplayClaimAllParams>({
      query: ({ address, month, year }) => ({
        url: '/displayclaimallreward',
        method: 'POST',
        body: {
          address: address,
          month: month,
          year: year,
        },
      }),
    }),
  }),
})

export const { useFetchOwnerNftQuery, useFetchDisplayClaimAllQuery } = myNFTSlice
