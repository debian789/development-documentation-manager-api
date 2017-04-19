import commandsSchema from './commandsSchema'
import codesSchema from './codesSchema'
import projectsSchema from './projectsSchema'
import subProjectsSchema from './subProjectsSchema'

let query = `
${commandsSchema}
${codesSchema}
${subProjectsSchema}
${projectsSchema}

# the schema allows the following query:
type Query {
 command(id: String): Commands
 commands: [Commands]
 
 codes: [Codes]
 code(id: String): Codes
 
 projects: [Projects]
 
  # comment(id: String): Comment
  #  codes: [Codes]
}

`

export default query
