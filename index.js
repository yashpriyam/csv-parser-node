const fs = require("fs");
const ReadableString = require("./parser/utils/ReadableString");
const csvParse = require("./parser/csv-parser");


exports.parse = async (input, options = {}, cb) => {
  let results = [];
  let ReadStream;
  if (fs.existsSync(input)) {
    ReadStream = fs.createReadStream(input);
  } else {
    ReadStream = ReadableString(input);
  }
  return new Promise((resolve, reject) => {
    ReadStream.pipe(csvParse(options))
      .on("data", (data) => results.push(data))
      .on("end", () => {
        if (typeof cb == "undefined") {
          resolve(results);
        } else {
          cb(null, results);
        }
      })
      .on("error", (error) => {
        if (typeof cb == "undefined") {
          reject(error);
        } else {
          cb(error, null);
        }
      });
  });
};

exports.toJson = async (input, options = {}, cb) => {
  let results = [];
  let ReadStream;
  if (fs.existsSync(input)) {
    ReadStream = fs.createReadStream(input);
  } else {
    ReadStream = ReadableString(input);
  }
  return new Promise((resolve, reject) => {
    ReadStream.pipe(csvParse(options))
      .on("data", (data) => results.push(data))
      .on("end", () => {
        results = JSON.stringify(results);
        if (typeof cb == "undefined") {
          resolve(results);
        } else {
          cb(null, results);
        }
      })
      .on("error", (error) => {
        if (typeof cb == "undefined") {
          reject(error);
        } else {
          cb(error, null);
        }
      });
  });
};