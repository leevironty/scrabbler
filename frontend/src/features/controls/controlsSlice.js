import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  horizontal: true,
  pos: {
    row: 0,
    col: 0,
  }
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
      state.pos = action.payload
    },
    moveForward: (state) => {
      if (state.horizontal) {
        state.pos.col += 1
      } else {
        state.pos.row += 1
      }
    },
    moveBackwards: (state) => {
      if (state.horizontal) {
        state.pos.col -= 1
      } else {
        state.pos.row -= 1
      }
    }
  }
})

export const {toggleDir, newPos, moveForward, moveBackwards} = controlSlice.actions
export default controlSlice.reducer