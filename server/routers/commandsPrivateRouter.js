const express = require('express')
const router = express.Router()
const passport = require('passport')

const CommandsSchema = require('server/models/CommandsSchema')
const CommandPrivateControllers = require('server/controllers/CommandPrivateControllers')(CommandsSchema)

function completeUser (req, res, next) {
  req.body.user = req.user._id
  next()
}

router.post('/command', passport.authenticate('bearer', {session: false}), completeUser, CommandPrivateControllers.create)
router.get('/command', passport.authenticate('bearer', {session: false}), completeUser, CommandPrivateControllers.all)
router.put('/command/:idCommand', passport.authenticate('bearer', {session: false}), completeUser, CommandPrivateControllers.update)
router.delete('/command/:idCommand', passport.authenticate('bearer', {session: false}), completeUser, CommandPrivateControllers.delete)
router.get('/command/:idCommand', passport.authenticate('bearer', {session: false}), completeUser, CommandPrivateControllers.detail)

module.exports = router
