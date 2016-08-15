var ItemsCommandSchema = require('server/models/ItemsCommandSchema')
var CommandsSchema = require('server/models/CommandsSchema')
var Generic_rest = require('server/controllers/generic_rest')



var CommandsInit = function(CommandModel) {


var CommandControllers = {}

  // consultar
  CommandControllers.index = function (req, res) {
    return Generic_rest.index(CommandsSchema, req, res)
  }
  // buscar
  // editar
  // eliminar

  // crear
  CommandControllers.create = function (req, res) {
      return  Generic_rest.create(CommandsSchema,
        ['title', 'description', 'is_edit','is_public', 'user', 'itemsCommand'],
        ['title', 'user'], req, res)
  }

  return CommandControllers
}


module.exports = CommandsInit
