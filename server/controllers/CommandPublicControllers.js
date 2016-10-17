// var ItemsCommandSchema = require('server/models/ItemsCommandSchema')
var CommandsSchema = require('server/models/CommandsSchema')
var util_rest = require('server/controllers/util_rest')



var CommandsInit = function (CommandModel) {
  var CommandPublicControllers = {}

  // consultar all by user
  CommandPublicControllers.all = function (req, res) {
    return util_rest.all(CommandsSchema, req, res, ['title', 'description'])
  }

  // query  by id
  CommandPublicControllers.getById = function (req, res) {
    return util_rest.getById(CommandsSchema, req.params.idCommand, req, res)
  }


  // query by state is_public true
  // buscar
  // editar
  // eliminar

  // crear
  return CommandPublicControllers
}


module.exports = CommandsInit
