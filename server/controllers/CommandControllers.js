var CommandItemSchema = require('server/models/CommandItemSchema')
var CommandsSchema = require('server/models/CommandsSchema')
var Generic_rest = require('server/controllers/generic_rest')

var CommandsInit = function(CommandModel) {


var CommandControllers = {}

  // buscar
  // editar
  // eliminar

  // crear
  CommandControllers.create = function (req, res) {
      return  Generic_rest.create(CommandsSchema,
        ['title', 'description', 'user']
        ,[
          'title',
          'user'], req, res)
  }

  return CommandControllers
}


module.exports = CommandsInit
