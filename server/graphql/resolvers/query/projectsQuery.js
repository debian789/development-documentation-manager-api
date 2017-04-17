import projectController from '../../../controllers/projectController'

export default {
  projects () {
    console.log('llego aqui ? ')
    return projectController.all()
  }
}
