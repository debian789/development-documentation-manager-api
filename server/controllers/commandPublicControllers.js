'use strict'

// const ItemsCommandSchema = require('server/models/ItemsCommandSchema')
import commandsSchema from '../models/commandsSchema'
import utilRest from '../controllers/utilRest'

export default class CommandPublicControllers {
  constructor (CommandModel) {
    this.CommandModel = CommandModel
  }

  all (req, res) {
    return utilRest.all(commandsSchema, req, res, ['title', 'description'])
  }

// query  by id
  getById (req, res) {
    return utilRest.getById(commandsSchema, req.params.idCommand, req, res)
  }
}

/* function CommandsInit (CommandModel) {
 const CommandPublicControllers = {}

 // consultar all by user
 CommandPublicControllers.all = (req, res) => {
 return utilRest.all(commandsSchema, req, res, ['title', 'description'])
 }

 // query  by id
 CommandPublicControllers.getById = (req, res) => {
 return utilRest.getById(commandsSchema, req.params.idCommand, req, res)
 }

 return CommandPublicControllers
 }

 export default CommandsInit
 */
