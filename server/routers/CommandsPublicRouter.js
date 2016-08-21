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

router.get('/all', CommandPublicControllers.index)
// router.post('/', CommandPublicControllers.create)

module.exports = router
