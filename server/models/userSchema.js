'use strict'

import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
import jsonSelect from 'mongoose-json-select'
import mongooseToken from 'mongoose-token'
import validator from 'validator'

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: false
  },
  activated: {
    type: Boolean,
    required: true,
    default: true
  },
  // password: { type: String, required: true},
  is_active: {
    type: Boolean,
    default: false,
    required: true
  }, // activado o deactivado, para controlar el ingreso
  is_administrador: {
    type: Boolean,
    default: false
  }, // Conseder permisos de super administrador
  is_staff: {
    type: Boolean,
    default: false
  } // Permite ingresar al panel administrativo avanzado
})

function myPasswordValidator (password, cb) {
  if (!validator.isLength(password, 4, 32)) {
    return cb({
      code: 400,
      message: 'Password should be between 4 and 32 chars'
    })
  }
  return cb(null)
}

userSchema.plugin(mongooseToken)

/* Will create schema fields : email, hash (password), salt (password) */
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true,
  passwordValidator: myPasswordValidator
})

/* Another cool plugin that controls JSON deserialization */
userSchema.plugin(jsonSelect, 'username email')

userSchema.static('requestActivation', function (id, cb) {
  this.findById(id, function (err, user) {
    if (err) {
      return cb({
        code: 400,
        message: 'Cant request activation : Unknown account or account already activated.'
      })
    } else {
      return user.setToken(cb)
    }
  })
})

userSchema.static('activate', function (id, token, cb) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return cb({
      code: 400,
      message: 'Invalid user id'
    })
  }
  this.getByToken(token, {
    _id: id,
    activated: false
  }).then(
    function (user) {
      if (!user) {
        return cb({
          code: 400,
          message: 'Canot activate account : Bad token or account already activated.'
        })
      }
      user.activated = true
      return user.resetToken(cb)
    },
    cb
  )
})

userSchema.path('email').validate(function (email) {
  const emailRegex = ''   // '/^([\w-+\.]+@([\w-]+\.)+[\w-]{2,4})?$/'
  return emailRegex.test(email) // Assuming email has a text attribute
}, 'Invalid email')

userSchema.path('username').validate(function (username) {
  return validator.isLength(username, 4, 32)
}, 'Username should be between 4 and 32 chars.')

export default mongoose.model('User', userSchema)
