const { Transform } = require("stream");

const defaults = {
  headers: false,
  mapHeaders: ({ header }) => header,
  newline: "\n",
  separator: ",",
  skipComments: false,
  //   maxRowBytes: Number.MAX_SAFE_INTEGER,
};

class CsvParser extends Transform {
  constructor(opts = {}) {
    super({ objectMode: true, highWaterMark: 16 });
    const options = { ...defaults, ...opts };

    for (const key of ["newline", "separator"]) {
      [options[key]] = Buffer.from(options[key]);
    }
    this.state = {
      lineNumber: 0,
      previousEnd: 0,
      //   rowLength: 0,
    };

    this._prev = null;
    this.options = options;
  }

  parseLine(buffer, start, end) {
    const { mapHeaders, separator, skipComments } = this.options;

    end--;

    const cells = [];
    let offset = start;

    if (skipComments) {
      const char = typeof skipComments === "string" ? skipComments : "#";
      // Check if line is a comment
      if (buffer[start] === Buffer.from(char)[0]) {
        return;
      }
    }
    for (let i = start; i < end; i++) {
      if (buffer[i] === separator) {
        let value = this.parseValue(buffer, offset, i);
        cells.push(value);
        offset = i + 1;
      }
    }

    if (offset < end) {
      let value = this.parseValue(buffer, offset, end);
      cells.push(value);
    }
    if (this.state.lineNumber == 0) {
      this.headers = cells.map((header, index) =>
        mapHeaders({ header, index })
      );
    }
    this.writeRow(cells);
  }

  parseValue(buffer, start, end) {
    return buffer.toString("utf-8", start, end);
  }

  writeRow(cells) {
    if (this.options.headers) {
      if (this.state.lineNumber > 0) {
        const row = {};
        cells.forEach((cell, index) => {
          row[this.headers[index]] = cell;
        });
        this.push(row);
      }
    } else {
      this.push(cells);
    }
    this.state.lineNumber++;
  }

  _flush(cb) {
    if (!this._prev) return cb();
    this.parseLine(this._prev, this.state.previousEnd, this._prev.length + 1); // plus since online -1s
    cb();
  }

  _transform(data, enc, cb) {
    if (typeof data === "string") {
      data = Buffer.from(data);
    }

    let start = 0;
    let buffer = data;

    if (this._prev) {
      start = this._prev.length;
      buffer = Buffer.concat([this._prev, data]);
      this._prev = null;
    }

    const bufferLength = buffer.length;

    for (let i = start; i < bufferLength; i++) {
      const chr = buffer[i];
      //   this.state.rowLength++;
      //   if (this.state.rowLength > this.options.maxRowBytes) {
      //     return cb(new Error("Row exceeds the maximum size"));
      //   }
      // Parse if reach end of line
      if (chr === this.options.newline) {
        this.parseLine(buffer, this.state.previousEnd, i + 1);
        this.state.previousEnd = i + 1;
        // this.state.rowLength = 0;
      }
    }

    if (this.state.previousEnd === bufferLength) {
      this.state.previousEnd = 0;
      return cb();
    }

    if (bufferLength - this.state.previousEnd < data.length) {
      this._prev = data;
      this.state.previousEnd -= bufferLength - data.length;
      return cb();
    }

    this._prev = buffer;
    cb();
  }
}

module.exports = (opts) => new CsvParser(opts);
