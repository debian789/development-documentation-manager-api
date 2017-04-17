'use strict'
import commandsSchema from '../models/commandsSchema'
import mongoose from 'mongoose'

export default {
  all () {
    console.log('llego aqui ? ')
    return commandsSchema.find({}).exec()
  },
  findById (root, arg, context) {
    if (arg.id && mongoose.Types.ObjectId.isValid(arg.id)) {
      return commandsSchema.findById(arg.id)
        .then((data) => {
          return data
        }).catch((error) => {
          return error
        })
    } else {
      return new Error('Id invalid')
    }
  },
  create (tag, description, subCommand) {
    return commandsSchema.create({tag, description, subCommand}, (err, data) => {
      if (err) {
        console.log(err)
        return err
      } else {
        console.log(data)
        return data
      }
    })
  },
  update (id, tag, description, subCommand) {
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      return commandsSchema.findById(id).then((data) => {
        if (data) {
          data.tag = tag
          data.description = description
          data.subCommand = subCommand
          data.save()
        }
      }).catch(() => {
        return new Error('Not found')
      })
    } else {
      return new Error('Id invalid')
    }
  },
  delete(id) {

  }
}
