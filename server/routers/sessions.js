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
  *   UserGet:
  *     properties:
  *       email:
  *         type: string
  *       username:
  *         type: string
  *       id:
  *         type: string
  *       iat:
  *         type: integer
  *       exp:
  *         type: integer
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

  /**
   * @swagger
   * definition:
   *   GetdataResponse:
   *     properties:
   *       user:
   *         type: object
   *         $ref: '#/definitions/UserGet'
   */

/* Authenticates with password, returns a new token and user */
/**
 * @swagger
 * /api/sessions:
 *   post:
 *     properties:
 *     tags:
 *       - sessions
 *     description: Autentica con password y retorna un nuevo token y user
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

/**
 * @swagger
 * /api/sessions:
 *   put:
 *     properties:
 *     tags:
 *       - sessions
 *     description: Autentica con token y retorna un nuevo token y user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Token de autenticacion - Bearer
 *         in: header
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Respues despues de iniciar session
 *         schema:
 *             $ref: '#/definitions/dataResponse'
 */
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

/**
 * @swagger
 * /api/sessions:
 *   get:
 *     properties:
 *     tags:
 *       - sessions
 *     description: Autentica con token y retorna user y datos de expiracion
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Token de autenticacion - Bearer
 *         in: header
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Respues despues de iniciar session
 *         schema:
 *             $ref: '#/definitions/GetdataResponse'
 */
/* Authenticates with current token, returns user */
router.get('/', passport.authenticate('bearer', {session: false}), function (req, res) {
  return res.send({user: req.user})
})

/* TODO : A token revocation system (using .delete) */

module.exports = router
