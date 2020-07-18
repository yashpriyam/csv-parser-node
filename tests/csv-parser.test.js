const { parse } = require("../index");

const url = "/Users/harshit.srivastava/Desktop/csv-parser-node/data/sample.csv";
parse(url, {}, (error, data) => {
  console.log(error);
  console.log(data);
});
