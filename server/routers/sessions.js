import express from 'express'
const router = express.Router()
import passport from 'passport'
import auth from 'server/config/auth'

/* Authenticates with password, returns a new token and user */

router.post('/',
  passport.authenticate('local', {session: false}), function (req, res) {
    const dataUser = {
      email: req.user.email,
      username: req.user.username,
      _id: req.user._id
    }

    res.send({token: auth.genToken(dataUser), user: dataUser})
  }
)

router.put('/',
  passport.authenticate('bearer', {session: false}), function (req, res) {
    const dataUser = {
      email: req.user.email,
      username: req.user.username,
      _id: req.user._id
    }
    res.send({token: auth.genToken(dataUser), user: dataUser})
  }
)

/* Authenticates with current token, returns user */
router.get('/', passport.authenticate('bearer', {session: false}), function (req, res) {
  return res.send({user: req.user})
})

/* TODO : A token revocation system (using .delete) */

export default router
