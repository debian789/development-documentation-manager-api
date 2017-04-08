'use strict'

import Router from 'express'
import passport from 'passport'
// const UserSchema = require('server/models/userSchema')

let initial = Router()

initial.get('/', (req, res) => {
  res.render('index', {title: ''})
})

initial.post('/login', passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/login'
}))

export default initial
