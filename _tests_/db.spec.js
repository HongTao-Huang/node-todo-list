const db = require('../db.js')
jest.mock('fs')
const fs = require('fs')

describe('db', () => {
  it('can read', async () => {
    expect(db.read).toBeInstanceOf(Function)
    fs.setReadFileMock('/xxx', null, '[]')
    const list = await db.read('/xxx')
    expect(list).toStrictEqual([])
  })
  it('can write', () => {
    expect(db.write).toBeInstanceOf(Function)
  })
})
