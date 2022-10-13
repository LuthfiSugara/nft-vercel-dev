import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum CURRENCY_FIELD {
  CURRENCY_A = 'CURRENCY_A',
  CURRENCY_B = 'CURRENCY_B',
}

interface MintState {
  readonly independentField: CURRENCY_FIELD
  readonly typedValue: string
  readonly otherTypedValue: string // for the case when there's no liquidity
}

const initialState: MintState = {
  independentField: CURRENCY_FIELD.CURRENCY_A,
  typedValue: '',
  otherTypedValue: '',
}

const mintSlice = createSlice({
  name: 'mint',
  initialState,
  reducers: {
    resetMintState: () => initialState,
    typeInput: (
      state,
      {
        payload: { field, typedValue, noLiquidity },
      }: PayloadAction<{ field: CURRENCY_FIELD; typedValue: string; noLiquidity: boolean }>
    ) => {
      if (noLiquidity) {
        // they're typing into the field they've last typed in
        if (field === state.independentField) {
          return {
            ...state,
            independentField: field,
            typedValue,
          }
        }
        // they're typing into a new field, store the other value

        return {
          ...state,
          independentField: field,
          typedValue,
          otherTypedValue: state.typedValue,
        }
      }
      return {
        ...state,
        independentField: field,
        typedValue,
        otherTypedValue: '',
      }
    },
  },
})

export const { resetMintState, typeInput } = mintSlice.actions

export default mintSlice.reducer
