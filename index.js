const fs = require("fs");
const csv = require("./parser/csv-parser");

exports.parse = (url, options = {}, cb) => {
  let results = [];
  fs.createReadStream(url)
    .pipe(csv(options))
    .on("data", (data) => results.push(data))
    .on("end", () => {
      cb(null, results);
    })
    .on("error", error => cb(error, null));
};
