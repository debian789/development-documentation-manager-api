import commandsSchema from '../../../models/commandsSchema'
var mongoose = require('mongoose')

export default {
  commands () {
    console.log('llego aqui ? ')
    return commandsSchema.find({}).exec() // 58f2a89a2463a62024505ecd
  },
  command (root, arg, context) {
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
  }
}