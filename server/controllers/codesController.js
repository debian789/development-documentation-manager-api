import codesSchema from '../models/codesSchema'

export default {
  all () {
    return codesSchema.find({}).exec()
  },
  create (title, description, code) {
    return codesSchema.create({title, description, code}, (err, data) => {
      if (err) {
        return err
      } else {
        return data
      }
    })
  }
}
