const fs = require("fs");
const ReadableString = require("./parser/utils/ReadableString");
// var str = require('string-to-stream')

const csv = require("./parser/csv-parser");

exports.parse = (url, options = {}, cb) => {
  let results = [];
  let ReadStream;
  if(fs.existsSync(url)){
    ReadStream = fs.createReadStream(url)
  }else{
    ReadStream = ReadableString(url)
  }
  ReadStream
    .pipe(csv(options))
    .on("data", (data) => results.push(data))
    .on("end", () => {
      cb(null, results);
    })
    .on("error", (error) => cb(error, null));
};
