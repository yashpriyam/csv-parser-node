const { parse, toJson } = require("../index");


let url = "field_1,field_2,field_3\naaa,bbb,ccc\nxxx,yyy,zzz\n";

parse(url, {}, (error, data) => {
  console.log(error);
  console.log(data);
});

url = "/Users/harshit.srivastava/Desktop/csv-parser-node/data/sample.csv";

parse(url, {skipComments: "#", headers: true})
.then(res => console.log(res))
.catch(error => console.log(error))

url = "field_1,field_2,field_3\naaa,bbb,ccc\nxxx,yyy,zzz";

toJson(url, {}, (error, data) => {
  console.log(error);
  console.log(data);
});

url = "/Users/harshit.srivastava/Desktop/csv-parser-node/data/sample2.csv";

toJson(url, {skipComments: "#", headers: true})
.then(res => console.log(res))
.catch(error => console.log(error))

