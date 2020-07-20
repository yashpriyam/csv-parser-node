### csv-parser-node:
**APIs:**
- parse
- toJson
- toCsv

**Example Usage:**
**parse** api
```
const url = "field_1,field_2,field_3\naaa,bbb,ccc\nxxx,yyy,zzz\n";
const options = {headers: true};
const data = await parse(url, options);
console.log(data);
```
> [ 
>   {"field_1": "aaa", "field_2": "bbb", "field_3": "ccc"},
>   {"field_1": "xxx", "field_2": "yyy", "field_3": "zzz"} 
> ]

**toJson** api
```
const url = "field_1,field_2,field_3\naaa,bbb,ccc\nxxx,yyy,zzz\n";
const options = {skipComments: "#", headers: true};
const data = await toJson(url, options);
console.log(data);
```
> [
>         [ 'field_1', 'field_2', 'field_3' ],
>         [ 'aaa', 'bbb', 'ccc' ],
>         [ 'xxx', 'yyy', 'zzz' ]
> ]

**toCsv** api
```
let url = {  
            "employee": {  
                "name":       "sonoo",   
                "salary":      56000,   
                "married":    true  
            }  
        }
let options = {};
const data = await toCsv(url, options);
console.log(data);
```
> name,salary,married
> employee,sonoo,56000,true

**Instructions:**
All three apis accept 3 parameters:
**input**: (type: string (json/csv), default: null, value: string or local file path)
**options**: (type object, default: {}, value: 
-   escape: '"',
-   quote: '"',
-   headers: false,
-   mapHeaders: ({ header }) => header,
-   newline: "\n",
-   separator: ",",
-   skipComments: false,
-   maxRowBytes: Number.MAX_SAFE_INTEGER,

**callback**: (type: function)


How the code works:
[Workflow](https://whimsical.com/GL8tmKg48VHDsQLbCtMKMP)