const fs = require('fs')
const fxp = require('fast-xml-parser')
const letterData = require('./common')

const data = fs.readFileSync('../sanalista.xml', 'utf8')

const parser = new fxp.XMLParser()
const jsonData = parser.parse(data)
const words = jsonData['kotus-sanalista']['st'].map(o => o.s)

const isValid = (word) => {
  const left = {...letterData.letterCounts}
  for (const l of word) {
    if (left[l] === undefined) {
      return false  // forbidden character
    }
    left[l] -= 1
  }
  const overLimit = Object.values(left).map(n => Math.min(0, n)).reduce((l, r) => l + r)
  if (overLimit < -2) {  // two wildcards in game
    return false
  } else {
    return true
  }
}

const validWords = words.filter(isValid)
console.log(words.length)
console.log(validWords.length)

const fileContent = `const words = ${JSON.stringify(validWords, null, 2)}

module.exports = { words }
`

fs.writeFileSync('wordList.js', fileContent)