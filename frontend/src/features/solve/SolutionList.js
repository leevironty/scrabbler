import { useSelector, useDispatch } from 'react-redux'

const SolutionList = () => {
  const solutions = useSelector(state => state.solutions)
  return (
    <>
      <h2>Löydetyt sanat</h2>
      <ul>
        {solutions.map(({word, points, location}, index) => 
          <li key={index}>
            {points}: {word} (rivi: {location.row+1}, sarake: {location.col+1}, {location.horizontal ? 'vaaka' : 'pysty'})
          </li>
        )}
      </ul>
    </>
  )
}

export default SolutionList