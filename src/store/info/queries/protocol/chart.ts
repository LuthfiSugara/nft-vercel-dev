/* eslint-disable no-await-in-loop */
import { useState, useEffect } from 'react'
import { request, gql } from 'graphql-request'
import { INFO_CLIENT } from '@app/config/constants/endpoints'
import { PCS_V2_START } from '@app/config/constants/info'
import { ChartEntry } from '@app/store/info/types'
import { LegionDayDatasResponse } from '../types'
import { fetchChartData, mapDayData } from '../helpers'

/**
 * Data for displaying Liquidity and Volume charts on Overview page
 */
const LEGION_DAY_DATAS = gql`
  query overviewCharts($startTime: Int!, $skip: Int!) {
    legionDayDatas(first: 1000, skip: $skip, where: { date_gt: $startTime }, orderBy: date, orderDirection: asc) {
      date
      dailyVolumeUSD
      totalLiquidityUSD
    }
  }
`

const getOverviewChartData = async (skip: number): Promise<{ data?: ChartEntry[]; error: boolean }> => {
  try {
    const { legionDayDatas } = await request<LegionDayDatasResponse>(INFO_CLIENT, LEGION_DAY_DATAS, {
      startTime: PCS_V2_START,
      skip,
    })
    const data = legionDayDatas.map(mapDayData)
    return { data, error: false }
  } catch (error) {
    console.error('Failed to fetch overview chart data', error)
    return { error: true }
  }
}

/**
 * Fetch historic chart data
 */
const useFetchGlobalChartData = (): {
  error: boolean
  data: ChartEntry[] | undefined
} => {
  const [overviewChartData, setOverviewChartData] = useState<ChartEntry[] | undefined>()
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      const { data } = await fetchChartData(getOverviewChartData)
      if (data) {
        setOverviewChartData(data)
      } else {
        setError(true)
      }
    }
    if (!overviewChartData && !error) {
      fetch()
    }
  }, [overviewChartData, error])

  return {
    error,
    data: overviewChartData,
  }
}

export default useFetchGlobalChartData
