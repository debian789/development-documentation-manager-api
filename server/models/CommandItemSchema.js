'use strict'

var mongoose = require('mongoose')
let Schema = mongoose.Schema

let CommandItemSchema = new Schema({
  command: String,
  description: String
})

module.exports = mongoose.model('Command', CommandItemSchema)
