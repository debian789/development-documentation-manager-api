'use strict'

import mongoose from 'mongoose'
// const ItemsComandSchema = require('server/models/ItemsCommandSchema')
let Schema = mongoose.Schema

let commandsSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: false},
  is_edit: {type: Boolean, default: false},
  is_public: {type: Boolean, default: false},
  dateCreate: {type: Date, default: Date.now},
  user: {type: Schema.ObjectId, ref: 'User'},
  // ItemsCommand: [{type: Schema.ObjectId, ref: 'ItemsComandSchema'}]
  itemsCommand: [{
    command: {type: String, required: true},
    description: {type: String, required: false}
  }]
})

export default mongoose.model('Commands', commandsSchema)
