'use strict'

var mongoose = require('mongoose')
let Schema = mongoose.Schema
var LenguageSchema = require('server/models/LenguageSchema')

let CodeSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: false},
  lenguage: {type: Schema.ObjectId, ref: 'LenguageSchema'},
  links: String,
  code: {type: String, required: true},
  is_public: {type: Boolean, default: false}, // true lo pueden visualizar los otros usuarios
  is_edit: {type: Boolean, default: false}, // si otras personas pueden editar el codigo
  creationDate: {type: Date, default: Date.now},
  user: {type: Schema.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Code', CodeSchema)
