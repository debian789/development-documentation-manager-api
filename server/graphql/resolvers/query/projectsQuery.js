import projectController from '../../../controllers/projectController'

export default {
  projects () {
    return projectController.all()
  },
  subProjects (id) {
    return projectController.getSubProjects(id)
  }
}
