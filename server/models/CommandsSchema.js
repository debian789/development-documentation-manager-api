'use strict'
var mongoose = require('mongoose')
var ItemsComandSchema = require('server/models/ItemsCommandSchema')
let Schema = mongoose.Schema

let CommandsSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: false},
  is_edit: {type: Boolean, default: false},
  is_public: {type: Boolean, default: false},
  dateCreate: {type: Date, default: Date.now},
  user: {type: Schema.ObjectId, ref:'User'},
  ItemsCommand: [{type: Schema.ObjectId, ref: 'ItemsComandSchema'}]
})

module.exports = mongoose.model('Commands', CommandsSchema)
