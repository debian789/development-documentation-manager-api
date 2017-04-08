'use strict'

const mongoose = require('mongoose')
let Schema = mongoose.Schema

let lenguageSchema = new Schema({
  name: {type: String, required: true}
})

module.exports = mongoose.model('Lenguage', lenguageSchema)
