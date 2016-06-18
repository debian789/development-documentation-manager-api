'use strict'

var mongoose = require('mongoose')
let Schema = mongoose.Schema

let LenguageSchema = new Schema({
  name: String
})

//export default mongoose.model('Lenguage', LenguageSchema)
module.exports = mongoose.model('Lenguage', LenguageSchema)
