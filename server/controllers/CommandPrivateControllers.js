var ItemsCommandSchema = require('server/models/ItemsCommandSchema')
var CommandsSchema = require('server/models/CommandsSchema')
var Generic_rest = require('server/controllers/generic_rest')



var CommandsInit = function(CommandModel) {


var CommandPrivateControllers = {}

  // consultar all by user
  CommandPrivateControllers.index = function (req, res) {
    return Generic_rest.index(CommandsSchema, req, res)
  }
  // query  by id

  // query by state is_public true
  // buscar
  // editar
  // eliminar

  // crear
  CommandPrivateControllers.create = function (req, res) {
      return  Generic_rest.create(CommandsSchema,
        ['title', 'description', 'is_edit','is_public', 'user', 'itemsCommand'],
        ['title', 'user'], req, res)
  }

  return CommandPrivateControllers
}


module.exports = CommandsInit
