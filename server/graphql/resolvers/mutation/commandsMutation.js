//import codesSchema from '../../models/codesSchema'
import commandsSchema from '../../../models/commandsSchema'
//import commandsQuery from './query/commandsQuery'
//import codesQuery from './query/codesQuery'

export default {
  addCommand (_, {tag, description, subCommand}) {
    return commandsSchema.create({tag: tag, description: description, subCommand: subCommand}, (err, data) => {
      if (err) {
        console.log(err)
        return err
      } else {
        console.log(data)
        return data
      }
    })
  }
}
