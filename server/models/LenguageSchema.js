'use strict'

var mongoose = require('mongoose')
let Schema = mongoose.Schema

let LenguageSchema = new Schema({
  name: String
})

module.exports = mongoose.model('Lenguage', LenguageSchema)
