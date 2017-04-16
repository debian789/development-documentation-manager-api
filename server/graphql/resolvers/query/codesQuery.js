import codesController from '../../../controllers/codesController'

export default {
  codes () {
    return codesController.all()
  }
}
