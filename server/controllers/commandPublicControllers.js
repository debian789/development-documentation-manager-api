// const ItemsCommandSchema = require('server/models/ItemsCommandSchema')
const CommandsSchema = require('server/models/CommandsSchema')
const utilRest = require('server/controllers/utilRest')

const CommandsInit = function (CommandModel) {
  const CommandPublicControllers = {}

  // consultar all by user
  CommandPublicControllers.all = function (req, res) {
    return utilRest.all(CommandsSchema, req, res, ['title', 'description'])
  }

  // query  by id
  CommandPublicControllers.getById = function (req, res) {
    return utilRest.getById(CommandsSchema, req.params.idCommand, req, res)
  }

  return CommandPublicControllers
}

module.exports = CommandsInit
