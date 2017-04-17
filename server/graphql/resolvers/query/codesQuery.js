import codesController from '../../../controllers/codesController'

export default {
  codes () {
    return codesController.all()
  },
  code (root, arg, context) {
    return codesController.findById(arg.id)
  }
}
