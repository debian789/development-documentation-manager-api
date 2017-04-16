import codesSchema from '../../../models/codesSchema'

export default   {
  codes () {
    return codesSchema.find({}).exec()
  }
}