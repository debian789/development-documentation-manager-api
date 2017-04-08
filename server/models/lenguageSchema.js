'use strict'

import mongoose from 'mongoose'
let Schema = mongoose.Schema

let lenguageSchema = new Schema({
  name: {type: String, required: true}
})

export default mongoose.model('Lenguage', lenguageSchema)
