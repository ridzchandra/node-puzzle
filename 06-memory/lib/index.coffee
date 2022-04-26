# This one counts but was not able to meet the memory requirements

fs = require('fs')

exports.countryIpCounter = (countryCode, cb) ->
  if !countryCode
    return cb()
  fs.readFile __dirname + '/../data/geo.txt', 'utf8', (err, data) ->
    if err
      return cb(err)
    data = data.toString().split('\n')
    cb null, Array.from(data).reduce(((prev, curr) ->
      if curr.split('\u0009')[3] == countryCode
        prev + +curr.split('\u0009')[1] - (+curr.split('\u0009')[0])
      else
        prev
    ), 0)