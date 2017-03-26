// const ItemsCommandSchema = require('server/models/ItemsCommandSchema')
const CommandsSchema = require('server/models/CommandsSchema')
const utilRest = require('server/controllers/utilRest')

const CommandsInit = function (CommandModel) {
  let CommandPrivateControllers = {}

  // consultar all by user
  CommandPrivateControllers.all = function (req, res) {
    return utilRest.all(CommandsSchema, req, res, ['title', 'description'])
  }

  // crear
  CommandPrivateControllers.create = function (req, res) {
    return utilRest.create(CommandsSchema,
      ['title', 'description', 'is_edit', 'is_public', 'user', 'itemsCommand'],
      ['title', 'user'], req, res)
  }

  // editar
  CommandPrivateControllers.update = function (req, res) {
    return utilRest.edit(CommandsSchema, req.params.idCommand,
      ['title', 'description', 'is_edit', 'is_public', 'itemsCommand'], req, res)
  }

  // delete
  CommandPrivateControllers.delete = function (req, res) {
    return utilRest.delete(CommandsSchema, req.params.idCommand, req, res)
  }

  // consultar por id
  CommandPrivateControllers.detail = function (req, res) {
    return utilRest.getById(CommandsSchema, req.params.idCommand, req, res)
  }

  return CommandPrivateControllers
}

module.exports = CommandsInit
