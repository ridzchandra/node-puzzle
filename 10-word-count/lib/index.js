const through2 = require("through2")

module.exports = function () {
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

  const transform = function (chunk, encoding, cb) {
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

    return cb()
  }

  const flush = function (cb) {
    this.push({ words, lines })
    this.push(null)
    return cb()
  }

  return through2.obj(transform, flush)
}
