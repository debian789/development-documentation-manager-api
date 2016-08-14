'use strict'

var mongoose = require('mongoose')
let Schema = mongoose.Schema

let LenguageSchema = new Schema({
  name: {type: String, required: true}
})

module.exports = mongoose.model('Lenguage', LenguageSchema)
