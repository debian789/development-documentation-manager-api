// const ItemsCommandSchema = require('server/models/ItemsCommandSchema')
const commandsSchema = require('server/models/commandsSchema')
const utilRest = require('server/controllers/utilRest')

const CommandsInit = function (CommandModel) {
  const CommandPublicControllers = {}

  // consultar all by user
  CommandPublicControllers.all = function (req, res) {
    return utilRest.all(commandsSchema, req, res, ['title', 'description'])
  }

  // query  by id
  CommandPublicControllers.getById = function (req, res) {
    return utilRest.getById(commandsSchema, req.params.idCommand, req, res)
  }

  return CommandPublicControllers
}

module.exports = CommandsInit
