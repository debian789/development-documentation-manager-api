import commandsSchema from './commandsSchema'

let query = `
${commandsSchema}

# the schema allows the following query:
type Query {
 command(id: String): Commands
 commands: [Commands]
  # comment(id: String): Comment
  #  codes: [Codes]
}

`

export default query
