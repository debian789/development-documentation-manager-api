import commandsSchema from './commandsSchema'
import codesSchema from './codesSchema'

let query = `
${commandsSchema}
${codesSchema}

# the schema allows the following query:
type Query {
 command(id: String): Commands
 commands: [Commands]
 
 codes: [Codes]
 code(id: String): Codes
 
  # comment(id: String): Comment
  #  codes: [Codes]
}

`

export default query
