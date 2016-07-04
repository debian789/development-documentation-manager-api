'use strict'
const mongoose = require('mongoose')
var DB_Conection
console.log(process.env.DB_Conection)
switch (process.env.DB_Conection) {
  case 'production':
    DB_Conection = 'mongodb://localhost/librarycode'
    break
  case 'test':
    DB_Conection = 'mongodb://localhost/test'
    break
  default:
    DB_Conection = 'mongodb://localhost/test'
}

console.log(DB_Conection)
mongoose.connect(DB_Conection)

module.exports = mongoose
