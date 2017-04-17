'use strict'

import mongoose from 'mongoose'
let Schema = mongoose.Schema

let projectSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: false},
  subProject: [{type: mongoose.Schema.ObjectId, ref: 'SubProjects'}]
})

export default mongoose.model('Projects', projectSchema)
