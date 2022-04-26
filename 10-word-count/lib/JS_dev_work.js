let words = 0
let lines = 1
let hasNewline = false
const upperCaseAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowerCaseAlphabet = "abcdefghijklmnopqrstuvwxyz"

function isNumber(char) {
  return !isNaN(char * 1)
}
function isUpper(char) {
  return upperCaseAlphabet.includes(char)
}
function isLower(char) {
  return lowerCaseAlphabet.includes(char)
}

const transform = function (chunk) {
  let chunkArr = chunk.split("")

  // incrementing lines for every newline char we came across
  chunkArr.forEach(function (char) {
    if (char === "\n") {
      lines++
      hasNewline = true
    }
  })
  // decrementing the last newline char
  if (hasNewline) {
    lines--
    words--
  }

  chunk = chunk.replaceAll("\n", " ")
  const tokens = chunk.split(" ")
  words += tokens.length

  // uncounting words we counted within double quotes
  let doubleWordCount = 0
  let insideDoubleQuote = false
  chunkArr.forEach(function (char, index, array) {
    if (char === '"') {
      insideDoubleQuote = !insideDoubleQuote
    }
    if (insideDoubleQuote && char === " ") {
      doubleWordCount++
    }
  })
  words -= doubleWordCount

  // counting words we missed in Camel case
  chunkArr.forEach(function (char, index) {
    if (isUpper(char) && isLower(chunkArr[index - 1])) {
      words++
    }
  })

  console.log(`lines: ${lines}\nwords:${words}`)
}

// line:1 words:9
// transform(`The quick brown fox jumps over the lazy dog
// `)

// line:5 words:9
// transform(`TheQuick
// BrownFox
// jumps
// OverTheLazy
// dog
// `)

// line:3 words:7
transform(`The
"Quick Brown Fox"
jumps over the lazy dog
`)
