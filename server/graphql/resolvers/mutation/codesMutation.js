import codesSchema from '../../../models/codesSchema'

export default {
  addCode (_, {title, description, code}) {
    return codesSchema.create({title, description, code}, (err, data) => {
      if (err) {
        return err
      } else {
        return data
      }
    })
  }
}
