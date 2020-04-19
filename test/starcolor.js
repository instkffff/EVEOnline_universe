const parser = require('stellar-classification-parser')
const result = parser.parse('G7 V',true)
const color = result.data.colour

console.log(color)
