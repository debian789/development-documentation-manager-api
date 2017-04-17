import codesSchema from '../models/codesSchema'
import QueryHelper from '../common/helpers/QueryHelper'

let codesQuery = new QueryHelper(codesSchema)

export default {
  all () {
    return codesQuery.all()
  },
  findById (id) {
    return codesQuery.findById(id)
  },
  create (title, description, code) {
    return codesQuery.create({title, description, code})
  },
  update (id, title, description, code) {
    return codesQuery.update(id, {title, description, code})
  },
  delete (id) {
    return codesQuery.delete(id)
  }
}
