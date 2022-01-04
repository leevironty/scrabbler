import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import styles from './board.module.css'
import {place} from './boardSlice'
import {newPos, moveForward, moveBackwards, toggleDir} from '../controls/controlsSlice'
import {letterSet, multiplierBoard} from '../common'

// const Row = ({letters, rowNum}) => {
//   const dispatch = useDispatch()
//   const horizontal = useSelector(state => state.control.horizontal)
//   const active = useSelector(state => state.control.pos)

//   const handleInput = (row, col) => (event) => {
//     // console.log(event)
//     event.preventDefault()
//     let key = event.data.toLowerCase()
//     if (key === ' ') {
//       dispatch(moveForward())
//       // dispatch(toggleDir())
//       return
//     }
//     if (!letterSet.includes(key)) {
//       return
//     }
//     dispatch(place({pos: {row, col}, letter: key}))
//     dispatch(moveForward())
//     event.target.blur()
//   }

//   const handleFocus = (row, col) => (event) => {
//     if (active.row !== row || active.col !== col) {
//       dispatch(newPos({row, col}))
//     }
//   }
//   const handleKeydown = (row, col) => (event) => {
//     // console.log(event)
//     if (event.key === 'Backspace') {
//       dispatch(place({pos: {row, col}, letter: ''}))
//       dispatch(moveBackwards())
//       event.target.blur()
//     } else if (event.key === 'Escape') {
//       event.target.blur()
//     } else if (event.key === 'ArrowRight'){
//       event.preventDefault()
//       dispatch(newPos({row, col: col + 1}))
//       event.target.blur()
//     } else if (event.key === 'ArrowLeft') {
//       event.preventDefault()
//       dispatch(newPos({row, col: col - 1}))
//       event.target.blur()
//     } else if (event.key === 'ArrowUp') {
//       event.preventDefault()
//       dispatch(newPos({row: row - 1, col}))
//       event.target.blur()
//     } else if (event.key === 'ArrowDown') {
//       event.preventDefault()
//       dispatch(newPos({row: row + 1, col}))
//       event.target.blur()
//     } else if (event.key === 'Enter') {
//       event.preventDefault()
//       dispatch(toggleDir())
//     }
//   }
//   useEffect(() => {
//     const el = document.getElementById(styles.activeCell)
//     if (el) {
//       el.focus()
//     }
//   })

//   const getClassName = (index) => {
//     const letterToClassMap = {
//       e: styles.word3x,
//       r: styles.word2x,
//       d: styles.letter3x, 
//       f: styles.letter2x,
//       '': null,
//     }
//     const activePart = (horizontal && active.row === rowNum) || (!horizontal && active.col === index) ? styles.activeRow : null
//     const multiplierPart = letterToClassMap[multiplierBoard[rowNum][index]]
//     return `${activePart} ${multiplierPart} ${styles.letter}`
//   }
//   return (
//     <div>
//       {letters.map((el, index) => 
//         <div className={getClassName(index)}>
//           <input 
//             // className={getClassName(index)}
//             key={index}
//             value={el}
//             onChange={(e)=> undefined}  // tällä vaiennetaan reactin varoitukset
//             onBeforeInput={handleInput(rowNum, index)}
//             onFocus={handleFocus(rowNum, index)}
//             onKeyDown={handleKeydown(rowNum, index)}
//             type='text' 
//             id={(rowNum === active.row && index === active.col) ? styles.activeCell : null}/>
//         </div>
//       )}
//     </div>
//   )
// }

// const Board = () => {
//   const board = useSelector(state => state.board)
//   return (
//     // <div className={styles.board}>
//     //   {board.map((row, index) =>
//     //     <Row rowNum = {index} letters={row} key={index} />
//     //   )}
//     // </div>
//     <div className={styles.board} >
//       {board.map((row, rowNum) => {
//         return row.map((letter, colNum) => {
//           return (
//             <div className={'moi'} >
              
//             </div>
//           )
//         })
//       })}
//     </div>
//   )
// }

const Board2 = () => {
  const dispatch = useDispatch()
  const board = useSelector(state => state.board)
  const horizontal = useSelector(state => state.control.horizontal)
  const active = useSelector(state => state.control.pos)

  const handleInput = (row, col) => (event) => {
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
    if (active.row !== row || active.col !== col) {
      dispatch(newPos({row, col}))
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
        dispatch(place({pos: {row, col}, letter: ''}))
        dispatch(moveBackwards())
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

  useEffect(() => {
    const el = document.getElementById(styles.activeCell)
    if (el) {
      el.focus()
    }
  })

  return (
    <div className={styles.board} >
      {board.map((row, rowNum) => {
        return row.map((letter, colNum) => {
          return (
            <div className={getClassNames(rowNum, colNum)} key={`${rowNum}-${colNum}`} >
              <input 
                id={isActive(rowNum, colNum)}
                value={letter}
                onBeforeInput={handleInput(rowNum, colNum)}
                onFocus={handleFocus(rowNum, colNum)}
                onKeyDown={handleKeydown(rowNum, colNum)}
                type='text'
              />
            </div>
          )
        })
      })}
    </div>
  )
}

export default Board2