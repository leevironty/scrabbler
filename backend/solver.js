const DICTIONNARY = require('./wordList').words

const CHAR_SET = require('./common').letterSet


// const findProposals = (word, row) => {
//   const proposalOk = (proposal) => {
//     for (let i = proposal; i < word.length + proposal; i++) {
//       if (row[i] !== '' && row[i] !== word[i - proposal]) {
//         return false
//       }
//     }
//     return true
//   }
//   const solutions = []
//   for (let i = 0; i < row.length - word.length; i++) {
//     if (proposalOk(i)) {
//       solutions.push(i)
//     }
//   }
//   return solutions
// }


// const initialRow = [...'   a  kukko']
// let perumtedRow = [...initialRow]
// const letters = [...'kal']

// const extractRow = (board, rowNo=null, colNo=null) => {
//   console.assert(
//     (rowNo !== null && colNo === null) || (rowNo === null && colNo !== null),
//     'Vain toisen pitää olla null.'
//   )
//   if (rowNo !== null && (rowNo < 0 || rowNo >= board.length)) {
//      return null
//   } else if (colNo < 0 || rowNo >= board[0].length) {
//     return null
//   }
//   const row = (rowNo !== null) ? [...board[rowNo]] : board.map(row => row[colNo])
//   return row
// }

// const findConstraints = (board, point, horizontal) => {
//   // etsitään constraintit tyhjälle ruudulle
//   console.log('Finding constraints')
//   console.assert(board[point.row][point.col] === '')
//   const row = extractRow(
//     board,
//     rowNo = !horizontal ? point.row : null,
//     colNo = !horizontal ? null : point.col
//   )
//   // löydetään ylempi ja alempi pätkä
//   const index = !horizontal ? point.col : point.row
//   let lowerPart = ''
//   let pointer = index - 1
//   while (pointer >= 0 && row[pointer] !== '') {
//     lowerPart = row[pointer] + lowerPart
//     pointer -= 1
//   }
//   let upperPart = ''
//   pointer = index + 1
//   while (pointer < row.length && row[pointer] !== '') {
//     // console.log('Searching upper part: ', {pointer, value: row[pointer]})
//     upperPart = upperPart + row[pointer]
//     pointer += 1
//   }
//   // regexi näiden pätkien perusteella
//   const pattern = new RegExp(`^${lowerPart}[${[...CHAR_SET].reduce((s, l) => s+'|'+l)}]${upperPart}$`)
//   const smallWordList = DICTIONNARY.filter(w => pattern.test(w))
//   const feasible = smallWordList.map(w => w[lowerPart.length])
//   // console.log({point, horizontal, row, upperPart, lowerPart, pattern, smallWordList, feasible})
//   // console.log('row: ', row)
//   // console.log('upper: ', upperPart)
//   // console.log('lower: ', lowerPart)
//   // console.log('pattern: ', String(pattern))
//   return feasible
  
// }

// const findInitialPoints = (board, rowNo=null, colNo=null) => {
//   console.assert(
//     (rowNo !== null && colNo === null) || (rowNo === null && colNo !== null),
//     'Vain toisen pitää olla null.'
//   )

//   // poimitaan tarkasteltu rivi
//   const row = extractRow(board, rowNo, colNo)

//   // poimitaan jo populoidut aloituspisteet
//   const populatedPoints = []
//   let last = ''
//   for (let i = 0; i < row.length; i++) {
//     if (last === '' && row[i] !== '') {
//       populatedPoints.push(i)
//     }
//     last = row[i]
//   }

//   // poimitaan populoimattomat aloituspisteet
//   const unpopulatedPoints = []
//   const upperRow = (rowNo !== null) ? 
//     extractRow(board, rowNo + 1, colNo) :
//     extractRow(board, rowNo, colNo + 1)
//   const lowerRow = (rowNo !== null) ? 
//     extractRow(board, rowNo - 1, colNo) :
//     extractRow(board, rowNo, colNo - 1)
//   for (let i = 0; i < row.length; i++) {
//     if (row[i] === '' && ((upperRow !== null && upperRow[i] !== '') || (lowerRow !== null && lowerRow[i] !== ''))) {
//       unpopulatedPoints.push(i)
//     }
//   }
//   const constraints = unpopulatedPoints.map(i => findConstraints(
//     board,
//     {
//       row: rowNo !== null ? rowNo : i,
//       col: rowNo !== null ? i : colNo
//     },
//     rowNo !== null
//   ))
//   return {
//     populated: populatedPoints,
//     unpopulated: unpopulatedPoints,
//     constraints: constraints,
//   }
// }

const findEmpty = (row, index, forward=true) => {
  let i = index
  while (i >= 0 && i < row.length) {
    if (row[i] === '') {
      return i
    }
    i += forward ? 1 : -1
  }
}

// const findOptions = (row, index) => {
//   const lower = findEmpty(row, index, false)
//   const upper = findEmpty(row, index, true)
//   return [lower, (lower !== upper) ? upper : null]
// }

const getInitialPointers = (row, index) => {
  // const lower = findEmpty(row, index, false)
  // const upper = findEmpty(row, index, true)
  // const pointers = []
  // if (lower) {
  //   pointers.push({
  //     position: lower,
  //     forward: false,
  //   })
  // }
  // if (upper) {
  //   pointers.push({
  //     position: upper,
  //     forward: true,
  //   })
  // }
  const lowerPart = getContinuousString(row, index, false)
  const upperPart = getContinuousString(row, index, true)
  const pointers = [
    {
      position: index - lowerPart.length,
      forward: false,
    },
    {
      position: index + upperPart.length,
      forward: true,
    },
  ]
  return pointers
}

// const permute = (hand, row, populated, unpopulated, constraints) => {
  
// }

// const expand = (row, hand, words, substring, locations, conditions) => {

//   /*
//   Triviaali ratkaisu löydetään, kun etsitään permutaatioita toiseen suuntaan.
//   1. wordList vs substring
//     - jos löytyy eksakti matchi, lisätään se ratkaisuihin
//     - filteröidään substringin mukaan
//     - jos tässä kohtaa on tyhjä sanalista, voidaan palauttaa tyhjä ratkaisulista
//   2. haarautuminen
//     - kullekin lokaatiolle:
//       - lokaatiolle uusi constraintin mukainen kirjain
//       - lokaation päivitys
//       - substring päivitys
//       - käden kirjainten päivitys
//       - löydetyt ratkaisut lisätään ratkaisuihin
//   3. palautetaan kaikki löydetyt ratkaisut
//   */
//  const solutions = []
//   if (words.includes(substring)) {
//     solutions.push(substring)
//   }
//   const filteredWords = words.filter(w => w.includes(substring))
//   if (filteredWords.length === 0) {
//     return solutions
//   }
//   for ([loc, dir] in [[locations[0], -1], [locations[1], 1]]) {
//     let constraint
//     if (conditions.unpopulated.includes(loc)) {
//       constraint = conditions.constraints[conditions.unpopulated.find(loc)]
//     }
//     const setC = new Set(constraint)
//     const feasibleLetters = constraint ? [...new Set(hand)].filter(x => setC.has(x)): hand
//   }
// }

const getRow = (board, index, horizontal) => {
  const row = horizontal ? [...board[index]] : board.map(e => e[index])
  return row
}

const getRows = (board, index, horizontal) => {
  return {
    lower: index - 1 >= 0 ? getRow(board, index - 1, horizontal) : null,
    middle: getRow(board, index, horizontal),
    upper: index + 1 < board.length ? getRow(board, index + 1, horizontal) : null,
  }
}

const getContinuousString = (row, index, forward) => {
  let value = ''
  let i = index
  while (i >= 0 && i < row.length && row[i] !== '') {
    value = forward ? value + row[i] : row[i] + value
    i += forward ? 1 : -1
  }
  return value
}

const getValidLetters = (row, index) => {
  const lowerPart = getContinuousString(row, index - 1, false)
  const upperPart = getContinuousString(row, index + 1, true)
  const charSetPattern = `[${CHAR_SET.reduce((s, l) => s+'|'+l)}]`
  const pattern = new RegExp(`^${lowerPart}${charSetPattern}${upperPart}$`)
  const validWords = DICTIONNARY.filter(word => pattern.test(word))
  const validLetters = new Set(validWords.map(word => word[lowerPart.length]))
  // console.log({row, index, lowerPart, upperPart, validWords})
  return validLetters
}

const getRoots = (board, index, horizontal) => {
  const rows = getRows(board, index, horizontal)
  const roots = []
  const constraints = {}
  let last = ''
  rows.middle.forEach((letter, i) => {
    if (last === '' && letter !== '') {
      roots.push(i)
    } else if (((rows.lower && rows.lower[i] !== '') || (rows.upper && rows.upper[i] !== '')) && letter === '') {
      roots.push(i)
      const perpendicularRow = getRow(board, i, !horizontal)
      constraints[i] = getValidLetters(perpendicularRow, index)
    }
    last = letter
  })
  return { roots, constraints }
}



const expandTree = (row, root, hand, constraints) => {
  const innerCache = new Set()
  const inner = (pointers, substring, hand, words) => {
    // console.log({pointers, substring, hand, words})
    const cacheKey = `[${[...pointers.map(p => p.position)].sort().reduce((l, r) => l + '/' + r, '')}]${substring}`
    if (innerCache.has(cacheKey)) {
      return []
    } else {
      innerCache.add(cacheKey)
    }
    const solutions = []
    if (words.includes(substring)) {
      solutions.push(substring)
    }
    const newWords = words.filter(w => w.includes(substring))
    if (newWords.length === 0) {
      return solutions
    }
    
    for (const pointer of pointers) {
      if (pointer.position < 0 || pointer.position >= row.length) {
        break
      }
      const constraint = constraints[pointer.position]
      const feasibleLetters = constraint ? new Set(hand.filter(el => constraint.has(el))) : new Set(hand)

      const adtString = getContinuousString(
        row,
        pointer.position + (pointer.forward ? 1 : -1),
        pointer.forward,
      )
      const newPointers = pointers.filter(p => p !== pointer)
      newPointers.push({
        position: pointer.position + (pointer.forward ? 1 + adtString.length : -(1 + adtString.length)),
        forward: pointer.forward,
      })

      for (const letter of feasibleLetters) {
        const newSubstring = !pointer.forward ? adtString + letter + substring : substring + letter + adtString
        const newHand = [...hand]
        newHand.splice(newHand.indexOf(letter), 1)
        solutions.push(...inner(
          newPointers,
          newSubstring,
          newHand,
          newWords,
        ))
      }
    }
    return solutions
  }
  /*
  Triviaali ratkaisu löydetään, kun etsitään permutaatioita toiseen suuntaan.
  1. wordList vs substring
    - jos löytyy eksakti matchi, lisätään se ratkaisuihin
    - filteröidään substringin mukaan
    - jos tässä kohtaa on tyhjä sanalista, voidaan palauttaa tyhjä ratkaisulista
  2. haarautuminen
    - kullekin lokaatiolle:
      - lokaatiolle uusi constraintin mukainen kirjain
      - lokaation päivitys
      - substring päivitys
      - käden kirjainten päivitys
      - löydetyt ratkaisut lisätään ratkaisuihin
  3. palautetaan kaikki löydetyt ratkaisut
  */
  const pointers = getInitialPointers(row, root)
  const substring = getContinuousString(row, root, false) + getContinuousString(row, root + 1, true)
  return inner(pointers, substring, hand, DICTIONNARY)
}



const solveRow = (board, index, horizontal, hand) => {
  const { roots, constraints} = getRoots(board, index, horizontal)
  roots.sort().reverse()
  const row = getRow(board, index, horizontal)
  const solutions = []
  let lastRoot = row.length
  roots.forEach(root => {
    const treeRow = row.slice(0, lastRoot)
    solutions.push(...expandTree(treeRow, root, hand, constraints))
    lastRoot = root
  })
  return solutions
}

const solve = (board, hand) => {
  const solutions = []
  for (const horizontal of [true, false]) {
    // assumes square boards
    for (let index = 0; index < board.length; index++) {
      solutions.push(...solveRow(board, index, horizontal, hand))
    }
  }
  return solutions
}
module.exports = { 
  solve,
  solveRow,
  expandTree,
  getRoots,
  getValidLetters,
  getContinuousString,
  getRows,
  getRow,
  getInitialPointers,
  findEmpty,
}