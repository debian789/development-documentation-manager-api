'use strict'

const mongoose = require('mongoose')
let dbConection
console.log(process.env.DB_Conection)
switch (process.env.DB_Conection) {
  case 'production':
    dbConection = 'mongodb://localhost/librarycode'
    break
  case 'test':
    dbConection = 'mongodb://localhost/test'
    break
  default:
    dbConection = 'mongodb://localhost/test'
}

console.log(dbConection)
mongoose.connect(dbConection)

module.exports = mongoose
