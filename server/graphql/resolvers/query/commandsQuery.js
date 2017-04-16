import commandsController from '../../../controllers/commandsControllers'

export default {
  commands () {
    return commandsController.all()
  },
  command (root, arg, context) {
    return commandsController.findById(root, arg, context)
  }
}
