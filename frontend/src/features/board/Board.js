import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import styles from './board.module.css'
import {place} from './boardSlice'
import {newPos, moveForward, moveBackwards, toggleDir} from '../controls/controlsSlice'
import {letterSet, multiplierBoard} from '../common'


const setActive = (letter) => {
  return (dispatch, getState) => {
    const pos = getState().control.pos
    dispatch(place({pos, letter}))
  }
}

const Board = () => {
  const dispatch = useDispatch()
  const board = useSelector(state => state.board)
  const horizontal = useSelector(state => state.control.horizontal)
  const active = useSelector(state => state.control.pos)

  const handleInput = (row, col) => (event) => {
    console.log(event)
    event.preventDefault()
    let key = event.data.toLowerCase()
    if (key === ' ') {
      dispatch(moveForward())
      return
    }
    if (!letterSet.includes(key)) {
      return
    }
    dispatch(place({pos: {row, col}, letter: key}))
    dispatch(moveForward())
    event.target.blur()
  }

  const handleFocus = (row, col) => (event) => {
    console.log(event)
    if (active.row !== row || active.col !== col) {
      dispatch(newPos({row, col}))
    }
  }

  const handleClick = (row, col) => (event) => {
    console.log(event)
    if (active.row === row && active.col === col) {
      dispatch(toggleDir())
    }
  }

  const getClassNames = (row, col) => {
    const letterToClassMap = {
      e: styles.word3x,
      r: styles.word2x,
      d: styles.letter3x, 
      f: styles.letter2x,
      '': '',
    }
    const multiplierClass = letterToClassMap[multiplierBoard[row][col]]
    const isActiveRow = !horizontal ? active.col === col : active.row === row
    const activeRowClass = isActiveRow ? styles.activeRow : ''
    return `${multiplierClass} ${activeRowClass} ${styles.letter}`
  }

  const isActive = (row, col) => {
    return active.row === row && active.col === col ? styles.activeCell : ''
  }

  const handleKeydown = (row, col) => (event) => {
    console.log(event)
    const arrowToPos = (arrow) => {
      switch (arrow) {
        case 'ArrowRight':
          return newPos({row, col: col + 1})
        case 'ArrowLeft':
          return newPos({row, col: col - 1})
        case 'ArrowUp':
          return newPos({row: row - 1, col})
        case 'ArrowDown':
          return newPos({row: row + 1, col})
        default:
          console.log('Something went wrong :D')
      }
    }
    switch (event.key) {
      case 'Backspace':
        if (board[row][col] === '') {
          dispatch(moveBackwards())
          dispatch(setActive(''))
        } else {
          dispatch(setActive(''))
        }
        break
      case 'Escape':
        event.target.blur()
        break
      case 'Enter':
        event.preventDefault()
        dispatch(toggleDir())
        break
      default:
        if (event.key.startsWith('Arrow')) {
          event.preventDefault()
          dispatch(arrowToPos(event.key))
          event.target.blur()
        }
    }
  }

  const handleChange = (row, col) => (event) => {
    console.log(event)
    event.preventDefault()
    let key = event.nativeEvent.data.toLowerCase()
    if (key === ' ') {
      dispatch(moveForward())
      return
    }
    if (!letterSet.includes(key)) {
      return
    }
    dispatch(place({pos: {row, col}, letter: key}))
    dispatch(moveForward())
    event.target.blur()
  }

  useEffect(() => {
    const el = document.getElementById(styles.activeCell)
    if (el) {
      el.focus()
    }
  })

  const registerHandlers = (row, col) => {
    return {
      // onBeforeInput: handleInput(row, col),
      onFocus: handleFocus(row, col),
      onMouseDown: handleClick(row, col),
      onKeyDown: handleKeydown(row, col),
      onChange: handleChange(row, col),
    }
  }

  return (
    <div className={styles.board} >
      {board.map((row, rowNum) => {
        return row.map((letter, colNum) => {
          return (
            <div className={getClassNames(rowNum, colNum)} key={`${rowNum}-${colNum}`} >
              <input 
                id={isActive(rowNum, colNum)}
                value={letter.toUpperCase()}
                {...registerHandlers(rowNum, colNum)}
                type='text'
              />
            </div>
          )
        })
      })}
    </div>
  )
}

export default Board