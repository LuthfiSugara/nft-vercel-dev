import { createSlice } from '@reduxjs/toolkit'
import marketMakersConfig from '@app/config/constants/marketMakers'
import { MarketMakersState } from '@app/store/typed'
import { fetchMarketMakersAllowance } from './fetchMarketMakersUser'

const initialState: MarketMakersState = {
  data: [...marketMakersConfig],
  userDataLoaded: false,
}

// Thunks
export const fetchMarketMakersUserDataAsync =
  (account: string): any =>
  async (dispatch) => {
    const allowances = await fetchMarketMakersAllowance(account)

    const userData = marketMakersConfig.map((marketMaker) => ({
      mmptId: marketMaker.mmptId,
      allowance: allowances[marketMaker.mmptId],
    }))

    dispatch(setMarketMakersUserData(userData))
  }

export const updateUserAllowance =
  (mmptId: number, account: string): any =>
  async (dispatch) => {
    const allowances = await fetchMarketMakersAllowance(account)
    dispatch(updateMarketMakersUserData({ mmptId, field: 'allowance', value: allowances[mmptId] }))
  }

export const MarketMakersSlice = createSlice({
  name: 'MarketMakers',
  initialState,
  reducers: {
    setMarketMakersUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((marketMaker) => {
        const userMarketMakerData = userData.find((entry) => entry.mmptId === marketMaker.mmptId)
        return { ...marketMaker, userData: userMarketMakerData }
      })
      state.userDataLoaded = true
    },
    updateMarketMakersUserData: (state, action) => {
      const { field, value, mmptId } = action.payload
      const index = state.data.findIndex((p) => p.mmptId === mmptId)

      if (index >= 0) {
        state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
      }
    },
  },
})

// Actions
export const { setMarketMakersUserData, updateMarketMakersUserData } = MarketMakersSlice.actions

export default MarketMakersSlice.reducer
