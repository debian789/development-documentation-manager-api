'use strict'
var mongoose = require('mongoose')
var ComandSchema = require('server/models/CommandItemSchema')
let Schema = mongoose.Schema

let CommandsSchema = new Schema({
  title: String,
  description: String,
  is_edit: {type: Boolean, default: false},
  is_public: {type: Boolean, default: false},
  dateCreate: {type: Date, default: Date.now},
  user: {type: Schema.ObjectId, ref:'User'},
  commandItems: [{type: Schema.ObjectId, ref: 'ComandItemSchema'}]
})

module.exports = mongoose.model('Commands', CommandsSchema)
