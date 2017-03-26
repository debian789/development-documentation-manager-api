const express = require('express')
const router = express.Router()

const CommandsSchema = require('server/models/CommandsSchema')
const CommandPublicControllers = require('server/controllers/CommandPublicControllers')(CommandsSchema)

router.get('/all', CommandPublicControllers.all)
router.get('/command/:idCommand', CommandPublicControllers.getById)

module.exports = router
