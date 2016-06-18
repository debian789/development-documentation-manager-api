'use strict'
import mongoose from 'mongoose'
let Schema = mongoose.Schema

let NoteSchema = new Schema({
  title: String,
  text: String,
  checklist: [{type: String}],
  is_public: Boolean,
  is_edit: Boolean
})

export default mongoose.model('Note', NoteSchema)
