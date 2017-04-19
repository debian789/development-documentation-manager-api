import projectSchema from '../models/projectSchema'
import QueryHelper from '../common/helpers/QueryHelper'

let projectsQuery = new QueryHelper(projectSchema)

export default {
  all () {
    return projectsQuery.all()
  },
  findById (id) {
    return projectsQuery.findById(id)
  },
  create (name, description) {
    return projectsQuery.create({name, description})
  },
  addSubProject (id, title, body) {
    return projectsQuery.update(id, {title, body}, 'subProjects')
  },
  getSubProject (id) {
    
  },
  update (id, name, description) {
    return projectsQuery.update(id, {name, description})
  },
  delete (id) {
    return projectsQuery.delete(id)
  }
}
