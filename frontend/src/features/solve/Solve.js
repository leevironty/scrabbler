import { useSelector, useDispatch } from 'react-redux'
import { setSolutions } from './solutionsSlice'
import { Button } from 'bootstrap'
import axios from 'axios'

const getSolution = (data) => {
  return async (dispatch, getState) => {
    const res = await axios.post('/api/solve', data)
    if (res.status === 200) {
      dispatch(setSolutions(res.data))
    } else {
      console.log(res)
    }
  }
}

const SolveButton = () => {
  const dispatch = useDispatch()
  const board = useSelector(state => state.board)
  const hand = useSelector(state => state.hand)
  const handleSubmit = async (event) => {
    dispatch(getSolution({board, hand}))
  }
  return (
    <Button type='submit'>
      Solve!
    </Button>
  )
}

export default SolveButton