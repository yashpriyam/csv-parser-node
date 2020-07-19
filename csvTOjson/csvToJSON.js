 // convert csv to json

// console.log(file);
function csvJSON(csvText) {
    let lines = [];
    const linesArray = csvText.split('\n');
    // for trimming and deleting extra space 
    linesArray.forEach(e => {
        const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, ',').trim();
        lines.push(row);
    });
    // for removing empty record
    lines.splice(lines.length - 1, 1);
    const result = [];
    const headers = lines[0].split(",");
    
    for (let i = 1; i < lines.length; i++) {
    
        const obj = {};
        const currentline = lines[i].split(",");
    
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    //return result; //JavaScript object
    // return JSON.stringify(result); //JSON
    return result;
}
    
    // For Reading CSV File
function readCSV(event) {
    const reader = new FileReader();
    reader.readAsText(event.files[0]);
    reader.onload = () => {
        const text = reader.result;
        const csvToJson = csvJSON(text);
        ReadableString(csvToJson)
        console.log(csvToJson);
    };
}


async function getFile(inputString) {
    const fileContent = await fetch(inputString);
    // const jsonData = await fileContent.json();
    return fileContent;
}
getFile('project.csv').then(x => console.log(x))
// readCSV(file)




// export default csvJSON;