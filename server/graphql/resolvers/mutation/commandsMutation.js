import commandsController from '../../../controllers/commandsControllers'

export default {
  addCommand (_, {tag, description, subCommand}) {
    return commandsController.create(tag, description, subCommand)
  },
  updateCommand (_, {id, tag, subCommand}) {
    return commandsController.update(id, tag, subCommand)
  },
  removeCommand (_, {id}) {
    return commandsController.delete(id)
  }
}
