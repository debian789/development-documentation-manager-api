import codesController from '../../../controllers/codesController'

export default {
  addCode (_, {title, description, code}) {
    return codesController.create(title, description, code)
  },
  updateCode (_, {id, title, description, code}) {
    return codesController.update(id, title, description, code)
  },
  removeCode (_, {id}) {
    return codesController.delete(id)
  }
}
