// var ItemsCommandSchema = require('server/models/ItemsCommandSchema')
var CommandsSchema = require('server/models/CommandsSchema')
var Generic_rest = require('server/controllers/Generic_rest')



var CommandsInit = function (CommandModel) {
  var CommandPrivateControllers = {}

  // consultar all by user
  CommandPrivateControllers.index = function (req, res) {
    return Generic_rest.index(CommandsSchema, req, res)
  }
  // query  by id

  // query by state is_public true
  // buscar
  // eliminar

  // crear
  CommandPrivateControllers.create = function (req, res) {
    return Generic_rest.create(CommandsSchema,
        ['title', 'description', 'is_edit', 'is_public', 'user', 'itemsCommand'],
        ['title', 'user'], req, res)
  }

  // editar
  CommandPrivateControllers.update = function (req, res) {
    return Generic_rest.edit(CommandsSchema, req.params.idCommand,
        ['title', 'description', 'is_edit', 'is_public', 'itemsCommand'], req, res)
  }

  return CommandPrivateControllers
}

module.exports = CommandsInit
