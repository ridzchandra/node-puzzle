const fs = require("fs")

let countryCode = "RU"
let count = fs.readFile(
  __dirname + "/../data/geo.txt",
  "utf8",
  function (err, data) {
    if (err) {
      console.log(err)
    }

    data = data.toString().split("\n")

    let counter = 0

    // for (let line of Array.from(data)) {
    //   if (line) {
    //     line = line.split("\t")
    //     // GEO_FIELD_MIN, GEO_FIELD_MAX, GEO_FIELD_COUNTRY
    //     // line[0],       line[1],       line[3]

    //     if (line[3] === countryCode) {
    //       counter += +line[1] - +line[0]
    //     }
    //   }
    // }
    // console.log(counter)

    console.log(
      Array.from(data).reduce(function (prev, curr) {
        // curr = curr.split("\t")
        if (curr.split("\t")[3] === countryCode) {
          return prev + +curr.split("\t")[1] - +curr.split("\t")[0]
        } else {
          return prev
        }
      }, 0)
    )
  }
)
