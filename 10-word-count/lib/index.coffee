through2 = require 'through2'

isNumber = (char) ->
    !isNaN(char * 1)
    return

isUpper = (char) ->
    upperCaseAlphabet.includes char
    return

isLower = (char) ->
    lowerCaseAlphabet.includes char
    return


module.exports = ->
  words = 0
  lines = 1
  hasNewline = false
  upperCaseAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  lowerCaseAlphabet = 'abcdefghijklmnopqrstuvwxyz'

  transform = (chunk, encoding, cb) ->
    chunkArr = chunk.split('')

    # incrementing lines for every newline char we came across
    chunkArr.forEach (char) ->
      if char == '\n'
        lines++
        hasNewline = true
      return

    # decrementing the last newline char
    if hasNewline
        lines--
        words--
    chunk = chunk.replaceAll('\n', ' ')
    tokens = chunk.split(' ')
    words += tokens.length

    # uncounting words we counted within double quotes
    doubleWordCount = 0
    insideDoubleQuote = false
    chunkArr.forEach (char, index, array) ->
      if char == '"'
        insideDoubleQuote = !insideDoubleQuote
      if insideDoubleQuote and char == ' '
        doubleWordCount++
      return
    words -= doubleWordCount

     # counting words we missed in Camel case
    chunkArr.forEach (char, index) ->
      if isUpper(char) and isLower(chunkArr[index - 1])
        words++
      return

    return cb()

  flush = (cb) ->
    this.push {words, lines}
    this.push null
    return cb()

  return through2.obj transform, flush