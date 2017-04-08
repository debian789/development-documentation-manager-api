import express from 'express'
const router = express.Router()
import commandsSchema from 'server/models/commandsSchema'
import CommandPublicControllers from 'server/controllers/commandPublicControllers'
const commandPublicControllers = new CommandPublicControllers(commandsSchema)

router.get('/all', commandPublicControllers.all)
router.get('/command/:idCommand', commandPublicControllers.getById)

export default router
