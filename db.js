const homedir = require('os').homedir()
const home = process.env.HOME || homedir
const path = require('path')
const fs = require('fs')
const dbPath = path.join(home, '.todo')

module.exports = {
  read(pathUrl = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(pathUrl, { flag: 'a+' }, (err, data) => {
        if (err) return reject(err)
        let list = []
        try {
          list = JSON.parse(data.toString())
        } catch (e) {
          list = []
        }
        resolve(list)
      })
    })
  },
  write(list, pathUrl = dbPath) {
    return new Promise((resolve, reject) => {
      const str = JSON.stringify(list)
      fs.writeFile(pathUrl, str + '\n', (err) => {
        if (err) reject()
        else resolve()
      })
    })
  },
}
