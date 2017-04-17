import codesSchema from '../models/codesSchema'
import mongoose from 'mongoose'

export default {
  all () {
    return codesSchema.find({}).exec()
  },
  findById (id) {
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      return codesSchema.findById(id)
        .then((data) => {
          return data
        }).catch((error) => {
          return error
        })
    } else {
      return new Error('Id invalid')
    }
  },
  create (title, description, code) {
    return codesSchema.create({title, description, code}, (err, data) => {
      if (err) {
        return err
      } else {
        return data
      }
    })
  },
  update (id, title, description, code) {
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      console.log(id)
      return codesSchema.findById(id).then((data) => {
        if (data) {
          data.title = title
          data.description = description
          data.code = code
          data.save()
        }

        return data
      })
    } else {
      return new Error('Id invalid')
    }
  },
  delete (id) {
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      return codesSchema.findById(id).then((data) => {
        if (data) {
          data.remove()
        }

        return data
      })
    } else {
      return new Error('Id invalid')
    }
  }
}
