// const ItemsCommandSchema = require('server/models/ItemsCommandSchema')
const commandsSchema = require('server/models/commandsSchema')
const utilRest = require('server/controllers/utilRest')

const CommandsInit = function (CommandModel) {
  let commandPrivateControllers = {}

  // consultar all by user
  commandPrivateControllers.all = function (req, res) {
    return utilRest.all(commandsSchema, req, res, ['title', 'description'])
  }

  // crear
  commandPrivateControllers.create = function (req, res) {
    return utilRest.create(commandsSchema,
      ['title', 'description', 'is_edit', 'is_public', 'user', 'itemsCommand'],
      ['title', 'user'], req, res)
  }

  // editar
  commandPrivateControllers.update = function (req, res) {
    return utilRest.edit(commandsSchema, req.params.idCommand,
      ['title', 'description', 'is_edit', 'is_public', 'itemsCommand'], req, res)
  }

  // delete
  commandPrivateControllers.delete = function (req, res) {
    return utilRest.delete(commandsSchema, req.params.idCommand, req, res)
  }

  // consultar por id
  commandPrivateControllers.detail = function (req, res) {
    return utilRest.getById(commandsSchema, req.params.idCommand, req, res)
  }

  return commandPrivateControllers
}

module.exports = CommandsInit
