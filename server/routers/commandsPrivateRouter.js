const express = require('express')
const router = express.Router()
const passport = require('passport')

const commandsSchema = require('server/models/commandsSchema')
const commandPrivateControllers = require('server/controllers/commandPrivateControllers')(commandsSchema)

function completeUser (req, res, next) {
  req.body.user = req.user._id
  next()
}

router.post('/command', passport.authenticate('bearer', {session: false}), completeUser, commandPrivateControllers.create)
router.get('/command', passport.authenticate('bearer', {session: false}), completeUser, commandPrivateControllers.all)
router.put('/command/:idCommand', passport.authenticate('bearer', {session: false}), completeUser, commandPrivateControllers.update)
router.delete('/command/:idCommand', passport.authenticate('bearer', {session: false}), completeUser, commandPrivateControllers.delete)
router.get('/command/:idCommand', passport.authenticate('bearer', {session: false}), completeUser, commandPrivateControllers.detail)

module.exports = router
