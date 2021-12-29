const DICTIONNARY = [
  'kissa',
  'kala',
  'koala',
  'koira',
  'kukko',
  'kalakukko',
]

const CHAR_SET = 'abcdefghijklmnopqrstuvwxyzåäö'
const WIDTH = 7

board = Array(WIDTH).fill(Array(WIDTH).fill(''))
const place = (word, pos, dir) => {
  let curPos = pos
  for (const letter of word) {
    board[curPos.x][curPos.y] = letter
    curPos = {
      x: curPos.x + dir.x,
      y: curPos.y + dir.y
    }
  }
}

const findProposals = (word, row) => {
  const proposalOk = (proposal) => {
    for (let i = proposal; i < word.length + proposal; i++) {
      if (row[i] !== '' && row[i] !== word[i - proposal]) {
        return false
      }
    }
    return true
  }
  const solutions = []
  for (let i = 0; i < row.length - word.length; i++) {
    if (proposalOk(i)) {
      solutions.push(i)
    }
  }
  return solutions
}


const initialRow = [...'   a  kukko']
let perumtedRow = [...initialRow]
const letters = [...'kal']

const extractRow = (board, rowNo=null, colNo=null) => {
  console.assert(
    (rowNo !== null && colNo === null) || (rowNo === null && colNo !== null),
    'Vain toisen pitää olla null.'
  )
  if (rowNo !== null && (rowNo < 0 || rowNo >= board.length)) {
     return null
  } else if (colNo < 0 || rowNo >= board[0].length) {
    return null
  }
  const row = (rowNo !== null) ? [...board[rowNo]] : board.map(row => row[colNo])
  return row
}

const findConstraints = (board, point, horizontal) => {
  // etsitään constraintit tyhjälle ruudulle
  console.assert(board[point.row][point.col] === '')
  const row = extractRow(
    board,
    rowNo = horizontal ? point.row : null,
    colNo = horizontal ? null : point.col
  )
  // löydetään ylempi ja alempi pätkä
  const index = horizontal ? point.col : point.row
  let lowerPart = ''
  let pointer = index - 1
  while (pointer > 0 && row[pointer] !== '') {
    lowerPart = row[pointer] + lowerPart
    pointer -= 1
  }
  let upperPart = ''
  pointer = index + 1
  while (pointer < row.lenght && row[pointer] !== '') {
    upperPart = lowerPart + row[pointer]
    pointer += 1
  }
  // regexi näiden pätkien perusteella
  const pattern = new RegExp(`/^${lowerPart}[${[...CHAR_SET].reduce((s, l) => s+'|'+l)}]${upperPart}$/`)
  const smallWordList = DICTIONNARY.filter(w => pattern.test(w))
  const feasible = smallWordList.map(w => w[lowerPart.lenght])
  return feasible
  
}

const findInitialPoints = (board, rowNo=null, colNo=null) => {
  console.assert(
    (rowNo !== null && colNo === null) || (rowNo === null && colNo !== null),
    'Vain toisen pitää olla null.'
  )

  // poimitaan tarkasteltu rivi
  const row = extractRow(board, rowNo, colNo)

  // poimitaan jo populoidut aloituspisteet
  const populatedPoints = []
  let last = ''
  for (let i = 0; i < row.length; i++) {
    if (last === '' && row[i] !== '') {
      populatedPoints.push(i)
    }
    last = row[i]
  }

  // poimitaan populoimattomat aloituspisteet
  const unpopulatedPoints = []
  const upperRow = (rowNo !== null) ? 
    extractRow(board, rowNo + 1, colNo) :
    extractRow(board, rowNo, colNo + 1)
  const lowerRow = (rowNo !== null) ? 
    extractRow(board, rowNo - 1, colNo) :
    extractRow(board, rowNo, colNo - 1)
  for (let i = 0; i < row.length; i++) {
    if (row[i] === '' && ((upperRow !== null && upperRow[i] !== '') || (lowerRow !== null && lowerRow[i] !== ''))) {
      unpopulatedPoints.push(i)
    }
  }
  const constraints = unpopulatedPoints.map(i => findConstraints(
    board,
    {
      row: rowNo !== null ? rowNo : i,
      col: rowNo !== null ? i : colNo
    },
    rowNo !== null
  ))
  return {
    populated: populatedPoints,
    unpopulated: unpopulatedPoints,
    constraints: constraints,
  }
}
module.exports = {findInitialPoints}