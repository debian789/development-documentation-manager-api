var express = require('express')
var router = express.Router()
var passport = require('passport')
var auth = require('server/config/auth')


/**
 * @swagger
 * definition:
 *   User:
 *     properties:
 *       email:
 *         type: string
 *       username:
 *         type: string
 *       id:
 *         type: string
 */

/**
 * @swagger
 * definition:
 *   Session:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

 /**
  * @swagger
  * definition:
  *   dataResponse:
  *     properties:
  *       token:
  *         type: string
  *       user:
  *         type: object
  *         $ref: '#/definitions/User'
  */


/* Authenticates with password, returns a new token and user */
/**
 * @swagger
 * /api/sessions:
 *   post:
 *     properties:
 *     tags:
 *       - sessions
 *     description: autenticacion del usuario registrado
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         description: Objeto de autenticacion de usuario
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Session'
 *     responses:
 *       200:
 *         description: Respues despues de iniciar session
 *         schema:
 *             $ref: '#/definitions/dataResponse'
 */
router.post('/',
  passport.authenticate('local', {session: false}), function (req, res) {
    var dataUser = {
      email: req.user.email,
      username: req.user.username,
      _id: req.user._id
    }

    res.send({token: auth.genToken(dataUser), user: dataUser})
  }
)

/* Authenticates with current token, returns a new token and user */
router.put('/',
  passport.authenticate('bearer', {session: false}), function (req, res) {
    var dataUser = {
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

module.exports = router
