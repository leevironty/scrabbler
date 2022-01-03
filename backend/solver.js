const DICTIONNARY = require('./wordList').words
// const CHAR_SET = require('./common').letterSet
const pieces = require('./common')
const CHAR_SET = pieces.letterSet


const findEmpty = (row, index, forward=true) => {
  let i = index
  while (i >= 0 && i < row.length) {
    if (row[i] === '') {
      return i
    }
    i += forward ? 1 : -1
  }
}

const getInitialPointers = (row, index) => {
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

const generateRowIndexToPos = (index, horizontal) => {
  return (i) => {
    return {
      row: horizontal ? index : i,
      col: horizontal ? i : index,
      horizontal,
    }
  }
}

const getScore = (row, pointers, substring, rowIndexToPos) => {
  const start = pointers.filter(p => !p.forward)[0].position
  let total = 0
  let wordMultiplier = 1
  for (let i = 0; i < substring.length; i++) {
    if (row[start + 1 + i] === '') {
      total += pieces.letterPoints[substring[i]] * pieces.letterMultiplier(rowIndexToPos(start + i + 1))
      wordMultiplier *= pieces.wordMultiplier(rowIndexToPos(start + i + 1))
    }
  }
  return total * wordMultiplier
}

const getSolutionObject = (row, pointers, rowIndexToPos, substring) => {
  const points = getScore(row, pointers, substring, rowIndexToPos)
  const start = pointers.filter(p => !p.forward)[0].position
  const pos = rowIndexToPos(start + 1)
  return {
    word: substring,
    points: points,
    location: pos,
  }
}

const expandTree = (row, root, hand, constraints, rowIndexToPos) => {
  const innerCache = new Set()
  const inner = (pointers, substring, hand, words) => {
    const cacheKey = `[${[...pointers.map(p => p.position)].sort().reduce((l, r) => l + '/' + r, '')}]${substring}`
    if (innerCache.has(cacheKey)) {
      return []
    } else {
      innerCache.add(cacheKey)
    }
    const solutions = []
    if (words.includes(substring)) {
      solutions.push(getSolutionObject(row, pointers, rowIndexToPos, substring))
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
    const treeRow = row.slice(0, lastRoot - (constraints[lastRoot] ? 0 : 1))
    solutions.push(...expandTree(treeRow, root, hand, constraints, generateRowIndexToPos(index, horizontal)))
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

  return solutions.filter(s => s.points > 0).sort((a, b) => b.points - a.points)
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