import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = { currentBlock: 0, initialBlock: 0 }

export const blockSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    setBlock: (state, { payload }: PayloadAction<number>) => {
      if (state.initialBlock === 0) {
        state.initialBlock = payload
      }
      state.currentBlock = payload
    },
  },
})

// Actions
export const { setBlock } = blockSlice.actions

export default blockSlice.reducer
