'use strict'
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_Conection ? process.env.DB_Conection : 'mongodb://localhost/librarycode')

module.exports = mongoose
