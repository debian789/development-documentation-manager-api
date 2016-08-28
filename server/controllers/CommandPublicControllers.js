var ItemsCommandSchema = require('server/models/ItemsCommandSchema')
var CommandsSchema = require('server/models/CommandsSchema')
var Generic_rest = require('server/controllers/generic_rest')



var CommandsInit = function (CommandModel) {
  var CommandPublicControllers = {}

  // consultar all by user
  CommandPublicControllers.index = function (req, res) {
    return Generic_rest.index(CommandsSchema, req, res, ['title', 'description'])
  }

  // query  by id
  CommandPublicControllers.getById = function (req, res) {
    return Generic_rest.getById(CommandsSchema, req.params.idCommand, req, res)
  }


  // query by state is_public true
  // buscar
  // editar
  // eliminar

  // crear
  return CommandPublicControllers
}


module.exports = CommandsInit
