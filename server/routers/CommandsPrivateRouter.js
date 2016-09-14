var express = require('express')
var router = express.Router()
var passport = require('passport')

var CommandsSchema = require('server/models/CommandsSchema')
var CommandPrivateControllers = require('server/controllers/CommandPrivateControllers')(CommandsSchema)

// function validarAutenticacion (req, res, next) {
//   req.isAuthenticated()
//   if (req.isAuthenticated()) {
//     next()
//   } else {
//     res.sendStatus(500)
//   }
// }

function completeUser (req, res, next) {
  req.body.user = req.user._id
  next()
}

// public information
// post
// api/command-private/    -- get all by state is_private true

// get
// api/command-private/command/?search=textSearch    -- get all by state is_private true
// api/command-private/command/?page_size=textSearch    -- get data for page size
// api/command-private/command/?search=textSearch&page_size=textSearch    -- filter info for page
// api/command-private/user/:idUser     --- get all by id the user created
// api/command-private/detail/:idCommand    --- get the command by id command

// router.get('/all', CommandPrivateControllers.index)
router.post('/command', passport.authenticate('bearer', {session: false}), completeUser, CommandPrivateControllers.create)
router.put('/command/:idCommand', CommandPrivateControllers.update)

module.exports = router
