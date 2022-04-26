const fs = require("fs")
const input = fs.createReadStream(__dirname + "/../data/geo.txt", "utf8")
const readline = require("readline")
const rl = readline.createInterface({
  input: input,
  terminal: false,
})

exports.countryIpCounter = function (countryCode, cb) {
  if (!countryCode) {
    return cb()
  }
  let counter = 0

  return rl
    .on("line", function (line) {
      if (line) {
        line = line.split("\t")
        // GEO_FIELD_MIN, GEO_FIELD_MAX, GEO_FIELD_COUNTRY
        // line[0],       line[1],       line[3]

        if (line[3] === countryCode) {
          counter += +line[1] - +line[0]
        }
      }
    })
    .on("close", function () {
      return cb(null, counter)
    })
}

let countryCode = "RU"
let counter = 0

let count = rl.on("line", function (line) {
  // if (err) {
  //   console.log(err)
  // }

  // data = data.toString().split("\n")

  if (line) {
    line = line.split("\t")
    // GEO_FIELD_MIN, GEO_FIELD_MAX, GEO_FIELD_COUNTRY
    // line[0],       line[1],       line[3]

    if (line[3] === countryCode) {
      counter += +line[1] - +line[0]
    }
  }

  // console.log(
  //   Array.from(data).reduce(function (prev, curr) {
  //     curr = curr.split("\t")
  //     if (curr[3] === countryCode) {
  //       return prev + +curr[1] - +curr[0]
  //     } else {
  //       return prev
  //     }
  //   }, 0)
  // )
})
