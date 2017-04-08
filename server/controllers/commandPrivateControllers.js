// const ItemsCommandSchema = require('server/models/ItemsCommandSchema')
import commandsSchema from '../models/commandsSchema'
import utilRest from '../controllers/utilRest'

export default class CommandPrivateController {
  constructor (CommandModel) {
    this.CommandModel = CommandModel
  }

// consultar all by user
  all (req, res) {
    return utilRest.all(commandsSchema, req, res, ['title', 'description'])
  }

// crear
  create (req, res) {
    return utilRest.create(commandsSchema,
      ['title', 'description', 'is_edit', 'is_public', 'user', 'itemsCommand'],
      ['title', 'user'], req, res)
  }

// editar
  update (req, res) {
    return utilRest.edit(commandsSchema, req.params.idCommand,
      ['title', 'description', 'is_edit', 'is_public', 'itemsCommand'], req, res)
  }

// delete
  delete (req, res) {
    return utilRest.delete(commandsSchema, req.params.idCommand, req, res)
  }

// consultar por id
  detail (req, res) {
    return utilRest.getById(commandsSchema, req.params.idCommand, req, res)
  }
}
