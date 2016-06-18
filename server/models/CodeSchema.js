'use strict'

var mongoose = require('mongoose')
let Schema = mongoose.Schema
var LenguageSchema = require('server/models/LenguageSchema')

let CodeSchema = new Schema({
  title: String,
  description: String,
  lenguage: {type: Schema.ObjectId, ref: 'LenguageSchema'},
  links: String,
  code: String,
  is_public: Boolean,
  is_edit: Boolean,
  creationDate: {type: Date, default: Date.now}
})

// export default mongoose.model('Code', CodeSchema)
module.exports = mongoose.model('Code', CodeSchema)
