'use strict'

var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')
let Schema = mongoose.Schema

let UserSchema = new Schema({
  username: String,
  salt: String,
  password: {
    type: String,
    validate: [
      (password) => {
        return password && password.length > 6
      }, 'La contraseña debe ser mas larga'
    ]
  },
  email: String,
  is_active: Boolean, // activado o deactivado, para controlar el ingreso
  is_administrador: Boolean, // Conseder permisos de super administrador
  is_staff: Boolean // Permite ingresar al panel administrativo avanzado
})

UserSchema.plugin(passportLocalMongoose)

// export default mongoose.model('User', UserSchema)
// mongoose.model('User', UserSchema)
module.exports = mongoose.model('User', UserSchema)
