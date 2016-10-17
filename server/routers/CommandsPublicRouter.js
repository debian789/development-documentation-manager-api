var express = require('express')
var router = express.Router()

var CommandsSchema = require('server/models/CommandsSchema')
var CommandPublicControllers = require('server/controllers/CommandPublicControllers')(CommandsSchema)

/**
*@swagger
*definition:
*  ItemCommand:
*    properties:
*      command:
*        type: string
*      description:
*        type: string
*      id:
*        type: string
*/

/**
*@swagger
*definition:
*  CommandDetail:
*    properties:
*      id:
*        type: string
*      user:
*        type: string
*      title:
*        type: string
*      itemsCommand:
*        type: array
*        items:
*             $ref: '#/definitions/ItemCommand'
*      dateCreate:
*        type: date
*      is_public:
*        type: boolean
*      is_edit:
*        type: boolean
*/

/**
*@swagger
*definition:
*  Command:
*    properties:
*      data:
*        type: array
*        items:
*          $ref: '#/definitions/CommandDetail'
*      actualPage:
*        type: integer
*      pages:
*        type: integer
*      countData:
*        type: integer
*      limitByPage:
*        type: integer
*/

/**
 * @swagger
 * /api/command-public/all:
 *   get:
 *     properties:
 *       name:
 *       type: string
 *     tags:
 *       - Command public
 *     description: Retorna los comandos publicos
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: search
 *         description: permite buscar commandos
 *         in: query
 *         type: string
 *       - name: limit
 *         description: cantidad de item a mostrar
 *         in: query
 *         type: number
 *       - name: page
 *         description: permite navegar en la pagina de busqueda
 *         in: query
 *         type: Number
 *     responses:
 *       200:
 *         description: Consulto los command
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Command'
 */
router.get('/all', CommandPublicControllers.index)

/**
 * @swagger
 * /api/command-public/command/{idCommand}:
 *   get:
 *     properties:
 *       name:
 *       type: string
 *     tags:
 *       - Command public
 *     description: Retorna un comando publico
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: idCommand
 *         description: id del commando
 *         in: path
 *         type: string
 *     responses:
 *       200:
 *         description: Comando
 *         schema:
 *             $ref: '#/definitions/CommandDetail'
 */
router.get('/command/:idCommand', CommandPublicControllers.getById)

module.exports = router
