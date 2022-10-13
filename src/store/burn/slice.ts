import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface BurnState {
  readonly independentField: Field
  readonly typedValue: string
}

export enum Field {
  LIQUIDITY_PERCENT = 'LIQUIDITY_PERCENT',
  LIQUIDITY = 'LIQUIDITY',
  CURRENCY_A = 'CURRENCY_A',
  CURRENCY_B = 'CURRENCY_B',
}

const initialState: BurnState = {
  independentField: Field.LIQUIDITY_PERCENT,
  typedValue: '0',
}

const burnSlice = createSlice({
  name: 'burn',
  initialState,
  reducers: {
    typeInput: (state, { payload: { field, typedValue } }: PayloadAction<{ field: Field; typedValue: string }>) => {
      return {
        ...state,
        independentField: field,
        typedValue,
      }
    },
  },
})

export const { typeInput } = burnSlice.actions

export default burnSlice.reducer
