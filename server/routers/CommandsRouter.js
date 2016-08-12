var express = require('express')
var router = express.Router()

var CommandsSchema = require('server/models/CommandsSchema')
var CommandsController = require('server/controllers/CommandControllers')(CommandsSchema)

router.post('/', CommandsController.create)

module.exports = router
