const { toJson } = require("../index");

describe('testing the csv to json converter', () => {
    test('type check of the return value of converter', () => {
      let url = "field_1,field_2,field_3\naaa,bbb,ccc\nxxx,yyy,zzz\n";
      let options = {};
      let callback = (error, data) => data;
      let a = toJson(url, options, callback);
      console.log(a);
      expect(typeof a).toBe('object');
    });
    test('the csv data is converted to json', done => {
      let url = "field_1,field_2,field_3\naaa,bbb,ccc\nxxx,yyy,zzz\n";
      let options = {};
      function callback(error, data) {
        try {
          expect(data).toStrictEqual([["field_1","field_2","field_3"],["aaa","bbb","ccc"],["xxx","yyy","zzz"]]);
          done();
        } catch (error) {
          done(error);
        }
      }
      toJson(url, options, callback);
    });
    test('the data is parsed, with options for using headers', async () => {
      let url = "field_1,field_2,field_3\naaa,bbb,ccc\nxxx,yyy,zzz\n";
      let options = {headers: true};
      const data = await toJson(url, options);
      expect(data).toStrictEqual([ {"field_1": "aaa", "field_2": "bbb", "field_3": "ccc"},
      {"field_1": "xxx", "field_2": "yyy", "field_3": "zzz"} ]);
    });
    test('the data is parsed, ignoring headers', async () => {
      let url = "field_1,field_2,field_3\naaa,bbb,ccc\nxxx,yyy,zzz\n";
      let options = {headers: false};
      const data = await toJson(url, options);
      expect(data).toStrictEqual([
        [ 'field_1', 'field_2', 'field_3' ],
        [ 'aaa', 'bbb', 'ccc' ],
        [ 'xxx', 'yyy', 'zzz' ]
      ]);
    });
    test('the data is parsed, with options to skip comments, using headers', async () => {
      let url = "/Users/yashpriyam/Downloads/csv-parser-node-master/data/sample.csv";
      let options = {skipComments: "#", headers: true};
      const data = await toJson(url, options);
      expect(data).toStrictEqual([
        { NAME: 'Daffy Duck', AGE: '24' },
        { NAME: 'Bugs Bunny', AGE: '22' }
      ]);
    });
    test('the data is parsed, with options to skip comments, ignoring headers', async () => {
      let url = "/Users/yashpriyam/Downloads/csv-parser-node-master/data/sample.csv";
      let options = {skipComments: "#", headers: false};
      const data = await toJson(url, options);
      expect(data).toStrictEqual([ [ 'NAME', 'AGE' ], [ 'Daffy Duck', '24' ], [ 'Bugs Bunny', '22' ] ]);
    });
  });