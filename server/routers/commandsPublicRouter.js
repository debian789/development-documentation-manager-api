import express from 'express'
const router = express.Router()
import commandsSchema from 'server/models/commandsSchema'
const commandPublicControllers = require('server/controllers/commandPublicControllers')(commandsSchema)

router.get('/all', commandPublicControllers.all)
router.get('/command/:idCommand', commandPublicControllers.getById)

export default router
