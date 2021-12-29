const wordList = [
  'kissa',
  'kala',
  'kana',
  'kalakukko',
  'kissakala',
]

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

const letterSet = Object.keys(letterPoints)

export {letterPoints, letterSet, wordList}