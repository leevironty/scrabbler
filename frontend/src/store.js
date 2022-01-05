import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './features/board/boardSlice'
import handReducer from './features/hand/handSlice'
import controlsReducer from './features/controls/controlsSlice'
import solutiosReducer from './features/solve/solutionsSlice'

export default configureStore({
  reducer: {
    board: boardReducer,
    hand: handReducer,
    control: controlsReducer,
    solutions: solutiosReducer,
  },
})
