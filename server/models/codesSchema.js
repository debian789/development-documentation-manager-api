'use strict'

import mongoose from 'mongoose'
let Schema = mongoose.Schema
// const LenguageSchema = require('server/models/LenguageSchema')

let codesSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: false},
  // lenguage: {type: Schema.ObjectId, ref: 'LenguageSchema'},
  //links: String,
  code: {type: String, required: true},
  is_public: {type: Boolean, default: false}, // true lo pueden visualizar los otros usuarios
  is_edit: {type: Boolean, default: false}, // si otras personas pueden editar el codigo
  createAt: {type: Date, default: Date.now}
  //user: {type: Schema.ObjectId, ref: 'User'}
})

export default mongoose.model('Codes', codesSchema)
