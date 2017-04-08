'use strict'

const jwt = require('jsonwebtoken')
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy

let auth = {}

auth.init = function (passport, userGetter, options) {
  if (!options.token_secret) {
    return new Error('Missing options.token_secret')
  }
  auth.options = options

  passport.use(new LocalStrategy({usernameField: 'email'}, userGetter))

  passport.use(new BearerStrategy(
    function (token, done) {
      jwt.verify(token, auth.options.token_secret, function (err, decodedUser) {
        return done(err, decodedUser)
      })
    }
  ))

  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    done(null, user)
  })
}

auth.genToken = function (data) {
  if (!auth.options) {
    return new Error('Call "auth.init()" before using this function')
  }

  return jwt.sign(data, auth.options.token_secret, {expiresIn: auth.options.expiresIn || 1440})
}

module.exports = auth
