import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const solutionsSlice = createSlice({
  name: 'solution',
  initialState,
  reducers: {
    setSolutions: (state, action) => {
      return action.payload
    },
    clearSolutions: (state) => {
      state = initialState
    }
  }
})

export const { setSolutions, clearSolutions } = solutionsSlice.actions
export default solutionsSlice.reducer