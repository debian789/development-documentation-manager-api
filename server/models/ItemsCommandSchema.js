'use strict'

var mongoose = require('mongoose')
let Schema = mongoose.Schema

let ItemsCommandSchema = new Schema({
  command: {type:String, required: true},
  description: {type: String, required: false}
})

module.exports = mongoose.model('ItemsCommand', ItemsCommandSchema)
