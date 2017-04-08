const express = require('express')
const router = express.Router()

const commandsSchema = require('server/models/commandsSchema')
const commandPublicControllers = require('server/controllers/commandPublicControllers')(commandsSchema)

router.get('/all', commandPublicControllers.all)
router.get('/command/:idCommand', commandPublicControllers.getById)

module.exports = router
