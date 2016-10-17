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


/**
*@swagger
*definition:
*  ItemCommandWithoutId:
*    properties:
*      command:
*        type: string
*      description:
*        type: string
*/

/**
*@swagger
*definition:
*  CommandCreateObject:
*    properties:
*      title:
*        type: string
*      itemsCommand:
*        type: array
*        items:
*             $ref: '#/definitions/ItemCommandWithoutId'
*      is_public:
*        type: boolean
*      is_edit:
*        type: boolean
*/




/**
 * @swagger
 * /api/command-private/command:
 *   post:
 *     properties:
 *       name:
 *       type: string
 *     tags:
 *       - Command private
 *     description: Crea un commando
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: token de autenticacion
 *         in: header
 *         type: string
 *       - name: data
 *         description: Objeto para crear un comando
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/CommandCreateObject'
 *     responses:
 *       200:
 *         description: Respuesta al crear el comando
 *         schema:
 *             $ref: '#/definitions/CommandDetail'
 */
router.post('/command', passport.authenticate('bearer', {session: false}), completeUser, CommandPrivateControllers.create)


/**
 * @swagger
 * /api/command-private/command:
 *   get:
 *     properties:
 *       name:
 *       type: string
 *     tags:
 *       - Command private
 *     description: Consulta de comandos
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: token de autenticacion
 *         in: header
 *         type: string
 *     responses:
 *       200:
 *         description: Lista los comandos creados
 *         schema:
 *             $ref: '#/definitions/Command'
 */
router.get('/command', passport.authenticate('bearer', {session: false}), completeUser, CommandPrivateControllers.all)



/**
 * @swagger
 * /api/command-private/command/{idCommand}:
 *   put:
 *     properties:
 *       name:
 *       type: string
 *     tags:
 *       - Command private
 *     description: Consulta de comandos
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: token de autenticacion
 *         in: header
 *         type: string
 *       - name: idCommand
 *         description: id del comando a editar
 *         in: path
 *         type: string
 *       - name: data
 *         description: Objeto editar command
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/CommandCreateObject'
 *     responses:
 *       200:
 *         description: Retorna el comando editado
 *         schema:
 *             $ref: '#/definitions/CommandDetail'
 */
router.put('/command/:idCommand',  passport.authenticate('bearer', {session: false}), completeUser, CommandPrivateControllers.update)

/**
 * @swagger
 * /api/command-private/command/{idCommand}:
 *   delete:
 *     properties:
 *       name:
 *       type: string
 *     tags:
 *       - Command private
 *     description: eliminar un comando
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: token de autenticacion
 *         in: header
 *         type: string
 *       - name: idCommand
 *         description: id del comando a eliminar
 *         in: path
 *         type: string
 *     responses:
 *       202:
 *         description: Retorna que se elimino el comando
 */
router.delete('/command/:idCommand', passport.authenticate('bearer', {session: false}), completeUser, CommandPrivateControllers.delete)



/**
 * @swagger
 * /api/command-private/command/{idCommand}:
 *   get:
 *     properties:
 *       name:
 *       type: string
 *     tags:
 *       - Command private
 *     description: Consultar un comando
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: token de autenticacion
 *         in: header
 *         type: string
 *       - name: idCommand
 *         description: id del comando a consultar
 *         in: path
 *         type: string
 *     responses:
 *       200:
 *         description: Retorna el comando consultado
 *         schema:
 *             $ref: '#/definitions/CommandDetail'
 */
router.get('/command/:idCommand', passport.authenticate('bearer', {session: false}), completeUser, CommandPrivateControllers.detail)

module.exports = router
