'use strict'
import commandsSchema from '../models/commandsSchema'
import QueryHelper from '../common/helpers/QueryHelper'

let commandQuery = new QueryHelper(commandsSchema)

export default {
  all () {
    return commandQuery.all()
  },
  findById (id) {
    return commandQuery.findById(id)
  },
  create (tag, description, subComman) {
    return commandQuery.create({tag, description, subComman})
  },
  update (id, tag, description, subCommand) {
    return commandQuery.update(id, {tag, description, subCommand})
  },
  delete (id) {
    return commandQuery.delete(id)
  }
}
