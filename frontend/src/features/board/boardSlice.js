import { createSlice } from '@reduxjs/toolkit'

const initialState = Array(15).fill(Array(15).fill(''))

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    place: (state, action) => {
      const {pos, letter} = action.payload
      state[pos.row][pos.col] = letter
    },
    reset: (state) => {
      return initialState
    }
  }
})

export const {place, reset} = boardSlice.actions
export default boardSlice.reducer