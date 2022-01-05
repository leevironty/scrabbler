import { createSlice } from '@reduxjs/toolkit'

const BOARD_SIZE = 15

const initialState = {
  horizontal: true,
  pos: {
    row: 0,
    col: 0,
  }
}

const cap = (n) => {
  return Math.min(Math.max(n, 0), BOARD_SIZE - 1)
}

const controlSlice = createSlice({
  name: 'control',
  initialState,
  reducers: {
    toggleDir: (state) => {
      state.horizontal = !state.horizontal
    },
    newPos: (state, action) => {
      if (state.pos.row === action.payload.row && state.pos.col === action.payload.col) {
        return state
      }
      state.pos = {row: cap(action.payload.row), col: cap(action.payload.col)}
    },
    moveForward: (state) => {
      if (state.horizontal) {
        state.pos.col = cap(state.pos.col + 1)
      } else {
        state.pos.row = cap(state.pos.row + 1)
      }
    },
    moveBackwards: (state) => {
      if (state.horizontal) {
        state.pos.col = cap(state.pos.col - 1)
      } else {
        state.pos.row = cap(state.pos.row - 1)
      }
    }
  }
})

export const {toggleDir, newPos, moveForward, moveBackwards} = controlSlice.actions
export default controlSlice.reducer