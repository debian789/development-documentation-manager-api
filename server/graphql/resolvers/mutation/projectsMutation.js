import projectController from '../../../controllers/projectController'

export default {
  addProject (_, {name, description}) {
    return projectController.create(name, description)
  },
  updateProject (_, {id, name, description}) {
    return projectController.update(id, name, description)
  },
  removeProject (_, {id}) {
    return projectController.delete(id)
  }
}
