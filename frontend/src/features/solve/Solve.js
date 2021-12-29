import { useSelector } from 'react-redux'
import axios from 'axios'

const SolveButton = () => {
  const board = useSelector(state => state.board)
  const hand = useSelector(state => state.hand)
  const handleClick = async (event) => {
    console.log('Requesting a solution...')
    // const res = await fetch('http://localhost:3003/api/solve', {
    //   method: 'POST',
    //   mode: 'no-cors',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({board, hand}),
    // })
    const res = await axios.post('/api/solve', {board, hand})
    console.log('response received: ', res)
  }
  return (
    <button onClick={handleClick}>
      Solve!
    </button>
  )
}

export default SolveButton