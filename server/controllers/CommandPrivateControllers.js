// var ItemsCommandSchema = require('server/models/ItemsCommandSchema')
var CommandsSchema = require('server/models/CommandsSchema')
var util_rest = require('server/controllers/util_rest')



var CommandsInit = function (CommandModel) {
  var CommandPrivateControllers = {}

  // consultar all by user
  CommandPrivateControllers.all = function (req, res) {
    return util_rest.all(CommandsSchema, req, res, ['title', 'description'])
  }
  // query  by id

  // query by state is_public true
  // buscar
  // eliminar

  // crear
  CommandPrivateControllers.create = function (req, res) {
    return util_rest.create(CommandsSchema,
        ['title', 'description', 'is_edit', 'is_public', 'user', 'itemsCommand'],
        ['title', 'user'], req, res)
  }

  // editar
  CommandPrivateControllers.update = function (req, res) {
    return util_rest.edit(CommandsSchema, req.params.idCommand,
        ['title', 'description', 'is_edit', 'is_public', 'itemsCommand'], req, res)
  }

  return CommandPrivateControllers
}

module.exports = CommandsInit
