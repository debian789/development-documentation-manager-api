var express = require('express')
var router = express.Router()

var CommandsSchema = require('server/models/CommandsSchema')
var CommandPublicControllers = require('server/controllers/CommandPublicControllers')(CommandsSchema)

// public information
// get
// api/command-public/all    -- get all by state is_public true
// api/command-public/all?search=textSearch    -- get all by state is_public true
// api/command-public/all?page_size=textSearch    -- get data for page size
// api/command-public/all?search=textSearch&page_size=textSearch    -- filter info for page
// api/command-public/user/:idUser     --- get all by id the user created
// api/command-public/detail/:idCommand    --- get the command by id command


/**
*@swagger
*definition:
*  Command:
*    properties:
*      data:
*        type: string
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
 *       - command
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


router.get('/command/:idCommand', CommandPublicControllers.getById)
// router.post('/', CommandPublicControllers.create)

module.exports = router
