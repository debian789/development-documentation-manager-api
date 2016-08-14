'use strict'
import mongoose from 'mongoose'
let Schema = mongoose.Schema

let NoteSchema = new Schema({
  title: {type: String, required: true},
  text: String,
  checklist: [{type: String}],
  is_public: {type: Boolean, default: false},
  is_edit: {type: Boolean, default: false}
})

module.exports =  mongoose.model('Note', NoteSchema)
