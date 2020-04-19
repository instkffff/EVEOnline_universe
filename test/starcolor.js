const parser = require('stellar-classification-parser')
const result = parser.parse('G7 V',true)
const color = result

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('../systemDB/color.json')
const db = low(adapter)

db.defaults({ starinfo: [], count: 0 }).write()

db.get('starinfo').push(color).write()
db.update('count', n=> n+1).write()



console.log(color)
