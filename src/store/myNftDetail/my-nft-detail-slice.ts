import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IDisplayClaimRewardData {
  year: number
  data: any[]
}

interface IDisplayClaimReward {
  status: string
  message: string
  data: IDisplayClaimRewardData
}

interface IDisplayClaimRewardParams {
  nftid: number
  mmid: number
  year: number
}

interface IDisplayClaimRewardSpecialParams {
  nftid: number
  batchid: number
  year: number
}

interface IMMDetailsData {
  login_number: string
  balance: number
  margin: number
  equity: number
  marginfree: number
  marginlevel: number
  type: string
  leverage: string
  comment: string
  type_id: number
  server_id: number
  server: string
  description: string
  is_pl_disable: boolean
  is_mm_connect_disable: boolean
  mm_connect_status: string
  mm_connect_description: string
  maginlevel: number
  is_mm_connect: boolean
  total_profit: number
  profit: number
}

interface IMMDetails {
  status: string
  data: IMMDetailsData
}

interface IMetadata {
  page: number
  per_page: number
}

interface IMMOrderHistoriesData {
  _metadata: IMetadata
  records: any[]
}

interface IMMOrderHistories {
  status: string
  data: IMMOrderHistoriesData
}

interface IMMOrderHistoriesParams {
  mmid: number
  page: number
  limit: number
}

export interface ISingleOwnerNftDataType {
  id: number
  name: string
}

export interface ISingleOwnerNftDataAttribute {
  trait_type: string
  value: string
}

export interface ISingleOwnerNftData {
  name: string
  image: string
  external_url: string
  batchid: number
  batchname: string
  nftid: number
  mmid: number
  shares: string
  edition: number
  type: ISingleOwnerNftDataType
  accounttype: number
  accounttypename: string
  attributes: ISingleOwnerNftDataAttribute[]
}

export interface ISingleOwnerNft {
  status: string
  message: string
  data: ISingleOwnerNftData
}

export const myNFTClaimSlice = createApi({
  reducerPath: 'myNFTClaimApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.GLOBAL_API,
  }),
  endpoints: (build) => ({
    fetchSingleOwnerNft: build.query<ISingleOwnerNft, number>({
      query: (nftid) => ({
        url: '/singleownernft',
        method: 'POST',
        body: {
          nftid: nftid,
        },
      }),
    }),
    fetchDisplayClaimReward: build.query<IDisplayClaimReward, IDisplayClaimRewardParams>({
      query: ({ nftid, mmid, year }) => ({
        url: '/displayreward',
        method: 'POST',
        body: {
          nftid: nftid,
          mmid: mmid,
          year: year,
        },
      }),
    }),
    fetchDisplayClaimRewardSpecial: build.query<IDisplayClaimReward, IDisplayClaimRewardSpecialParams>({
      query: ({ nftid, batchid, year }) => ({
        url: '/displayrewardspecial',
        method: 'POST',
        body: {
          nftid: nftid,
          batchid: batchid,
          year: year,
        },
      }),
    }),
  }),
})

export const mmDetailsSlice = createApi({
  reducerPath: 'mmDetailsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXTERNAL_API_GIC,
  }),
  endpoints: (build) => ({
    fetchMMDetails: build.query<IMMDetails, number>({
      query: (mmId) => `/api/v1/external/gic-verse/mm/${mmId}`,
    }),
    fetchMMOrderHistories: build.query<IMMOrderHistories, IMMOrderHistoriesParams>({
      query: ({ mmid, page, limit }) => `api/v1/external/gic-verse/mm/${mmid}/histories?page=${page}&limit=${limit}`,
    }),
    fetchMMOpenPositions: build.query<IMMOrderHistories, IMMOrderHistoriesParams>({
      query: ({ mmid, page, limit }) =>
        `api/v1/external/gic-verse/mm/${mmid}/open-positions?page=${page}&limit=${limit}`,
    }),
  }),
})

export const { useFetchSingleOwnerNftQuery, useFetchDisplayClaimRewardQuery, useFetchDisplayClaimRewardSpecialQuery } =
  myNFTClaimSlice
export const { useFetchMMDetailsQuery, useFetchMMOrderHistoriesQuery, useFetchMMOpenPositionsQuery } = mmDetailsSlice
