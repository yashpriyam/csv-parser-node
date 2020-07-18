const { Readable } = require("stream")

class ReadableString extends Readable {
  constructor (str, encoding) {
    super()
    this._str = str
    this._encoding = encoding
  }

  _read () {
    if (!this.ended) {
      process.nextTick(() => {
        this.push(Buffer.from(this._str, this._encoding))
        this.push(null)
      })
      this.ended = true;
    }
  }
}

module.exports = (str, encoding = "utf8") => new ReadableString(str, encoding);
