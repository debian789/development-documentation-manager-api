const express = require('express')
const router = express.Router()
const passport = require('passport')

const UserModel = require('server/models/userSchema')
const users = require('server/controllers/usersControllers')(UserModel)

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

module.exports = router
