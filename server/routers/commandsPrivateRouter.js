'use strict'

import express from 'express'
import passport from 'passport'
import commandsSchema from '../models/commandsSchema'
/*import CommandPrivateControllers from '../controllers/commandPrivateControllers'

const router = express.Router()
const commandPrivateControllers = new CommandPrivateControllers(commandsSchema)

function completeUser (req, res, next) {
  req.body.user = req.user._id
  next()
}

router.post('/command', passport.authenticate('bearer', {session: false}), completeUser, commandPrivateControllers.create)
router.get('/command', passport.authenticate('bearer', {session: false}), completeUser, commandPrivateControllers.all)
router.put('/command/:idCommand', passport.authenticate('bearer', {session: false}), completeUser, commandPrivateControllers.update)
router.delete('/command/:idCommand', passport.authenticate('bearer', {session: false}), completeUser, commandPrivateControllers.delete)
router.get('/command/:idCommand', passport.authenticate('bearer', {session: false}), completeUser, commandPrivateControllers.detail)
*/
// export default router
