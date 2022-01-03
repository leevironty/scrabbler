import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import styles from './board.module.css'
import {place} from './boardSlice'
import {newPos, moveForward, moveBackwards, toggleDir} from '../controls/controlsSlice'
import {letterSet, multiplierBoard} from '../common'

const Row = ({letters, rowNum}) => {
  const dispatch = useDispatch()
  const horizontal = useSelector(state => state.control.horizontal)
  const active = useSelector(state => state.control.pos)

  const handleInput = (row, col) => (event) => {
    // console.log(event)
    event.preventDefault()
    let key = event.data.toLowerCase()
    if (key === ' ') {
      dispatch(moveForward())
      // dispatch(toggleDir())
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
    if (active.row !== row || active.col !== col) {
      dispatch(newPos({row, col}))
    }
  }
  const handleKeydown = (row, col) => (event) => {
    // console.log(event)
    if (event.key === 'Backspace') {
      dispatch(place({pos: {row, col}, letter: ''}))
      dispatch(moveBackwards())
      event.target.blur()
    } else if (event.key === 'Escape') {
      event.target.blur()
    } else if (event.key === 'ArrowRight'){
      event.preventDefault()
      dispatch(newPos({row, col: col + 1}))
      event.target.blur()
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      dispatch(newPos({row, col: col - 1}))
      event.target.blur()
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      dispatch(newPos({row: row - 1, col}))
      event.target.blur()
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      dispatch(newPos({row: row + 1, col}))
      event.target.blur()
    } else if (event.key === 'Enter') {
      event.preventDefault()
      dispatch(toggleDir())
    }
  }
  useEffect(() => {
    const el = document.getElementById(styles.activeCell)
    if (el) {
      el.focus()
    }
  })

  const getClassName = (index) => {
    const letterToClassMap = {
      e: styles.word3x,
      r: styles.word2x,
      d: styles.letter3x, 
      f: styles.letter2x,
      '': null,
    }
    const activePart = (horizontal && active.row === rowNum) || (!horizontal && active.col === index) ? styles.activeRow : null
    const multiplierPart = letterToClassMap[multiplierBoard[rowNum][index]]
    return `${activePart} ${multiplierPart}`
  }
  return (
    <div>
      {letters.map((el, index) => 
        <input 
          className={getClassName(index)}
          key={index}
          value={el}
          onChange={(e)=> undefined}  // tällä vaiennetaan reactin varoitukset
          onBeforeInput={handleInput(rowNum, index)}
          onFocus={handleFocus(rowNum, index)}
          onKeyDown={handleKeydown(rowNum, index)}
          type='text' 
          id={(rowNum === active.row && index === active.col) ? styles.activeCell : null}/>
      )}
    </div>
  )
}

const Board = () => {
  const board = useSelector(state => state.board)
  return (
    <div className={styles.board}>
      {board.map((row, index) =>
        <Row rowNum = {index} letters={row} key={index} />
      )}
    </div>
  )
}

export default Board