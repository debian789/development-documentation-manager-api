'use strict'

import mongoose from 'mongoose'
let Schema = mongoose.Schema

let CommandSchema = new Schema({
  command: String,
  description: String
})

export default mongoose.model('Command', CommandSchema)
