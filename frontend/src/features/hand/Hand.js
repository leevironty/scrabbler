import { useSelector, useDispatch } from 'react-redux'
// import { useEffect } from 'react'
// import styles from './board.module.css'
// import { newPos, moveForward, moveBackwards, toggleDir } from '../controls/controlsSlice'
import { set } from './handSlice'
// import {letterSet} from '../common'

const Hand = () => {
  const dispatch = useDispatch()
  const letters = useSelector(state => state.hand.reduce((a, b) => a + b, ''))
  const handleChange = (event) => {
    dispatch(set([...event.target.value]))
  }
  return (
    <div>
      <h2>Hand</h2>
      <input
        onChange={handleChange}
        value={letters}
        type='text'
      />
    </div>
  )
}

export default Hand

