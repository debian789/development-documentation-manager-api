import express from 'express'
const router = express.Router()
import passport from 'passport'
import UserModel from 'server/models/userSchema'
// const users = require('server/controllers/usersControllers')(UserModel)
import UserController from 'server/controllers/usersControllers'
const users = new UserController(UserModel)

/* Register user */
router.post('/', users.create)
/* Activate user */
router.post('/:userid/activate', users.activate)
/* Edit profile */
router.put('/:userid', passport.authenticate('bearer'), users.edit)
/* Delete account */
router.delete('/:userid', passport.authenticate('bearer'), users.delete)

/* Debugging */
router.get('/', users.all)
router.get('/:userid', users.get)
/**/

export default router
