import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const handSlice = createSlice({
  name: 'hand',
  initialState,
  reducers: {
    add: (state, action) => {
      state.push(action.payload)
    },
    set: (state, action) => {
      return action.payload
    },
    reset: (state) => {
      return initialState
    }
  }
})

export const {add, reset, set} = handSlice.actions
export default handSlice.reducer