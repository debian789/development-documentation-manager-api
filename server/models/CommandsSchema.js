'use strict'
import mongoose from 'mongoose'
import ComandSchema from 'server/models/CommandSchema'
let Schema = mongoose.Schema

let CommandsSchema = new Schema({
  title: String,
  description: String,
  is_edit: Boolean,
  dateCreate: {type: Date, default: Date.now},
  commands: [{type: Schema.ObjectId, ref: 'ComandSchema'}]
})

export default mongoose.module('Commands', CommandsSchema)
