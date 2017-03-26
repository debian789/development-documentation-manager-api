const express = require('express')
const router = express.Router()
const passport = require('passport')

const CommandsSchema = require('server/models/CommandsSchema')
const CommandPrivateControllers = require('server/controllers/CommandPrivateControllers')(CommandsSchema)

function completeUser (req, res, next) {
  req.body.user = req.user._id
  next()
}

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
router.put('/command/:idCommand', passport.authenticate('bearer', {session: false}), completeUser, CommandPrivateControllers.update)

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
