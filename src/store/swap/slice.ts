import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SWAP_FIELD } from './actions'

export interface SwapState {
  readonly independentField: SWAP_FIELD
  readonly typedValue: string
  readonly [SWAP_FIELD.INPUT]: {
    readonly currencyId: string | undefined
  }
  readonly [SWAP_FIELD.OUTPUT]: {
    readonly currencyId: string | undefined
  }
  // the typed recipient address or ENS name, or null if swap should go to sender
  readonly recipient: string | null
}

const initialState = {
  typedValue: '',
  independentField: SWAP_FIELD.INPUT,
  recipient: null,
  [SWAP_FIELD.INPUT]: {
    currencyId: '',
  },
  [SWAP_FIELD.OUTPUT]: {
    currencyId: '',
  },
}

const swap = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    replaceSwapState: (
      state,
      {
        payload: { typedValue, recipient, field, inputCurrencyId, outputCurrencyId },
      }: PayloadAction<{
        field: SWAP_FIELD
        typedValue: string
        inputCurrencyId?: string
        outputCurrencyId?: string
        recipient: string | null
      }>
    ) => {
      return {
        ...state,
        [SWAP_FIELD.INPUT]: {
          currencyId: inputCurrencyId,
        },
        [SWAP_FIELD.OUTPUT]: {
          currencyId: outputCurrencyId,
        },
        independentField: field,
        typedValue,
        recipient,
      }
    },
    selectCurrency: (
      state,
      { payload: { currencyId, field } }: PayloadAction<{ currencyId: string; field: SWAP_FIELD }>
    ) => {
      const otherField = field === SWAP_FIELD.INPUT ? SWAP_FIELD.OUTPUT : SWAP_FIELD.INPUT
      if (currencyId === state[otherField].currencyId) {
        // the case where we have to swap the order
        return {
          ...state,
          independentField: state.independentField === SWAP_FIELD.INPUT ? SWAP_FIELD.OUTPUT : SWAP_FIELD.INPUT,
          [field]: { currencyId },
          [otherField]: { currencyId: state[field].currencyId },
        }
      }
      // the normal case
      return {
        ...state,
        [field]: { currencyId },
      }
    },
    switchCurrencies: (state) => {
      return {
        ...state,
        independentField: state.independentField === SWAP_FIELD.INPUT ? SWAP_FIELD.OUTPUT : SWAP_FIELD.INPUT,
        [SWAP_FIELD.INPUT]: { currencyId: state[SWAP_FIELD.OUTPUT].currencyId },
        [SWAP_FIELD.OUTPUT]: { currencyId: state[SWAP_FIELD.INPUT].currencyId },
      }
    },
    typeInput: (
      state,
      { payload: { typedValue, field } }: PayloadAction<{ typedValue: string; field: SWAP_FIELD }>
    ) => {
      return {
        ...state,
        independentField: field,
        typedValue,
      }
    },
    setRecipient: (state, { payload: { recipient } }: PayloadAction<{ recipient: string | null }>) => {
      state.recipient = recipient
    },
  },
})

export const { selectCurrency, replaceSwapState, setRecipient, switchCurrencies, typeInput } = swap.actions

export default swap.reducer
