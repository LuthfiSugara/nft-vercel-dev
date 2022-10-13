import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IDashboardData {
  nft_minted: number
  total_profit: number
  total_marketmaker: number
}

interface IDashboard {
  status: string
  message: string
  data: IDashboardData
}

export const dashboardSlice = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.GLOBAL_API,
  }),
  endpoints: (build) => ({
    fetchDashboard: build.query<IDashboard, void>({
      query: () => '/dashboard',
    }),
  }),
})

export const { useFetchDashboardQuery } = dashboardSlice
