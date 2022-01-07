import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col, Button, Modal, Stack, Form } from 'react-bootstrap'
import { setSolutions } from './solutionsSlice'
import axios from 'axios'


const getSolution = (letters) => {
  return async (dispatch, getState) => {
    const hand = [...letters]
    const board = getState().board
    const res = await axios.post('/api/solve', {board, hand})
    console.log(res)
    if (res.status === 200) {
      dispatch(setSolutions(res.data))
    } else {
      console.log(res)
    }
  }
}

const Hand = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(event)
    console.log(event.target.hand.value)
    dispatch(getSolution(event.target.hand.value))
  }
  return (
    <>
      <h2>Käsi</h2>
      <Form onSubmit={handleSubmit} autocomplete='off'>
        <Stack direction='horizontal' gap={3}>
          <Form.Control type='text' name='hand'/>
          <Button type='submit'>Ratkaise</Button>
        </Stack>
      </Form>
    </>
  )
}

export default Hand