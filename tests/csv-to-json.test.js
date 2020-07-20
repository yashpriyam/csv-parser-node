const { toJson } = require("../index");

describe('testing the csv-parser', () => {
  test('type check of the return value of parser', () => {
    let url = "field_1,field_2,field_3\naaa,bbb,ccc\nxxx,yyy,zzz\n";
    let options = {};
    let callback = (error, data) => data;
    let a = toJson(url, options, callback);
    console.log(a.constructor.funtion);
    expect(typeof a).toBe('object');
  });

  test('the data is parsed', done => {
    let url = "field_1,field_2,field_3\naaa,bbb,ccc\nxxx,yyy,zzz\n";
    let options = {};
    function callback(error, data) {
      try {
        let result = JSON.stringify([
          [ 'field_1', 'field_2', 'field_3' ],
          [ 'aaa', 'bbb', 'ccc' ],
          [ 'xxx', 'yyy', 'zzz' ]
        ]);
        expect(data).toStrictEqual(result);
        done();
      } catch (error) {
        done(error);
      }
    }
    toJson(url, options, callback);
  });
  test('the data is parsed, with options to skip comments, using headers', async () => {
    let url = "field_1,field_2,field_3\naaa,bbb,ccc\nxxx,yyy,zzz\n";
    let options = {headers: true};
    const data = await toJson(url, options);
    let result = JSON.stringify([ {"field_1": "aaa", "field_2": "bbb", "field_3": "ccc"},
    {"field_1": "xxx", "field_2": "yyy", "field_3": "zzz"} ])
    expect(data).toStrictEqual(result);
  });
  test('the data is parsed, with options to skip comments, ignoring headers', async () => {
    let url = "field_1,field_2,field_3\naaa,bbb,ccc\nxxx,yyy,zzz\n";
    let options = {headers: false};
    const data = await toJson(url, options);
    let result = JSON.stringify([
      [ 'field_1', 'field_2', 'field_3' ],
      [ 'aaa', 'bbb', 'ccc' ],
      [ 'xxx', 'yyy', 'zzz' ]
    ]);
    expect(data).toStrictEqual(result);
  });
  test('the data is parsed, with options to skip comments, using headers', async () => {
    let url = "/Users/yashpriyam/Downloads/csv-parser-node-master/data/sample.csv";
    let options = {skipComments: "#", headers: true};
    const data = await toJson(url, options);
    let result = JSON.stringify([
      { NAME: 'Daffy Duck', AGE: '24' },
      { NAME: 'Bugs Bunny', AGE: '22' }
    ]);
    expect(data).toStrictEqual(result);
  });
  test('the data is parsed, with options to skip comments, ignoring headers', async () => {
    let url = "/Users/yashpriyam/Downloads/csv-parser-node-master/data/sample.csv";
    let options = {skipComments: "#", headers: false};
    const data = await toJson(url, options);
    let result = JSON.stringify([ [ 'NAME', 'AGE' ], [ 'Daffy Duck', '24' ], [ 'Bugs Bunny', '22' ] ]);
    expect(data).toStrictEqual(result);
  });
});