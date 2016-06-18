'use strict'
var Router = require('express')
var passport = require('passport')
var UserSchema = require('server/models/userSchema')

let initial = Router()

initial.get('/', (req, res) => {
  res.render('index', {title: ''})
})

initial.post('/login', passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/login'
}))

module.exports = initial
