const createWriteStream = require("fs").createWriteStream;
const createReadStream = require("fs").createReadStream;
const Transform = require("stream").Transform;

function jsonToCSV(header, paths) {
  return new Promise(resolve => {
    const read = createReadStream(paths.in, {
      encoding: "utf-8"
    });

    const transform = new Transform();

    transform._transform = (chunk, _, done) => {
      const rows = chunk
        .toString()
        .replace(/("\w{1,}":)|[\r\n\s{[\]]/g, "")
        .replace(/},|}/g, "\n");

      done(null, rows);
    };

    const writer = createWriteStream(paths.out);

    writer.on("open", () => writer.write(header.join(",") + "\n"));
    writer.on("close", () => resolve());

    read.pipe(transform).pipe(writer);
  });
}

const header = []

jsonToCSV(header, {
    in: "./package.json",
    out: "./new.csv"
})
.then(x => console.log(x))
.catch(x => console.log(x))

// module.exports = jsonToCSV;


