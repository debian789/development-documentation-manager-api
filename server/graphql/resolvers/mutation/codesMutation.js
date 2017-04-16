import codesController from '../../../controllers/codesController'

export default {
  addCode (_, {title, description, code}) {
    return codesController.create(title, description, code)
  }
}
