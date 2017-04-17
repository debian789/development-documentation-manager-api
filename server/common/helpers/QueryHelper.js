import mongoose from 'mongoose'
import objectUtil from '../utils/objectUtil'


export default class QueryHelper {
  constructor (model) {
    this.model = model
  }

  all () {
    return this.model.find({}).exec()
  }

  findById (id) {
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      return this.model.findById(id)
        .then((data) => {
          return data
        })
        .catch((error) => {
          return error
        })
    } else {
      return new Error('Id invalid')
    }
  }

  create (objectCreate) {
    return this.model.create(objectCreate, (err, data) => {
      if (err) {
        return err
      } else {
        return data
      }
    })
  }

  update (id, objectData) {
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      return this.model.findById(id).then((data) => {
        if (data) {
          console.log('----------------------')
          console.log(data)
          data = objectUtil.assignValueToObject(data, objectData)
          console.log(data)
          data.save()
        }

        return data
      }).catch(() => {
        return new Error('Not found')
      })
    } else {
      return new Error('Id invalid')
    }
  }

  delete (id) {
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      return this.model.findById(id).then((data) => {
        if (data) {
          data.remove()
          return data
        } else {
          return new Error('not found')
        }
      }).catch((err) => {
        return new Error('not found')
      })
    } else {
      return new Error('Id invalid')
    }
  }

}