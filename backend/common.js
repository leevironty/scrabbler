const letterPoints = {
  'a': 1,
  'b': 8,
  'c': 10,
  'd': 7,
  'e': 1,
  'f': 8,
  'g': 8,
  'h': 4,
  'i': 1,
  'j': 4,
  'k': 2,
  'l': 2,
  'm': 3,
  'n': 1,
  'o': 2,
  'p': 4,
  'r': 4,
  's': 1,
  't': 1,
  'u': 3,
  'v': 4,
  'y': 4,
  'ä': 2,
  'ö': 7,
}

const letterCounts = {
  'a': 10,
  'b': 1,
  'c': 1,
  'd': 1,
  'e': 8,
  'f': 1,
  'g': 1,
  'h': 2,
  'i': 10,
  'j': 2,
  'k': 5,
  'l': 5,
  'm': 3,
  'n': 9,
  'o': 5,
  'p': 2,
  'r': 2,
  's': 7,
  't': 9,
  'u': 4,
  'v': 2,
  'y': 2,
  'ä': 5,
  'ö': 1,
}

const multiplierBoard = [
  [
    'e', '',  '',  'f', '', '',
    '',  'e', '',  '',  '', 'f',
    '',  '',  'e'
  ],
  [
    '', 'r', '', '',  '', 'd',
    '', '',  '', 'd', '', '',
    '', 'r', ''
  ],
  [
    '',  '', 'r', '', '', '',
    'f', '', 'f', '', '', '',
    'r', '', ''
  ],
  [
    'f', '',  '',  'r', '', '',
    '',  'f', '',  '',  '', 'r',
    '',  '',  'f'
  ],
  [
    '', '', '', '', 'r', '',
    '', '', '', '', 'r', '',
    '', '', ''
  ],
  [
    '', 'd', '', '',  '', 'd',
    '', '',  '', 'd', '', '',
    '', 'd', ''
  ],
  [
    '',  '', 'f', '', '', '',
    'f', '', 'f', '', '', '',
    'f', '', ''
  ],
  [
    'e', '',  '',  'f', '', '',
    '',  'r', '',  '',  '', 'f',
    '',  '',  'e'
  ],
  [
    '',  '', 'f', '', '', '',
    'f', '', 'f', '', '', '',
    'f', '', ''
  ],
  [
    '', 'd', '', '',  '', 'd',
    '', '',  '', 'd', '', '',
    '', 'd', ''
  ],
  [
    '', '', '', '', 'r', '',
    '', '', '', '', 'r', '',
    '', '', ''
  ],
  [
    'f', '',  '',  'r', '', '',
    '',  'f', '',  '',  '', 'r',
    '',  '',  'f'
  ],
  [
    '',  '', 'r', '', '', '',
    'f', '', 'f', '', '', '',
    'r', '', ''
  ],
  [
    '', 'r', '', '',  '', 'd',
    '', '',  '', 'd', '', '',
    '', 'r', ''
  ],
  [
    'e', '',  '',  'f', '', '',
    '',  'e', '',  '',  '', 'f',
    '',  '',  'e'
  ]
]

const letterMultiplier = ({row, col}) => {
  const letter = multiplierBoard[row][col]
  switch (letter) {
    case 'd':
      return 3
    case 'f':
      return 2
    default:
      return 1
  }
}

const wordMultiplier = ({row, col}) => {
  const letter = multiplierBoard[row][col]
  switch (letter) {
    case 'e':
      return 3
    case 'r':
      return 2
    default:
      return 1
  }
}

const letterSet = Object.keys(letterPoints)

module.exports = {letterPoints, letterCounts, letterSet, letterMultiplier, wordMultiplier}