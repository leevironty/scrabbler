const express = require('express')
// const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const solver = require('./solver')
const app = express()
const PORT = process.env.PORT || 3003
const HOST = '0.0.0.0'

if (process.env.NODE_ENV === 'docker') {
  app.use(express.static(path.resolve(__dirname, './static')))
} else {
  app.use(express.static(path.resolve(__dirname, '../frontend/build')))
}

app.use(cors())
app.use(express.json(strict=false))
app.post('/api/solve', (req, res) => {
  console.log(req.body)
  const {board, hand} = req.body
  console.assert(board && hand, 'board or hand not present in body')
  res.json(solver.solve(board, hand))
})

app.listen(PORT, HOST, () => {
  console.log(`Listening at http://${HOST}:${PORT}`)
})