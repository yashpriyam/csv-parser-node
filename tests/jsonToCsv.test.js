const { toCsv } = require("../index");

describe('testing the json to csv converter', () => {
    test('the data is parsed, with options for using headers', async () => {
      let url = [  
        {  
            "employee": {  
                "name":       "sonoo",   
                "salary":      56000,   
                "married":    true  
            }  
        }   
    ];
      let options = {};
      const data = await toCsv(url, options);
      expect(data).toStrictEqual();
    });
  });
