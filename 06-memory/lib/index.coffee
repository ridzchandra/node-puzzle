fs = require('fs')
input = fs.createReadStream(__dirname + '/../data/geo.txt', 'utf8')
readline = require('readline')
rl = readline.createInterface(
  input: input
  terminal: false)

exports.countryIpCounter = (countryCode, cb) ->
  if !countryCode
    return cb()
  counter = 0
  rl.on('line', (line) ->
    if line
      line = line.split('\u0009')
      # GEO_FIELD_MIN, GEO_FIELD_MAX, GEO_FIELD_COUNTRY
      # line[0],       line[1],       line[3]
      if line[3] == countryCode
        counter += +line[1] - (+line[0])
    return
  ).on 'close', ->
    cb null, counter