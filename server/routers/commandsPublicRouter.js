'use strict'

import express from 'express'
import commandsSchema from '../models/commandsSchema'
import CommandPublicControllers from '../controllers/commandPublicControllers'

const commandPublicControllers = new CommandPublicControllers(commandsSchema)
const router = express.Router()

router.get('/all', commandPublicControllers.all)
router.get('/command/:idCommand', commandPublicControllers.getById)

export default router
