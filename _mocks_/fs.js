const fs = jest.genMockFromModule('fs')
const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)
const readMocks = {}

fs.setReadFileMock = (path, err, data) => {
  readMocks[path] = [err, data]
}

fs.readFile = (path, options, callback) => {
  if (!callback) {
    callback = options
  }
  if (readMocks[path]) {
    callback(...readMocks[path])
  } else {
    _fs.readFile(path, options, callback)
  }
}

module.exports = fs
