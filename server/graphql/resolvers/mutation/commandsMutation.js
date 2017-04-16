import commandsController from '../../../controllers/commandsControllers'

export default {
  addCommand (_, {tag, description, subCommand}) {
    return commandsController.create(tag, description, subCommand)
  }
}
