'use strict'

import mongoose from 'mongoose'
let Schema = mongoose.Schema

let projectSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: false},
  //subProject: [{type: mongoose.Schema.ObjectId, ref: 'SubProjects', index: true}]
  subProjects: [{
    title: {type: String, required: true},
    body: {type: String, required: true}
  }]

})

export default mongoose.model('Projects', projectSchema)
