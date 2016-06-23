'use strict'

var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')
var jsonSelect = require('mongoose-json-select')
var mongooseToken = require('mongoose-token')
var validator = require('validator')
let Schema = mongoose.Schema
let UserSchema = new Schema({
  username: {type: String, required: false},
  salt: String,
  email: String,
  is_active: { type: Boolean, default: false, required: true }, // activado o deactivado, para controlar el ingreso
  is_administrador: { type: Boolean, default: false }, // Conseder permisos de super administrador
  is_staff: {type: Boolean, default: false} // Permite ingresar al panel administrativo avanzado
})

function myPasswordValidator (password, cb) {
  if (!validator.isLength(password, 4, 32)) {
    return cb({code: 400, message: 'Password should be between 4 and 32 chars'})
  }
  return cb(null)
}

UserSchema.plugin(mongooseToken)

UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true,
  passwordValidator: myPasswordValidator
})

UserSchema.plugin(jsonSelect, 'username email')

UserSchema.static('requestActivation', function (id, cb) {
  this.findOne({_id: id}, function (err, user) {
    if (!user || user.is_active) { cb({code: 400, message: 'Can not request activation : Unknown account or account already activated.'}) }
    user.setToken(cb)
  })
})

UserSchema.static('activate', function (id, token, cb) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return cb({code: 400, message: 'Invalid user id'})
  }
  this.getByToken(token, {_id: id, is_active: false})
  .then(function (user) {
    if (!user) {
      return cb({code: 400, message: "Can't activate account : Bad token or account already activated."})
    }
    user.activated = true
    return user.resetToken(cb)
  },
  cb
  )
})

UserSchema.path('email').validate(function (email) {
  var emailRegex = /^([\w-+\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  return emailRegex.test(email) // Assuming email has a text attribute
}, 'Invalid email')

UserSchema.path('username').validate(function (username) {
  return validator.isLength(username, 4, 32)
}, 'Username should be between 4 and 32 chars.')

// export default mongoose.model('User', UserSchema)
// mongoose.model('User', UserSchema)
module.exports = mongoose.model('User', UserSchema)
