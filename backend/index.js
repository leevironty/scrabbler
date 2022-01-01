const express = require('express')
const cors = require('cors')
const solver = require('./solver')
const app = express()
const port = 3003

app.use(cors())
app.use(express.json(strict=false));
app.post('/api/solve', (req, res) => {
  console.log(req.body)
  const {board, hand} = req.body
  console.assert(board && hand, 'board or hand not present in body')
  res.json(solver.solve(board, hand))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})